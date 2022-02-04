import axios from 'axios';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'

const mockAjax = axios.create({
  baseURL: '/mock',
  timeout: 2000
})

mockAjax.interceptors.request.use(config => {
  Nprogress.start()
  return config
})

mockAjax.interceptors.response.use(
  response => {
    Nprogress.done()
    return response.data
  },
  error => {
    Nprogress.done()
    return Promise.reject(new Error(error.message))
  }
)

export default mockAjax


