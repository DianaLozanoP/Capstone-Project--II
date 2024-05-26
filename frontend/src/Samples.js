import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row, Col, Card, CardTitle, CardText, Button } from "reactstrap"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DoculabApi from "./api";
import Sample from "./Sample";
import SearchSampleDes from "./Hooks/SearchSampleDes";
import SearchClient from "./Hooks/SearchClient";
import EnterSample from "./Hooks/EnterSample";

const Samples = () => {
    const navigate = useNavigate();
    //setting the state for companies
    const [samples, setSamples] = useState([]);

    useEffect(() => {
        const getAllSamples = async () => {
            let samplesData = await DoculabApi.getSamples();
            setSamples(samplesData)
        }
        getAllSamples();
    }, [])

    const searchSample = async (search) => {
        let samplesData = await DoculabApi.getSamples(search)
        setSamples(samplesData)
    };

    const searchByClient = async (search) => {
        let samplesData = await DoculabApi.getSamples(search)
        setSamples(samplesData)
    };

    const handleSampleClick = (workOrder) => {
        navigate(`/samples/${workOrder}`)
    }

    return (
        <div>
            <div className="samples pt-5">
                <div className="samplesSearch">
                    <Row>
                        <Col sm="4">
                            <Card body>
                                <CardTitle tag="h5">
                                    Search a sample by description:
                                </CardTitle>
                                <CardText>
                                    <SearchSampleDes searchSample={searchSample} />
                                </CardText>
                            </Card>
                        </Col>
                        <Col sm="4">
                            <Card body>
                                <CardTitle tag="h5">
                                    Search a sample by client
                                </CardTitle>
                                <CardText>
                                    <SearchClient searchByClient={searchByClient} />
                                </CardText>
                            </Card>
                        </Col>
                        <Col sm="4">
                            <Card body>
                                <CardTitle tag="h5">
                                    Add a new sample
                                </CardTitle>
                                <CardText>
                                    <Button color="primary"
                                        href={`/samples/new`}>
                                        Enter sample
                                    </Button>
                                </CardText>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {samples.length > 0 ?
                    <div className="samplescards">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, fontFamily: "Montserrat" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Work Order</TableCell>
                                        <TableCell >Description</TableCell>
                                        <TableCell >Client</TableCell>
                                        <TableCell >Test date</TableCell>
                                        <TableCell >Release date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {samples.map((s) => (
                                        <TableRow
                                            key={s.workOrder}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            onClick={() => handleSampleClick(s.workOrder)}
                                        >
                                            <TableCell component="th" scope="row">
                                                {s.workOrder}
                                            </TableCell>
                                            <TableCell >{s.description}</TableCell>
                                            <TableCell >{s.clientName}</TableCell>
                                            <TableCell >{s.testDate}</TableCell>
                                            <TableCell >{s.releasedate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    :
                    null
                }

            </div>

        </div >


    )
}

export default Samples;