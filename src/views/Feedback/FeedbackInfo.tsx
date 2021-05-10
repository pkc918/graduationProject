import styled from 'styled-components';
import {FC, useEffect, useState} from 'react';
import {NavBar} from '../../components/Nav';
import request from '../../request/request';
import {Pagination,Button} from 'antd';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;

  > .main {
    width: 100%;
    padding: 30px;
    display: grid;
    overflow-y: auto;

    section {
      width: 900px;
      border: 1px #000 dashed;
      padding: 10px;
      margin-bottom: 40px;

      Button{
        margin-bottom: 10px;
      }

      h3 {
        width: 100%;
        height: 40px;
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        background-color: #ffccc7;
        border-radius: 10px;
        margin-bottom: 10px;
      }

      main {
        width: 100%;
        height: 100px;
        word-wrap: break-word;
        overflow-y: auto;
        background-color: #f9e1bb;
        font-size: 18px;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }

  .ant-pagination-options {
    display: none;
  }
`;

const FeedbackInfo: FC = () => {
  /*反馈数据*/
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(1);
  const [page,setPage] = useState(1);
  const [pageSize] = useState(4);
  /*分页*/
  const handleChange = (page: number) => {
    setPage(() => {
      return page
    })
  }
  const getFeedBack = () => {
    request('/feedback/selectPage', 'GET', {'pageNum':page,pageSize})
      .then(res => {
        console.log('反馈');
        console.log(res.data.data);
        setTotal(res.data.data.total);
        setTableData(res.data.data.records);
      });
  }
  /*删除*/
  const handleDelete = (item: any) => {
    console.log(item);
    request('/feedback/delete','GET',{id:item.id})
      .then(res => {
        console.log(res);
        if (res.data.code === 200) {
          getFeedBack()
        }
      })
  }



  useEffect(() => {
    getFeedBack()
  }, [page]);

  return (
    <Main>
      <NavBar id={3}/>
      <div className="main">
        {
          tableData.map(item => {
            return (
              <section key={Math.random()}>
                <Button
                  onClick={() => {handleDelete(item)}}
                  type="primary"
                  danger>删除</Button>
                {/* @ts-ignore*/}
                <h3>{item.createTime}</h3>
                {/* @ts-ignore*/}
                <main>{item.feedBack}</main>
              </section>
            );
          })
        }
        <Pagination
          defaultCurrent={1}
          current={page}
          onChange={(page) => {handleChange(page)}}
          total={total}/>
      </div>
    </Main>
  );
};

export default FeedbackInfo;
