import axios from 'axios';
const baseURL = `${process.env.REACT_APP_PROJECTS_API}api`;

//AUTH
export const signUpUser = ( user ) => axios.post(`${baseURL}/auth/signup`, user);
export const signInUser = ( user ) => axios.post(`${baseURL}/auth/signin`, user);
export const onBoardUser = ( user ) => axios.put(`${baseURL}/auth/onboard`, user);

//CHAT
export const getChats = ( token ) => axios.get(`${baseURL}/chats/`,{headers:{Authorization: `Bearer ${token}`}});
export const getChat = ( id,token ) => axios.get(`${baseURL}/chats/${id}`,{headers:{Authorization: `Bearer ${token}`}});
export const sendChatMessage = ( id,message,user,token ) => axios.post(`${baseURL}/chats/${id}`,{ message,user,token });
export const createChat = ( users, message, token ) => axios.post(`${baseURL}/chats/`,{ users, message, token });

//CONNECTIONS
export const getConnections = ( token ) => axios.get(`${baseURL}/connections/`,{headers:{Authorization: `Bearer ${token}`}});

//FILES
export const uploadImage = ( files ) => axios.post(`${baseURL}/files/upload`, files);

//INTERESTS
export const getInterests = () => axios.get(`${baseURL}/interests/`);

//NOTIFICATIONS
export const getNotifications = ( token, range ) => axios.post(`${baseURL}/notifications/`,{ range, token });

//MATES
export const getMatesByUserId = ( id, token = null ) => axios.get(`${baseURL}/mates/${id}`,{headers:{Authorization: `Bearer ${token}`}});
export const findMatesByUserId = ( id, token = null ) => axios.post(`${baseURL}/mates/${id}`,{headers:{Authorization: `Bearer ${token}`}});
export const getFavouritesByUserId = ( id ) => axios.get(`${baseURL}/favourites/${id}`);

//USERS
export const getUserByUsername = ( username, token = null ) =>  axios.get(`${baseURL}/users/${username}`,{headers:{Authorization: `Bearer ${token}`}});
export const getUsersByLocation = ( lng, lat, distance = 10, user = '' ) => axios.post(`${baseURL}/users/location/${lng}/${lat}/${distance}`, {user});
export const toggleFavouriteUser = ( token, mateId ) => axios.post(`${baseURL}/favourites/${mateId}`,{token});

//SETTINGS
export const getSettings = ( id, token, type ) =>  axios.get(`${baseURL}/settings/${id}/${type}`,{headers:{Authorization: `Bearer ${token}`}});
export const updateSettings = ( info, id, token, type ) =>  axios.post(`${baseURL}/settings/${id}/${type}`,{...info},{headers:{Authorization: `Bearer ${token}`}});

//ONBOARDING
export const getOnboarding = ( id, token, type ) =>  axios.get(`${baseURL}/onboarding/${id}/${type}`,{headers:{Authorization: `Bearer ${token}`}});
export const updateOnboarding = ( info, id, token, type ) =>  axios.post(`${baseURL}/onboarding/${id}/${type}`,{...info},{headers:{Authorization: `Bearer ${token}`}});

//LOCATIONS
export const getLocations = () =>  axios.get(`${baseURL}/locations/`);
export const getLocationsByQuery = ( query ) => axios.get(`${baseURL}/locations/search/${query}`);

//VERIFY
export const verify = ( token ) => axios.get(`${baseURL}/auth/verify`,{headers:{Authorization: `Bearer ${token}`}});