import axios from 'axios'
import {ref} from 'vue'

const httpApi = ref("http://localhost:7031/Api")
// 登录
export const login = (parms:{})=> {
  axios.defaults.headers['Content-Type'] = 'application/json'
  return axios.post(httpApi.value + "/Auth/Login",parms)
}

// 获取用户信息
export const get = () => axios({
  url: 'Auth',
  method: 'get'
})
