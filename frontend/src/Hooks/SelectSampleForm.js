import { useState, useEffect } from "react"
import DoculabApi from "../api"

const SelectSampleForm = ({ sampleSelected }) => {
    //empty string for the search
    const INITIAL_STATE = { workOrder: "" }
    //state for search
    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sampleSelected({ ...formData })
        setFormData(INITIAL_STATE)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input
                    id="workOrder"
                    type="number"
                    name="workOrder"
                    placeholder="Work order number"
                    value={formData.workOrder}
                    onChange={handleChange}
                    size={60}
                />
                <button className="btn btn-primary btn-sm">Search</button>
            </div>
        </form>
    )
}

export default SelectSampleForm;