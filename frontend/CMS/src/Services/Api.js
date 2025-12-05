import axios from 'axios';

const Api = axios.create({
    base_url:"https://localhost:5000/api",
});

Api.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token");
    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})

export default Api;
