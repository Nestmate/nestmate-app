import axios from 'axios';
const baseURL = `${process.env.REACT_APP_PROJECTS_API}`;

//AUTH
export const signUpUser = ( user ) => {
    return axios.post(`${baseURL}/auth/signup`, user);
}

export const signInUser = ( user ) => {
    return axios.post(`${baseURL}/auth/signin`, user);
}

export const getUsersByLocation = (lng, lat, distance = 10) => {
    return axios.get(`${baseURL}/users/location/${lng}/${lat}/${distance}`);
}

export const getLocations = () => {
    return axios.get(`${baseURL}/locations/`);
}