import axios from 'axios'

axios.defaults.validateStatus = () => true

export const request = axios
