import axios from 'axios'
axios.defaults.baseURL = 'http://42.51.222.98:6789';
export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    if(localStorage.token) {
      axios.defaults.headers.common['X-Token']  = localStorage.token
    }
    axios(option)
      .then(res => {
        if (res.data.data && res.data.data.token){
          localStorage.setItem('X-Token',res.data.data.token);
        }
        if (res.status === 200 && res.data.code === 200){
          console.log(123);
          resolve(res)
        }
        reject(res)
        console.log(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}
