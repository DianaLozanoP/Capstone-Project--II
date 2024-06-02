import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";
const BASE_URL1 = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class DoculabApi {
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL1}${endpoint}`;
        // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getSampleWO(workOrder) {
        let res = await this.request(`samples/${workOrder}`);
        return res.sample;
    }

    static async getSamples(data) {
        try {
            if (!data) {
                const res = await this.request('samples');
                return res.samples;
            }

            const params = new URLSearchParams();
            if (data.clientId) {
                params.append('clientId', data.clientId);
            }
            if (data.description) {
                params.append('description', data.description);
            }

            const queryString = params.toString();
            const endpoint = queryString ? `samples?${queryString}` : 'samples';
            const res = await this.request(endpoint);
            return res.samples;
        } catch (error) {
            // Handle error
            console.error("Error fetching samples:", error);
            throw new Error("Failed to fetch samples");
        }
    }

    static async postSample(data) {
        const url = `${BASE_URL1}samples`;
        try {
            const res = await axios.post(url, data);
            return res
        } catch (err) {
            console.error("Error registering user:", err);
            throw err;
        }
    }


    //CLIENTS ROUTES
    static async getAllClients() {
        let res = await this.request(`clients`)
        return res.clients;
    };

    //METHODS ROUTES
    static async getAllMethods() {
        let res = await this.request(`methods`)
        return res.methods;
    }

    //CHAPTERS ROUTES
    static async getAllChapters() {
        let res = await this.request(`chapters`)
        return res.chapters;
    }

    //NOTES ROUTES

    static async getNotes(data) {
        if (!data) {
            const res = await this.request('notes');
            return res.labnotes;
        }

        let queryParams = [];
        if (data.workOrder) {
            queryParams.push(`workOrder=${encodeURIComponent(data.workOrder)}`);
        }
        if (data.testDate) {
            queryParams.push(`testDate=${encodeURIComponent(data.testDate)}`);
        }
        if (data.analyst) {
            queryParams.push(`analyst=${encodeURIComponent(data.analyst)}`);
        }
        if (data.releaseDate) {
            queryParams.push(`releaseDate=${encodeURIComponent(data.releaseDate)}`);
        }

        const queryString = queryParams.join('&');
        const res = await this.request(`notes?${queryString}`);

        return res.labnotes;
    };

    static async postNotes(data) {
        const url = `${BASE_URL1}notes`;
        try {
            const res = await axios.post(url, data);
            return res.data.labnotes;
        } catch (err) {
            console.error("Error entering labnotes:", err);
            throw err;
        }
    }

    //EQUIPMENT ROUTES
    static async getAllEquipment() {
        let res = await this.request(`equipment`)
        return res.equipment;
    }

    static async postEquipUsed(data) {
        const url = `${BASE_URL1}equipment`;
        try {
            const res = await axios.post(url, data);
            return res.data.equipment;
        } catch (err) {
            console.error("Error registering equipment:", err);
            throw err;
        }
    }

    //MEDIA ROUTES
    static async getAllMedia() {
        let res = await this.request(`media`)
        return res.media;
    }

    static async postMediaUsed(data) {
        const url = `${BASE_URL1}media`;
        try {
            const res = await axios.post(url, data);
            return res.data.media;
        } catch (err) {
            console.error("Error registering media:", err);
            throw err;
        }
    }

    //USERS ROUTES

    static async getAllUsers() {
        let res = await this.request(`users`)
        return res.users;
    }

    //PDF Route
    static async PDFcreation(data) {
        const url = `${BASE_URL1}generate_pdf`;
        try {
            const res = await axios.post(url, data, {
                responseType: 'arraybuffer' // Ensure response type is arraybuffer
            });
            return res;
        } catch (err) {
            console.error("Error generating PDF:", err);
            throw err;
        }
    }
}

export default DoculabApi;