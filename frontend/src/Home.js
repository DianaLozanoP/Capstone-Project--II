import "./App.css";
import { Link } from "react-router-dom";
import logo from "./Logo.png";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import labanalyst from "./Lab analyst.jpg"

const Home = () => {
    return (
        <div className="homepage">
            <div className="home-center">
                <div className="logo-container">
                    <img src={logo} alt="Doculab Logo" className="logo" />
                </div>
                <div className="content">
                    {/* <h2 className="mb-4 fw-bold">Doculab</h2> */}
                    <h4>All your laboratory documentation in one place.</h4>

                    <ul className="checklist">
                        <li>Save all details about your products.</li>
                        <li>Save all the details about your reagents, media, and equipment.</li>
                        <li>Save your clients specific methods.</li>
                        <li>Document your laboratory work easier and faster.</li>
                    </ul>
                </div>
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
        </div>
    );
}

export default Home;
