import { useState } from "react"

const SearchSampleDes = ({ searchSample }) => {
    //empty string for the search
    const INITIAL_STATE = { description: "" }
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
        searchSample({ ...formData })
        setFormData(INITIAL_STATE)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input
                    id="description"
                    type="text"
                    name="description"
                    placeholder="Search by label description"
                    value={formData.description}
                    onChange={handleChange}
                    size={45}
                    maxLength={45}
                />
            </div>
            <button className="btn btn-primary btn-sm">Search</button>
        </form >
    )
}

export default SearchSampleDes;