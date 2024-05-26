import { useState, useEffect } from "react"
import DoculabApi from "../api"

const SearchClient = ({ searchByClient }) => {
    //empty string for the search
    const INITIAL_STATE = { clientId: "" }
    //state for search
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const getClients = async () => {
            let allClients = await DoculabApi.getAllClients();
            setClients(allClients)
        };

        getClients();
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
        searchByClient({ ...formData })
        setFormData(INITIAL_STATE)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <select
                    id="clientId"
                    name="clientId"
                    className="form-control form-control-sm"
                    onChange={handleChange}
                >
                    <option value=""> Select a client</option>
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
            <button className="btn btn-primary btn-sm">Search</button>
        </form>
    )
}

export default SearchClient;