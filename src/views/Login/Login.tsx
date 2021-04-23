import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Div} from './UI';
import {Button, Input,message} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import request from '../../request/request';

const Login: FC = () => {
  const [user, setUser] = useState({username: 'admin', password: '123456', code:''});
  const [imgURL,setImgUrl] = useState({base64: '',captchaKey: ''});
  const history = useHistory();

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({
      username: event.target.value,
      password: user.password,
      code: user.code
    });
  };
  const changePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({
      username: user.username,
      password: event.target.value,
      code: user.code
    });
  };
  const changeVerification: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({
      username: user.username,
      password: user.password,
      code: event.target.value
    });
  };
  const handleGetCode = () => {
    request('/captcha','GET')
      .then(res => {
        setImgUrl({
          base64: res.data.data.base64Img,
          captchaKey: res.data.data.captchaKey
        });
      })
  };
  const handleSubmit = () => {
    request('/admin/login','POST',{...user,'captchaKey':imgURL.captchaKey})
      .then(res => {
        message.success(res.data.msg).then(r => r);
        if (localStorage.getItem('X-Token')){
          history.push('/home');
        }
      })
      .catch(err => {
        message.error(err.data.msg).then(r => r);
      })
    console.log(imgURL);
    console.log(user);
  };
  /* 获取第一次进入的图形验证码 */
  useEffect(() => {
    handleGetCode();
  },[]);

  return (
    <Div className='login'>
      <div className="form">
        <h2>账号登陆</h2>
        <Input
          bordered={false}
          className="userName"
          placeholder="请输入账号"
          value={user.username}
          onChange={changeUsername}
        />
        <Input.Password
          bordered={false}
          className="password"
          placeholder="请输入密码"
          value={user.password}
          onChange={changePassword}
          iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
        />
        <div className="verificationCode">
          <input value={user.code} onChange={changeVerification} type="text" placeholder="验证码"/>
          <button onClick={handleGetCode}>
            <img src={imgURL.base64} alt="" title="看不清，换一张"/>
          </button>
        </div>
        <Button className="loginBtn" onClick={handleSubmit}>登录</Button>
      </div>
    </Div>
  );
};

export default Login;
