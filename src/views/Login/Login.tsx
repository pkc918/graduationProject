import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Div} from './UI';
import {Button, Input,message, Tabs} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import request from '../../request/request';

const Login: FC = () => {
  const {TabPane} = Tabs;
  const [user, setUser] = useState({username: '', password: '', code:''});
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
        if (localStorage.getItem('token')){
          console.log(111);
          checkLogin()
          history.push('/home');
        }
      })
      .catch(err => {
        message.error(err.data.msg).then(r => r);
      })
  };
  const handleUserLogin = () => {
    request('/user/login','POST', {studentId:user.username,password:user.password})
      .then(res => {
        message.success(res.data.msg).then(r => r);
        if (localStorage.getItem('token')){
          console.log(222);
          checkLogin()
          history.push('/home');
        }
      })
      .catch(err => {
        message.error(err.data.msg).then(r => r);
      })
  }
  const handleRegister = () => {
    request('/user/register','POST',{studentId:user.username,password:user.password})
      .then(res => {
        console.log('注册');
        console.log(res);
        setUser({
          username: '',
          password: '',
          code:''
        })
      })
  }
  const checkLogin = () => {
    request('/checklogin','GET')
      .then(res => {
        localStorage.setItem('XState',res.data.data)
      })
  }
  useEffect(() => {
    handleGetCode();
  },[]);

  function callback(key: any) {
    console.log(key);
  }

  return (
    <Div className='login'>
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="管理员登录" key="1">
            <div className="form">
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
          </TabPane>
          <TabPane tab="用户登录" key="2">
            <div className="form">
              <Input
                bordered={false}
                className="userName"
                placeholder="请输入账号"
                type="number"
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
              <Button className="loginBtn" onClick={handleUserLogin}>登录</Button>
            </div>
          </TabPane>
          <TabPane tab="用户注册" key="3">
            <div className="form">
              <Input
                bordered={false}
                className="userName"
                placeholder="请输入数字"
                type="number"
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
              <Button className="loginBtn" onClick={handleRegister}>注册</Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Div>
  );
};

export default Login;
