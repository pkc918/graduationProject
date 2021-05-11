import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import {NavBar} from '../../components/Nav';
import {Button, Table, TablePaginationConfig} from 'antd';
import {ColumnsType} from 'antd/es/table';
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
    grid-template-rows: 52px 32px 1fr;
  }
`

interface TopBar {
  key: number;
  name: string;
}


const MyRelease: FC = () => {
  const handleInfoData = (id: string, type: string) => {
    if (type === 'delete') {
      request('/public-position/delete','GET',{id})
        .then(res => {
          if (res.data.code === 200) {
            getMyReleaseData()
          }
        })
    }
    if (type === 'details') {
      request('/public-position/selectOne','GET',{id})
        .then(res => {
          console.log(res);
        })
    }
    console.log(id);
    console.log(type);
  }

  const columns: ColumnsType<TopBar> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: '查看详情',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Button
          type="primary"
          onClick={() => {handleInfoData(id,'details')}}
          >查看详情</Button>
      ),
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Button
          type="primary"
          onClick={() => {handleInfoData(id,'delete')}}
          danger>删除</Button>
      ),
    }
  ];

  const [total, setTotal] = useState(1);
  const [page,setPage] = useState(1);
  const [pageSize] = useState(10);
  const [dataSource,setDataSource] = useState([]);

  const getMyReleaseData = () => {
    request('/public-position/select','GET',{pageNum:page,pageSize})
      .then(res => {
        console.log(res.data.data.records)
        setDataSource(res.data.data.records);
        setTotal(res.data.data.records.length || 1)
      })
  }
  /*分页*/
  const handleChange = (page: TablePaginationConfig) => {
    console.log(page);
    const {current} = page
    setPage(() => {
      return current || 1
    })
  }

  useEffect(() => {
    getMyReleaseData()
  },[page]);


  return(
    <Main>
      <NavBar id={6}/>
      <div className="main">
        <Table
          columns={columns}
          rowKey="id"
          dataSource={dataSource}
          pagination={{current:page,pageSize,total}}
          onChange={(page) => {handleChange(page)}}
        />
      </div>
    </Main>
  )
}

export default MyRelease
