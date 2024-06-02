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
                                                <TableCell >{s.testDate}</TableCell>
                                                <TableCell >{s.analyst}</TableCell>
                                                <TableCell >{s.releaseDate}</TableCell>
                                                <TableCell >{s.results}</TableCell>
                                                <TableCell >{s.reviewed}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        : <h3>No labnotes have been documented yet.</h3>}
                </div>
            }

        </div >
    )
}

export default Labnotes;