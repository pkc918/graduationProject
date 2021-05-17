import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import {NavBar} from '../../components/Nav';
import request from '../../request/request';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';

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
    grid-template-rows: 52px 32px 1fr;
  }
`;

interface TopBar {
  key: number;
  name: string;
}


const MayLike:FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const columns: ColumnsType<TopBar> = [
    {
      title: '城市',
      dataIndex: 'workareaText',
      key: 'workareaText',
    },
    {
      title: '公司',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
    },
    {
      title: '职位',
      dataIndex: 'jobName',
      key: 'jobName',
    },
    {
      title: '薪资',
      dataIndex: 'providesalaryText',
      key: 'providesalaryText',
    },
    {
      title: '要求',
      dataIndex: 'years',
      key: 'years',
    },
    {
      title: '时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '爬虫检索名称',
      dataIndex: 'searchName',
      key: 'searchName'
    },
    {
      title: '查看详情',
      dataIndex: 'companyHref',
      key: 'companyHref',
      render: (url) => (
        <a href={url}>详情</a>
      ),
    }
  ]
  useEffect(() => {
    request('/spider-position/guessYouLike','POST')
      .then(res => {
        setDataSource(res.data.data);
        console.log(res.data.data);
      })
  },[])
  return(
    <Main>
      <NavBar id={8}/>
      <div className="main">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
        />
      </div>
    </Main>
  )
}

export {MayLike}
