import "./App.css";
import { Link } from "react-router-dom";
import logo from "./Logo.png";

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
        </div>
    );
}

export default Home;
