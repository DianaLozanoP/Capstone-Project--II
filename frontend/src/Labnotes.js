import { useState, useEffect } from "react"
import { Card, CardTitle, CardText, CardColumns, CardBody, Button, CardSubtitle } from 'reactstrap';
import { useNavigate } from "react-router-dom"
import SelectSampleForm from "./Hooks/SelectSampleForm";
import DoculabApi from "./api";
import SampleBasics from "./SampleBasics";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


const Labnotes = () => {
    const navigate = useNavigate();

    const [sample, setSampleData] = useState({})
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const getAllLabnotes = async () => {
            let labnotesData = await DoculabApi.getNotes();
            setNotes(labnotesData)
        }
        getAllLabnotes();
    }, [])

    const sampleSelected = async (workOrder) => {
        let sampleData = await DoculabApi.getSampleWO(workOrder.workOrder)
        setSampleData(sampleData)
    }

    const sampleClickNotes = async (workOrder) => {
        navigate(`/labnotes/${workOrder}`)
    }
    const formatDate = (dateString) => {
        if (!dateString) {
            return "N/A"; // Or any other value you want to display for null dates
        }
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    return (
        <div>
            <h2>Laboratory Notes</h2>
            <br></br>
            {Object.keys(sample).length > 0 ?
                <div>
                    <h4>Click on the sample to start documenting the test.</h4>
                    <SampleBasics sample={sample} onClick={sampleClickNotes} />
                </div>
                :
                <div>
                    <h4>Select a sample to start testing.</h4>
                    <SelectSampleForm sampleSelected={sampleSelected} />
                    {notes.length > 0 ?
                        <div className="labnotestable">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650, fontFamily: "Montserrat" }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Work Order</TableCell>
                                            <TableCell >Test date</TableCell>
                                            <TableCell >Analyst</TableCell>
                                            <TableCell >Release date</TableCell>
                                            <TableCell >Results</TableCell>
                                            <TableCell >Reviewed</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {notes.map((s) => (
                                            <TableRow
                                                key={s.workOrder}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {s.workOrder}
                                                </TableCell>
                                                <TableCell>{formatDate(s.testDate)}</TableCell>
                                                <TableCell >{s.analyst}</TableCell>
                                                <TableCell>{formatDate(s.releaseDate)}</TableCell>
                                                <TableCell >{s.results}</TableCell>
                                                <TableCell >{s.reviewed}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        : <h5>Please wait while labnotes are being retrieved.</h5>}
                </div>
            }
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
                                Capstone Project for <a className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="https://www.springboard.com/">Springboard</a>
                                <i class="bi bi-award-fill"></i>
                            </p>

                        </MDBContainer>
                    </section>

                    <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                        © 2024 Copyright: Diana Lozano
                    </div>
                </MDBFooter>
            </div>
        </div >
    )
}

export default Labnotes;