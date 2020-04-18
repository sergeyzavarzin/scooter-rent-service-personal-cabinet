import axios from 'axios';

const token = localStorage.getItem('token');

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
if (token) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
