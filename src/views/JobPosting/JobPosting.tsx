import React, {ChangeEventHandler, FC, useState} from 'react';
import {NavBar} from '../../components/Nav';
import styled from 'styled-components';
import {Button, Input, Select} from 'antd';
import MarkdownEditor from '@uiw/react-markdown-editor';
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
    grid-template-rows: 52px 32px 72px 52px 1fr;
    
    Input {
      width: 600px;
      margin-bottom: 20px;

      &.int{
        margin-top: 20px;
      }
    }
    

    .ant-select {
      width: 600px !important;
    }

    .markdown{
      margin: 20px 0 0 0;
    }
  }
  
  .ant-select-selector{
    height: 100%;
  }
  
  .CodeMirror{
    height: 600px !important;
  }
`;

const JobPosting: FC = () => {
  const {Option} = Select;
  /*标题*/
  const [title,setTitle] = useState("");
  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  }
  /*学历*/
  const [education,setEducation] = useState("");
  const handleChangeEducation: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEducation(event.target.value);
    console.log(event.target.value);
  }
  /*地区*/
  const [area,setArea] = useState("");
  const handleChangeArea: ChangeEventHandler<HTMLInputElement> = (event) => {
    setArea(event.target.value);
    console.log(event.target.value);
  }
  /*薪资*/
  const [salary,setSalary] = useState("");
  const handleChangeSalary: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSalary(event.target.value);
    console.log(event.target.value);
  }
  /*权重*/
  const [weights,setWeights] = useState(["0","1","2","3","4","5","6","7","8","9","10"]);
  const [weight,setWeight] = useState("");
  const handleChangeWeights:(event: string) => void = (event) => {
    console.log(event);
    console.log(weight);
    setWeight(event)
  }
  /*markdown*/
  const [markdown, setMarkdown] = useState("");
  const result = () => {
    return "";
  }

  const handleClick = () => {
    let data = {
      title,
      weight,
      content: markdown,
      education,
      area,
      salary
    }
    request('/public-position/public','POST',data)
      .then(res => {
        if (res.data.code !== 200) return;
        setTitle(result());
        setWeights(["0","1","2","3","4","5","6","7","8","9","10"]);
        setMarkdown(result());
      })

    console.log(data);
  }

  return (
    <Main>
      <NavBar id={5}/>
      <div className="main">
        <Input
          placeholder="标题"
          value={title}
          onChange={handleChangeTitle}
        />
        <Select
          placeholder="权重"
          allowClear
          onChange={handleChangeWeights}
        >
          {weights.map(item => (
            <Option key={item} value={item}>{item}</Option>
          ))}
        </Select>
        <Input
          className="int"
          placeholder="学历"
          value={education}
          onChange={handleChangeEducation}
        />
        <Input
          placeholder="地区"
          value={area}
          onChange={handleChangeArea}
        />
        <Input
          placeholder="薪资"
          value={salary}
          onChange={handleChangeSalary}
        />
        <MarkdownEditor
          className="markdown"
          value={markdown}
          onChange={(editor: any, data: any, value: React.SetStateAction<string>) => setMarkdown(value)}
        />
        <Button
          className="btn"
          type="primary"
          onClick={handleClick}
        >
          上传
        </Button>
      </div>
    </Main>
  );
};

export {JobPosting};
