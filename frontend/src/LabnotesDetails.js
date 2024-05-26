import LabnotesForm from "./Hooks/LabnotesForm";
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import DoculabApi from './api';
import { Row, Col, Card, CardTitle, CardText, Button, CardBody, CardSubtitle } from "reactstrap"

const LabnotesDetails = () => {

    const navigate = useNavigate();
    const params = useParams();
    const workOrder = params.workOrder;

    const [sample, setSample] = useState({});
    const [notes, setLabNotes] = useState({})

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
        console.log(notes)
        const notesObj = {
            workOrder: notes.workOrder,
            testDate: notes.testDate,
            analyst: notes.analyst,
            procedure: notes.procedure,
            releaseDate: notes.releaseDate,
            results: notes.results,
            reviewed: notes.results
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
        </div>
    )
}

export default LabnotesDetails;