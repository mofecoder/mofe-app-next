import aspida from '@aspida/axios'
import api from '$/api/$api'
import axios from 'axios'

axios.defaults.withCredentials = true
export const apiClient = api(aspida(axios))
