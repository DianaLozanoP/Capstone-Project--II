import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DoculabApi from "./api";
import SearchClient from "./Hooks/SearchClient";
import Client from "./Client"


const Clients = () => {

    const navigate = useNavigate();

    const [clients, setClients] = useState([]);
    //search company after filling out form
    const searchByClient = async (search) => {
        let clientsData = await DoculabApi.getSample(search)
        setClients(clientsData)
    };

    const handleClientClick = (clientId) => {
        navigate(`/clients/${clientId}`)
    }

    //get data from API
    useEffect(() => {
        const getClients = async () => {
            let clientsData = await DoculabApi.getAllClients();
            setClients(clientsData)
        }
        getClients();

    }, [])

    return (
        <div>
            <div className="div-small-container">
                <h4>Search a client</h4>
                <SearchClient searchByClient={searchByClient} />
            </div>
            <div>
                <h3>Clients</h3>
                {clients.length > 0 ?
                    <div>
                        {clients.map((s) => (
                            <Client
                                key={s.clientId}
                                clientId={s.clientId}
                                clientName={s.clientName}
                                email={s.email}
                                contactInfo={s.contactInfo}
                                handleClientClick={handleClientClick}
                            />
                        ))}
                    </div>
                    : null}
            </div>
        </div>


    )
}

export default Clients;