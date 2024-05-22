import request from '@/axios/index.js'



export const loginAPI = ({ username, password }) => {
  return request({
    url: '/appPlatform/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
 
