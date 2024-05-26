import { Card, CardTitle, CardText, CardColumns, CardBody, Button, CardSubtitle } from 'reactstrap';

const SampleBasics = ({ sample, onClick }) => {
    return (
        <div onClick={() => onClick(sample.workOrder)} style={{ cursor: 'pointer' }}>
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
        </div>

    )
}

export default SampleBasics;