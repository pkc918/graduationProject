import React, {ChangeEventHandler, FC, useEffect, useState} from 'react';
import {NavBar} from '../../components/Nav';
import styled from 'styled-components';
import {Button, DatePicker, Input, Select, Table, TablePaginationConfig} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import request from '../../request/request';
import moment from 'moment';
import {ColumnsType} from 'antd/es/table';
import UpdateXLS from '../../components/UpdateXLS';

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;

  > div {
    width: 100%;
    padding: 30px;
    display: grid;
    grid-template-columns: 15% 85%;

    > .search {
      padding-right: 30px;
      border-right: 1px dashed #333;

      > div {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
      }
    }

    > .dataInfo {
      margin-left: 30px;
    }
  }

  .ant-pagination-options {
    display: none;
  }
`;

interface TopBar {
  key: number;
  name: string;
}

const QueryPage: FC = () => {
  const {Option} = Select;
  const {RangePicker} = DatePicker;

  /*可选数据*/
  const [education] = useState(['博士', '硕士', '本科', '大专', '中专', '中技', '高中', '学历不限']);
  const [position, setPosition] = useState([]);
  const [citys, setCitys] = useState([]);

  /*table 数据*/
  const [pagination, setPagination] = useState({current: 1, total: 0});
  const [dataSource, setDataSource] = useState([]);
  const columns: ColumnsType<TopBar> = [
    {
      title: '城市',
      dataIndex: 'areaName',
      key: 'areaName',
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
      dataIndex: 'salary',
      key: 'salary',
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
    }
  ];

  const handleChangePage = (page: TablePaginationConfig) => {
    let {current, total} = page;
    // @ts-ignore
    setPagination({current, total});
  };

  /*筛选数据*/
  const [educationId, setEducation] = useState('');
  const handleEducationId: (event: string) => void = (event => {
    console.log(event);
    setEducation(event);
  });
  const [searchName, setSearchName] = useState('');
  const handleSearchName: (event: string) => void = (event => {
    console.log(event);
    setSearchName(event);
  });
  const [jobName, setJobName] = useState('');
  const handleJobName: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);
    setJobName(event.target.value);
  };
  const [areaName, setAreaName] = useState('');
  const handleChangeId: (event: string) => void = (event) => {
    console.log(event);
    setAreaName(event);
  };
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const timeValue = (value: any) => {
    console.log(value);
    if (value) {
      setStartTime(moment(value[0]._d).format('YYYY-MM-DD HH:mm:ss'));
      setEndTime(moment(value[1]._d).format('YYYY-MM-DD HH:mm:ss'));
      return;
    }
    setStartTime('');
    setEndTime('');
  };

  /*submit*/
  const handleSubmit = () => {
    let data = {
      education: educationId,
      searchName,
      jobName,
      areaName,
      startTime,
      endTime
    };
    request(`/spider-position/selectPage?pageNum=${pagination.current}&pageSize=10`, 'POST', data)
      .then(res => {
        let {records, total, current} = res.data.data;
        setDataSource(records);
        setPagination({
          current,
          total
        });
        console.log(res.data.data);
      });
  };

  useEffect(() => {
    request(`/spider-position/selectPage?pageNum=1&pageSize=10`, 'POST')
      .then(res => {
        let {records, total, current} = res.data.data;
        setDataSource(records);
        setPagination({
          current,
          total
        });
        console.log(res.data.data);
      });
    request('/spider-position/area', 'POST')
      .then(res => {
        setCitys(res.data.data);
        console.log(res.data.data);
      });
    request('/spider-position/getPosition', 'POST')
      .then(res => {
        console.log('爬虫检索名称');
        setPosition(res.data.data);
        console.log(res.data.data);
      });
  }, []);

  return (
    <Div className="page">
      <NavBar id={2}/>
      <div>
        <div className="search">
          <Select
            placeholder="学历"
            allowClear
            onChange={handleEducationId}
          >
            {education.map(item => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </Select>
          <Select
            placeholder="爬虫检索名称"
            allowClear
            onChange={handleSearchName}
          >
            {position.map(item => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </Select>
          <div>
            <Input
              placeholder="职位"
              allowClear
              value={jobName} onChange={handleJobName}/>
          </div>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={timeValue}
          />
          <Select
            placeholder="地区"
            allowClear
            onChange={handleChangeId}
          >
            {citys.map(item => (
              <Option
                key={item}
                value={item}
              >{item}</Option>
            ))}
          </Select>
          <div>
            <Button
              className="btn"
              type="primary"
              icon={<SearchOutlined/>}
              onClick={handleSubmit}
            >
              查询
            </Button>
            <UpdateXLS/>
          </div>
        </div>
        <div className="dataInfo">
          <Table
            onChange={(page) => {handleChangePage(page);}}
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            pagination={pagination}
          />
        </div>
      </div>
    </Div>
  );
};

export default QueryPage;
