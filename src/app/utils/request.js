import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // api base_url
  timeout: 100000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    if (localStorage.getItem("accessToken")) {
      config.headers['Authorization'] = 'Bearer '+localStorage.getItem("accessToken")
    }
    // config.headers['Access-Control-Allow-Origin'] = "*";
    // config.headers['Access-Control-Allow-Methods'] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
    // config.headers['Accept-Language'] = 'en'
    // config.headers['Secret-Key'] = process.env.SECRET_KEY
    // config.headers['X-CSRF-TOKEN'] = getCSRFToken()
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log(error?.response?.data, 'Error')   
  }
)

export default service
