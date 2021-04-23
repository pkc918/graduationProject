import axios from 'axios'
axios.defaults.baseURL = 'http://42.51.222.98:6789';
export default function request(url,headers, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    console.log(111);
    let option = {
      url,
      headers,
      method: type,
    }
    if(type.toLowerCase() === 'get') {
      console.log(222);
      option.params = data
    }else {
      option.data = data
    }
    axios(option)
      .then(res => {
      console.log(res);
    })
      .catch(err => {
        reject(err);
      })
  })
}
