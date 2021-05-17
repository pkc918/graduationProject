import React, {FC, useState} from 'react';
import {Button, Input} from 'antd';
import {NavBar} from '../../components/Nav';
import styled from 'styled-components';
import request from '../../request/request';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;

  > .main {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    overflow-y: auto;
    display: grid;
    grid-template-rows: 500px 1fr;

    .ant-input{
      height: 500px;
    }
    button{
      margin-top: 50px;
    }
  }
`

const MyFeedback:FC = () => {
  const {TextArea} = Input;
  const [content,setContent] = useState('');

  const onChange = (e: { target: { value: any; }; }) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };
  const submitContent = () => {
    console.log(content);
    request("/feedback/addFeedback","POST",{feedback: content})
      .then(res => {
        if (res.data.code === 200){
          setContent(() => {
            return ''
          })
        }
      })
  }

  return(
    <Main>
      <NavBar id={7}/>
      <div className="main">
        <TextArea
          showCount
          maxLength={300}
          value={content}
          onChange={onChange} />
        <Button
          type="primary"
          onClick={submitContent}
        >
          提交
        </Button>
      </div>
    </Main>
  )
}

export {MyFeedback}
