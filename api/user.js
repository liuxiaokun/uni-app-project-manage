import {g} from '@/api/http.js'

let getUserInfo = (params) => {
  return g('user/info', params)
}

export default getUserInfo