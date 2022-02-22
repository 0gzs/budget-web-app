import axios from "axios";

export default axios.create({
    baseURL: "https://budget-this-backend.herokuapp.com",
    headers: {
        "Content-type": "application/json"
    }
});