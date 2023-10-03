import axios from "axios";
import { parseCookies } from 'nookies';

const { 'foodexplorer.token': token } = parseCookies();

export const api = axios.create({
    baseURL: "https://food-explorer-api-w5nk.onrender.com"
});

api.interceptors.request.use(config => {
    return config;
}, function(error) {
    console.log(error);
})

if(token) {
    console.log(token);
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}
