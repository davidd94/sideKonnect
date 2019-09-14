import socketIOClient from 'socket.io-client';
//import { useSelector } from 'react-redux';


//const userInfo = useSelector(state => (state.user));
const localToken = (localStorage.getItem('token') ? localStorage.getItem('token') : '');

const endpoint = "ws://localhost:3000";
const transport = { transport : ['websocket'], query : { "token" : (localToken) } };
let socket = socketIOClient(endpoint, transport);


export default socket;