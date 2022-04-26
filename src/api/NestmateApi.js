import axios from 'axios';
const baseURL = `${process.env.REACT_APP_PROJECTS_API}`;

//AUTH
export const signUpUser = ( user ) => axios.post(`${baseURL}/auth/signup`, user);
export const signInUser = ( user ) => axios.post(`${baseURL}/auth/signin`, user);


//MATES
export const getMatesByUserId = (id) => axios.get(`${baseURL}/mates/${id}`);

//USERS
export const getUserByUsername = (username) =>  axios.get(`${baseURL}/users/${username}`);
export const getUsersByLocation = (lng, lat, distance = 10, user = '') => axios.post(`${baseURL}/users/location/${lng}/${lat}/${distance}`, {user});
export const toggleFavouriteUser = (user, mateId) => axios.post(`${baseURL}/mates/favourite/${mateId}`,{user});

//LOCATIONS
export const getLocations = () =>  axios.get(`${baseURL}/locations/`);
export const getLocationsByQuery = (query) => axios.get(`${baseURL}/locations/search/${query}`);

//VERIFY
export const verify = (token) => axios.get(`${baseURL}/auth/verify`,{headers:{Authorization: `Bearer ${token}`}});