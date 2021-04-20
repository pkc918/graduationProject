import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {Button, Input} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';

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
        width: 180px;
        height: 40px;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 6px;
        outline: none;
      }

      > button {
        grid-area: btn;
        height: 40px;
        background-color: #333;
        color: #fff;
        border: none;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
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
  return (
    <Div className='login'>
      <div className="form">
        <h2>账号登陆</h2>
        <Input
          bordered={false}
          className="userName"
          placeholder="请输入账号"
        />
        <Input.Password
          bordered={false}
          className="password"
          placeholder="请输入密码"
          iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
        />
        <div className="verificationCode">
          <input type="text" placeholder="验证码"/>
          <button>验证码</button>
        </div>
        <Button className="loginBtn">登录</Button>
      </div>
    </Div>
  );
};

export default Login;
