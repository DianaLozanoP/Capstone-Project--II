import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import DoculabApi from './api';
import SampleBasics from './SampleBasics';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const ClientPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const clientId = params.clientId;

    const [samples, setSamples] = useState([]);

    useEffect(() => {
        const getSamples = async () => {
            let samplesData = await DoculabApi.getSamples({ clientId: clientId })
            setSamples(samplesData)
        }
        getSamples();

    }, []);

    return (
        <div>
            {samples.length > 0 ?
                <div>
                    <h3>Samples submitted by client:</h3>
                    {samples.map((s) =>
                        <SampleBasics sample={s} />)}
                </div>
                : <h4>There are no samples associated to this client.</h4>}
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

export default ClientPage;