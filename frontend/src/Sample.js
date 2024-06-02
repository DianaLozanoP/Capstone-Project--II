
import { Card, CardTitle, CardText, CardColumns, CardBody, Button, CardSubtitle } from 'reactstrap';
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import DoculabApi from './api';
import SampleBasics from './SampleBasics';


const Sample = () => {

    const params = useParams();
    const workOrder = params.workOrder;
    const [sample, setSample] = useState({});
    const [labNotes, setLabNotes] = useState({})

    useEffect(() => {
        const getSample = async () => {
            let sampleData = await DoculabApi.getSampleWO(workOrder);
            setSample(sampleData)
        }
        const getNotes = async () => {
            let notesData = await DoculabApi.getNotes({ workOrder: `${workOrder}` })
            setLabNotes(notesData)
        }
        getSample();
        getNotes();
    }, []);

    const createPDF = async (sample) => {
        try {
            const data = sample;
            let response = await DoculabApi.PDFcreation({ data });

            // Check if the response contains the expected PDF data
            if (!(response.data instanceof ArrayBuffer)) {
                throw new Error('Error: Response data is not an ArrayBuffer.');
            }

            // Create a Blob object from the PDF data
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Create a URL for the Blob and initiate the download
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated_pdf.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();

            // Revoke the object URL to free up resources
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
            // Handle the error (e.g., display a message to the user)
        }
    }


    return (
        <div className='sample'>
            {Object.keys(sample).length > 0 ?
                <div>
                    <CardColumns
                        style={{
                            width: '50rem'
                        }}>
                        <SampleBasics sample={sample} />
                        {labNotes.length > 0 ?
                            <div>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            Release date: {labNotes[0].releaseDate}
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            Tested on: {labNotes[0].testDate}
                                        </CardSubtitle>
                                        <CardText>
                                            Analyst : {labNotes[0].analyst}
                                            <br></br>
                                            Procedure: {labNotes[0].procedure}
                                            <br></br>
                                            Results: {labNotes[0].results}
                                            <br></br>
                                            Reviewed by: {labNotes[0].reviewed ? labNotes[0].reviewed : "Not reviewed yet."}
                                        </CardText>
                                    </CardBody>
                                </Card>
                                <br></br>
                                <Button onClick={() => createPDF(sample)} color="success">Create final report</Button>
                            </div>
                            :
                            <div>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            This sample has not been tested yet.
                                        </CardTitle>
                                        <CardText>
                                            <Button color="success"
                                                href={`/ labnotes / ${workOrder} `}>
                                                Enter testing notes
                                            </Button>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>}
                    </CardColumns>
                </div>
                :
                <h2>Wait sample data is being retrieved. </h2>}

        </div >

    );
};

export default Sample;
