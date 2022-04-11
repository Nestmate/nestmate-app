import axios from 'axios';
const baseURL = `${process.env.REACT_APP_PROJECTS_API}`;

export const getUsersByLocation = (lng, lat, distance = 10) => {
    return axios.get(`${baseURL}/users/location/${lng}/${lat}/${distance}`);
}

export const getLocations = () => {
    return axios.get(`${baseURL}/locations/`);
}