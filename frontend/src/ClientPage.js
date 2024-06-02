import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import DoculabApi from './api';
import SampleBasics from './SampleBasics';

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
        </div>
    )
}

export default ClientPage;