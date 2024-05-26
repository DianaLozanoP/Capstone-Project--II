import { useEffect, useState } from "react"
import DoculabApi from "../api"


const EnterSample = ({ samplePost }) => {
    const INITIAL_STATE = {
        clientId: "",
        description: "",
        storage: "",
        methodId: "",
        chapterId: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [clients, setClients] = useState([]);
    const [methods, setMethods] = useState([]);
    const [chapters, setChapters] = useState([]);


    useEffect(() => {
        const getClients = async () => {
            let allClients = await DoculabApi.getAllClients();
            setClients(allClients)
        };

        const getMethods = async () => {
            let allMethods = await DoculabApi.getAllMethods();
            setMethods(allMethods);
        };

        const getChapters = async () => {
            let allChapters = await DoculabApi.getAllChapters();
            setChapters(allChapters)
        };

        getClients();
        getMethods();
        getChapters();

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
            formData.clientId === "" ||
            formData.description === "" ||
            formData.storage === "" ||
            formData.methodId === "" ||
            formData.chapterId === ""
        ) {
            // If any required field is empty, display an error message or prevent form submission
            // You can choose how to handle the validation error here
            alert("Please fill in all required fields.");
            return;
        }
        samplePost({ ...formData })
        setFormData(INITIAL_STATE)
    }
    return (

        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="clientId" className="form-label">Client</label>
                    <select
                        id="clientId"
                        name="clientId"
                        className="form-control form-control-sm"
                        onChange={handleChange}>
                        <option value="">Select Client</option> {/* Default or "Select Client" option */}
                        {clients.length > 0 ? (
                            clients.map(client => (
                                <option key={client.clientId} value={client.clientId}>
                                    {client.clientName}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No clients available</option>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        rows="4" // You can adjust the number of visible rows as needed
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="storage" className="form-label">Storage</label>
                    <input
                        id="storage"
                        type="text"
                        name="storage"
                        value={formData.storage}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="methodId" className="form-label">Methods</label>
                    <select
                        id="methodId"
                        name="methodId"
                        className="form-control form-control-sm"
                        onChange={handleChange}>
                        <option value="">Select Method</option>
                        {methods.length > 0 ? (
                            methods.map(method => (
                                <option key={method.methodId} value={method.methodId}>
                                    {method.methodName}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No methods available</option>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="chapterId" className="form-label">Chapters</label>
                    <select
                        id="chapterId"
                        name="chapterId"
                        className="form-control form-control-sm"
                        onChange={handleChange}>
                        <option value="">Select Chapter</option>
                        {chapters.length > 0 ? (
                            chapters.map(chapter => (
                                <option key={chapter.chapterId} value={chapter.chapterId}>
                                    {chapter.chapter}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No chapters available</option>
                        )}
                    </select>
                </div>
                <button className="btn btn-primary btn-sm">Enter sample</button>
            </form>
        </div>

    )
}

export default EnterSample;