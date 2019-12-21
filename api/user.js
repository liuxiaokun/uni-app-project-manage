import {g} from '@/api/http.js'

let getUserInfo = (params) => {
  console.log('api')
  console.log(g)
  return g('user/info', params)
}

export default getUserInfo