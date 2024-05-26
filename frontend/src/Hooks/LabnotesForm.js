import { useState, useEffect } from "react"
import DoculabApi from "../api"

const LabnotesForm = ({ sendNotes, workOrder }) => {
    const INITIAL_STATE = {
        workOrder: workOrder,
        testDate: "",
        analyst: "",
        procedure: "",
        releaseDate: "",
        results: "",
        reviewed: "",
        equipId: "",
        mediaId: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [equipment, setEquipment] = useState([])
    const [media, setMedia] = useState([])
    const [analyst, setAnalyst] = useState([])


    useEffect(() => {
        const getEquipment = async () => {
            let allEquipment = await DoculabApi.getAllEquipment();
            setEquipment(allEquipment)
        };

        const getMedia = async () => {
            let allMedia = await DoculabApi.getAllMedia();
            setMedia(allMedia);
        };

        const getAnalyst = async () => {
            let analysts = await DoculabApi.getAllUsers();
            setAnalyst(analysts)
        }

        getEquipment();
        getMedia();
        getAnalyst();

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formData.analyst === "" ||
            formData.equipId === "" ||
            formData.mediaId === ""
        ) {
            // If any required field is empty, display an error message or prevent form submission
            // You can choose how to handle the validation error here
            alert("Please fill in all required fields.");
            return;
        }

        sendNotes({ ...formData })
        setFormData(INITIAL_STATE)
    }
    return (

        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Work order</label>
                <div className="mb-3">
                    <input
                        id="workOrder"
                        type="number"
                        name="workOrder"
                        value={formData.workOrder}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="date">Testing date</label>
                    <input
                        type="date"
                        id="testDate"
                        name="testDate"
                        value={formData.testDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="analyst" className="form-label">Analyst</label>
                    <select
                        id="analyst"
                        name="analyst"
                        className="form-control form-control-sm"
                        onChange={handleChange}>
                        <option value="">Select Analyst</option>
                        {analyst.length > 0 ? (
                            analyst.map(a => (
                                <option key={a.username} value={a.username}>
                                    {a.username}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No analyst available</option>
                        )}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="procedure" className="form-label">Procedure</label>
                    <textarea
                        id="procedure"
                        name="procedure"
                        value={formData.procedure}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        rows="5"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="date">Release date</label>
                    <input
                        type="date"
                        id="releaseDate"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="results" className="form-label">Results</label>
                    <textarea
                        id="results"
                        name="results"
                        value={formData.results}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        rows="5"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="reviewed" className="form-label">Reviewed by</label>
                    <select
                        id="reviewed"
                        name="reviewed"
                        className="form-control form-control-sm"
                        onChange={handleChange}>
                        <option value="">Select reviewer</option>
                        {analyst.length > 0 ? (
                            analyst.map(a => (
                                <option key={a.userId} value={a.username}>
                                    {a.username}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No reviewer available</option>
                        )}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="equipId" className="form-label">Equipment</label>
                    <select
                        id="equipId"
                        name="equipId"
                        className="form-control form-control-sm"
                        onChange={handleChange}>
                        <option value="">Select equipment</option>
                        {equipment.length > 0 ? (
                            equipment.map(a => (
                                <option key={a.equipId} value={a.equipId}>
                                    {a.equipName}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No equipment available</option>
                        )}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="mediaId" className="form-label">Media</label>
                    <select
                        id="mediaId"
                        name="mediaId"
                        className="form-control form-control-sm"
                        onChange={handleChange}>
                        <option value="">Select media</option>
                        {media.length > 0 ? (
                            media.map(a => (
                                <option key={a.mediaId} value={a.mediaId}>
                                    {a.mediaName}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No media available</option>
                        )}
                    </select>
                </div>

                <button className="btn btn-primary btn-sm">Submit my documentation</button>
            </form>
        </div>
    )
}

export default LabnotesForm;