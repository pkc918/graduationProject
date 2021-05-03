import axios from 'axios'
axios.defaults.baseURL = 'http://gobt.top/';
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
        console.log(res);
        if (res.data.data && res.data.data.token){
          localStorage.setItem('X-Token',res.data.data.token);
        }
        if (res.status === 200 && res.data.code === 200){
          resolve(res)
        }
        reject(res)
      })
      .catch(err => {
        console.log(err.toString().indexOf('401'));
        if (err.toString().indexOf('401') !== -1){
          localStorage.removeItem('X-Token');
          window.location.href = '/login'
        }
        reject(err);
      })
  })
}
