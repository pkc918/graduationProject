import React, {FC, useEffect, useState} from 'react';
import {NavBar} from '../../components/Nav';
import styled from 'styled-components';
import {Button, DatePicker, Select, Table} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import request from '../../request/request';
import moment from 'moment';

const Div = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;

    > div {
      width: 100%;
      padding: 30px;
      display: grid;
      grid-template-columns: 20% 80%;
      
      >.search{
        padding-right: 30px;
        border-right: 1px dashed #333;
        
        > div{
          width: 100%;
          margin-bottom: 20px;
        }
      }
      
      >.dataInfo{
        margin-left: 30px;
      }
    }
  `


const pagination = {
  current: 1,
  pageSize: 10,
  total: 50
}

const QueryPage: FC = () => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  /*可选数据*/
  const [education] = useState(["博士","硕士","本科","大专","中专","中技","高中","学历不限"]);
  const [position] = useState(["java","python爬虫","全栈工程师","前端","大数据"]);
  const [citys,setCitys] = useState([]);
  /*筛选数据*/
  const [educationId,setEducation] = useState('');
  const handleEducationId: (event: string) => void = (event => {
    console.log(event);
    setEducation(event);
  })
  const [jobName,setJobName] = useState('');
  const handleJobName: (event: string) => void = (event => {
    console.log(event);
    setJobName(event);
  })
  const [areaName,setAreaName] = useState('');
  const handleChangeId:(event: string) => void = (event) => {
    console.log(event);
    setAreaName(event);
  }
  const [startTime,setStartTime] = useState('');
  const [endTime,setEndTime] = useState('');

  const timeValue = (value: any) => {
    console.log(moment(value[0]._d).format('YYYY-MM-DD'));
    console.log(moment(value[1]._d).format('YYYY-MM-DD'));
    setStartTime(moment(value[0]._d).format('YYYY-MM-DD'));
    setEndTime(moment(value[1]._d).format('YYYY-MM-DD'));
  }

  /*submit*/
  const handleSubmit = () => {
    let data = {
      education: educationId,
      jobName,
      areaName,
      startTime,
      endTime
    }
    console.log(data);
  }

  useEffect(() => {
    request('/spider-position/area','POST')
      .then(res => {
        setCitys(res.data.data);
        console.log(res.data.data);
      })
  },[])


  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Div className="page">
      <NavBar id={2}/>
      <div>
        <div className="search">
          <Select
            placeholder="学历"
            onChange={handleEducationId}
          >
            {education.map(item => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </Select>
          <Select
            placeholder="职位"
            onChange={handleJobName
            }
          >
            {position.map(item => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </Select>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={timeValue}
          />
          <Select
            placeholder="地区"
            onChange={handleChangeId}
          >
            {citys.map(item => (
              <Option
                key={item}
                value={item}
              >{item}</Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<SearchOutlined/>}
            onClick={handleSubmit}
          >
            查询
          </Button>
        </div>
        <div className="dataInfo">
          <Table
            dataSource={dataSource} columns={columns}
            pagination={pagination}
          />
        </div>
      </div>
    </Div>
  )
}

export default QueryPage
