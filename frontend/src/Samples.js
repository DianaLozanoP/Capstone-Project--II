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
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

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
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return "N/A"; // Or any other value you want to display for null dates
        }
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    return (
        <div>
            <div className="samples pt-5">
                <div className="samplesSearch">
                    <Row>
                        <Col sm="5">
                            <Card body style={{ fontSize: "14px" }}>
                                <CardTitle tag="h5" style={{ fontSize: "14px" }}>
                                    Search a sample by description:
                                </CardTitle>
                                <CardText >
                                    <SearchSampleDes searchSample={searchSample} />
                                </CardText>
                            </Card>
                        </Col>
                        <Col sm="5" style={{ fontSize: "14px" }}>
                            <Card body>
                                <CardTitle tag="h5" style={{ fontSize: "14px" }}>
                                    Search a sample by client
                                </CardTitle>
                                <CardText>
                                    <SearchClient searchByClient={searchByClient} />
                                </CardText>
                            </Card>
                        </Col>
                        <Col sm="2" style={{ fontSize: "14px" }}>
                            <Card body>
                                <CardTitle tag="h5" style={{ fontSize: "14px" }}>
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
                                <TableHead sx={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}>
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
                                            <TableCell>{formatDate(s.testDate)}</TableCell>
                                            <TableCell>{formatDate(s.releaseDate)}</TableCell>

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

        </div >


    )
}

export default Samples;