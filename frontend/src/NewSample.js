import EnterSample from "./Hooks/EnterSample";
import DoculabApi from "./api";
import { useNavigate } from "react-router-dom"

const NewSample = () => {
    const navigate = useNavigate();

    const samplePost = async (data) => {
        let sample = await DoculabApi.postSample(data)
        if (sample) {
            alert("Sample was entered succesfully.")
            navigate('/samples')
        }
    }

    return (
        <div>
            <h4>Enter a new sample</h4>
            <EnterSample samplePost={samplePost} />
        </div>
    )

}

export default NewSample;