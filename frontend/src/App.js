import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Home';
import Samples from './Samples';
import Clients from './Clients'
import Sample from './Sample';
import ClientPage from './ClientPage';
import Labnotes from './Labnotes'
import LabnotesForm from './Hooks/LabnotesForm';
import NewSample from "./NewSample"
import LabnotesDetails from './LabnotesDetails';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/samples" element={<Samples />} />
        <Route path="/samples/:workOrder" element={<Sample />} />
        <Route path="/samples/new" element={<NewSample />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:clientId" element={<ClientPage />} />
        <Route path="/labnotes" element={<Labnotes />} />
        <Route path="/labnotes/:workOrder" element={<LabnotesDetails />} />
      </Routes>
    </div>
  );
}

export default App;

