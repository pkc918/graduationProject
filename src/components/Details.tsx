import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import request from '../request/request';
import {NavBar} from './Nav';
import MarkdownEditor from '@uiw/react-markdown-editor';

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
    grid-template-rows: 52px 52px 52px 52px 1fr;
    position: relative;
  }
  .ant-select-selector{
    height: 100%;
  }

  .CodeMirror{
    height: 400px !important;
  }
  
  .md_mark{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;height: 100%;
  }
`

const Details: FC = () => {
  const [data,setDate] = useState({area:'',content:'',education:'',salary:'',title:''});
  let id = sessionStorage.getItem('id')
  useEffect(() => {
    request('/public-position/selectOne', 'GET', {id})
      .then(res => {
        setDate(res.data.data)
        console.log(res);
      });
  },[])
  return(
    <Main>
      <NavBar id={6}/>
      <div className="main">
        <div>
          职位：
          <input type="text" value={data.title}/>
        </div>
        <div>
          地区：
          <input type="text" value={data.area}/>
        </div>
        <div>
          学历：
          <input type="text" value={data.education}/>
        </div>
        <div>
          薪资：
          <input type="text" value={data.salary}/>
        </div>
        <div className="md">
          <MarkdownEditor
            className="markdown"
            value={data.content}
          />
        </div>
        <div className="md_mark"/>
      </div>

    </Main>
  )
}

export {Details}
