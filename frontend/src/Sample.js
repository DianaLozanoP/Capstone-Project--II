
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
    }, [])

    return (
        <div className='sample'>
            {Object.keys(sample).length > 0 ?
                <div>
                    <CardColumns
                        style={{
                            width: '50rem'
                        }}>
                        <SampleBasics sample={sample} />
                        {labNotes.testDate > 0 ?
                            <div>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            Release date: {labNotes.releaseDate}
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            Tested on: {labNotes.testDate}
                                        </CardSubtitle>
                                        <CardText>
                                            Analyst : {labNotes.analyst}
                                            <br></br>
                                            Procedure: {labNotes.procedure}
                                            Results: {labNotes.results}
                                            Reviewed by: {labNotes.reviewed ? labNotes.reviewed : "Not reviewed yet."}
                                        </CardText>
                                    </CardBody>
                                </Card>
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
                                                href={`/labnotes/${workOrder}`}>
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
