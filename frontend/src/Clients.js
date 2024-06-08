import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DoculabApi from "./api";
import SearchClient from "./Hooks/SearchClient";
import Client from "./Client";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


const Clients = () => {

    const navigate = useNavigate();

    const [clients, setClients] = useState([]);
    //search company after filling out form
    const searchByClient = async (search) => {
        let clientsData = await DoculabApi.getSamples(search)
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

export default Clients;