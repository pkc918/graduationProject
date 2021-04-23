import React, {ChangeEventHandler, FC, useState} from 'react';
// import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {Button, Input} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
// import request from '../../request/request';

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  background: url("https://static.xiedaimala.com/xdml/image/6e556a51-b8ff-466f-bda6-7d1847e39f2e/2019-12-4-14-4-6.jpg") center center / 100% 100% no-repeat;
  
  > .form {
    width: 400px;
    padding-bottom: 20px;
    background-color: #fff;
    border-radius: 10px;
    display: grid;
    text-align: center;
    align-items: center;
    grid-auto-columns: 100%;
    grid-auto-rows: 80px 80px 80px 80px 80px;

    > h2 {
      font-size: 24px;
      font-weight: 500;
    }

    > .userName {
      justify-self: center;
      width: 300px;
      height: 40px;
      padding: 10px;
      border: 1px solid #333;
      border-radius: 6px;
      outline: none;
    }

    > .password {
      justify-self: center;
      width: 300px;
      height: 40px;
      padding: 10px;
      border: 1px solid #333;
      border-radius: 6px;
      outline: none;
    }

    > .verificationCode {
      width: 300px;
      justify-self: center;
      display: grid;
      grid: 'input btn';
      grid-auto-rows: 150px 150px;

      > input {
        grid-area: input;
        width: 150px;
        height: 40px;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 6px;
        outline: none;
      }

      > button {
        grid-area: btn;
        width: 130px;
        height: 40px;
        color: #fff;
        border: none;
        background-color: #fff;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        
        img{
          width: 100%;
          height: 100%;
          border: none;
        }
      }
    }

    > .loginBtn {
      justify-self: center;
      width: 300px;
      height: 40px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 5px;
    }
  }
`;

const Login: FC = () => {
  const [user, setUser] = useState({username: 'admin', password: '123456', verification:''});
  const [imgURL,setImgUrl] = useState('http://42.51.222.98:6789/captcha');
  // const history = useHistory();
  const changeUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({
      username: event.target.value,
      password: user.password,
      verification: user.verification
    });
    console.log(event.target.value);
  };
  const changePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({
      username: user.username,
      password: event.target.value,
      verification: user.verification
    });
    console.log(event.target.value);
  };
  const changeVerification: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser({
      username: user.username,
      password: user.password,
      verification: event.target.value
    });
    console.log(event.target.value);
  };
  const handleGetCode = () => {
    let time = new Date();
    setImgUrl(`http://42.51.222.98:6789/captcha?time=${time}`)
  };
  const handleSubmit = () => {

    console.log(user);
  };


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
          <input value={user.verification} onChange={changeVerification} type="text" placeholder="验证码"/>
          <button onClick={handleGetCode}>
            <img src={imgURL} alt="" title="看不清，换一张"/>
          </button>
        </div>
        <Button className="loginBtn" onClick={handleSubmit}>登录</Button>
      </div>
    </Div>
  );
};

export default Login;
