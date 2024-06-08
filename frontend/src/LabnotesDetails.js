import LabnotesForm from "./Hooks/LabnotesForm";
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import DoculabApi from './api';
import { Row, Col, Card, CardTitle, CardText, Button, CardBody, CardSubtitle } from "reactstrap";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const LabnotesDetails = () => {

    const navigate = useNavigate();
    const params = useParams();
    const workOrder = params.workOrder;

    const [sample, setSample] = useState({});
    const [notes, setLabNotes] = useState({});

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

    const sendNotes = async (notes) => {
        const notesObj = {
            workOrder: notes.workOrder,
            testDate: notes.testDate,
            analyst: notes.analyst,
            procedure: notes.procedure,
            releaseDate: notes.releaseDate,
            results: notes.results,
            reviewed: notes.reviewed
        }
        const equipObj = {
            equipId: notes.equipId,
            workOrder: notes.workOrder
        }
        const mediaObj = {
            mediaId: notes.mediaId,
            workOrder: notes.workOrder
        }
        let labn = await DoculabApi.postNotes(notesObj);
        let equip = await DoculabApi.postEquipUsed(equipObj);
        let media = await DoculabApi.postMediaUsed(mediaObj);
        console.log(labn, equip, media)
        if (labn, equip, media) {
            alert("Labnotes were entered succesfully.")
            navigate('/labnotes')
        }

    }

    return (
        <div>
            {Object.keys(sample).length > 0 ?
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                                WORK ORDER: {sample.workOrder}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                Client: {sample.clientName}
                            </CardSubtitle>
                            <CardText>
                                {sample.description}
                                <br></br>
                                Method: {sample.methodName} {sample.chapter}
                                <br></br>
                                Storage: {sample.storage}
                            </CardText>
                        </CardBody>
                    </Card>

                    <LabnotesForm sendNotes={sendNotes} workOrder={workOrder} />

                </div>
                : <h4>Sample details are loading...</h4>}
            <div className="footer">
                <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
                    <section className='d-flex justify-content-center p-4 border-bottom'>
                        <div className='me-5'>
                            <span>Get connected with Diana on social media:</span>
                        </div>

                        <div>
                            <a href='https://www.linkedin.com/in/dianalozanop/' className='me-4 text-reset'>
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href='https://github.com/DianaLozanoP' className='me-4 text-reset'>
                                <i className="bi bi-github"></i>
                            </a>
                            <a href='https://www.instagram.com/dianaaalozano/?hl=en' className='me-4 text-reset'>
                                <i className="bi bi-instagram"></i>
                            </a>
                        </div>
                    </section>

                    <section className=''>
                        <MDBContainer className='text-center mt-5'>
                            <h6 className='text-uppercase fw-bold'>
                                <MDBIcon icon="gem" className="me-3" />
                                Doculab
                            </h6>
                            <p>
                                Laboratory documentation system.
                                Capstone Project for Springboard.
                                <i class="bi bi-award-fill"></i>
                            </p>

                        </MDBContainer>
                    </section>

                    <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                        © 2021 Copyright:
                        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                            MDBootstrap.com
                        </a>
                    </div>
                </MDBFooter>
            </div>
        </div>
    )
}

export default LabnotesDetails;