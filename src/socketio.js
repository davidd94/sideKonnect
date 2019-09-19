import socketIOClient from 'socket.io-client';
//import { useSelector } from 'react-redux';


//const userInfo = useSelector(state => (state.user));
const localToken = (localStorage.getItem('token') ? localStorage.getItem('token') : '');

const endpoint = "/";
const options = { transport : ['websocket'], query : { "token" : (localToken) }, secure: true };
let socket = socketIOClient(endpoint, options);


export default socket;