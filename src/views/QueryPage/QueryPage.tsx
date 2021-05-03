import React, {FC} from 'react';
import {NavBar} from '../../components/Nav';
import styled from 'styled-components';
import {Button, DatePicker, Select, Table} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const pagination = {
  current: 1,
  pageSize: 10
}

const QueryPage: FC = () => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
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
  return(
    <Div className="page">
      <NavBar id={2}/>
      <div>
        <div className="search">
          <Select placeholder="学历">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select placeholder="职位">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <RangePicker />
          <Select placeholder="地区">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Button type="primary" icon={<SearchOutlined />}>
            查询
          </Button>
        </div>
        <div className="dataInfo">
          <Table
            rowKey={record => record.login.uuid}
            pagination={pagination}
          />
        </div>
      </div>
    </Div>
  )
}

export default QueryPage
