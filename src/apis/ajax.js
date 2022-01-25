import axios from 'axios'

const http = axios.create({
    baseURL: '/api',
    timeout: 10000
})
http.interceptors.request.use(config => {
    return config
})
http.interceptors.response.use(response => {
    return response
})
export default function ajax(url, data = {}, type = "GET") {
    // data作为请求体发送的的数据只适用put,post,patch
    let promise;
    if (type === "GET") promise = http.get(url, { params: data })
    else if (type === "POST") promise = http.post(url, data)
    else promise = http.delete(url, _)
    promise.then(result => result.data)
        // 处理失败的请求
        .catch(error => Promise.reject(new Error(error, "请求失败,请检查接口是否完好!")))
}


