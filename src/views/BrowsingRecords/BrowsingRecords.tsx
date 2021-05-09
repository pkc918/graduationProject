import React, {FC, useEffect, useState} from 'react';
import {NavBar} from '../../components/Nav';
import styled from 'styled-components';
import request from '../../request/request';
import EChartsReact from 'echarts-for-react';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  
  > .main{
    width: 100%;
    padding: 30px;
    display: grid;
    grid-template-columns: 50% 50%;
  }
`

const BrowsingRecords: FC = () => {
  /*南丁格尔图*/
  const [pieData,setPieData] = useState([{}]);
  const pieOption = {
    legend: {
      top: 'top'
    },
    toolbox: {
      show: true,
      right: '20',
      feature: {
        mark: {show: true},
        saveAsImage: {
          show: true,
          title: '存为图片'
        }
      }
    },
    series: [
      {
        name: '面积模式',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: pieData
      }
    ]
  };


  const getInfo = () => {
    request('/browse-records/browse-records','POST')
      .then(res => {
        console.log(res.data.data);
      })
  }


  useEffect(() => {
    request('/browse-records/browse-records','POST')
      .then(res => {
        console.log(res.data.data);
      })
    // setTimeout(() => {
    //   setPieData([
    //     {value: 40, name: 'rose 1'},
    //     {value: 38, name: 'rose 2'},
    //     {value: 32, name: 'rose 3'},
    //     {value: 30, name: 'rose 4'},
    //     {value: 28, name: 'rose 5'},
    //     {value: 26, name: 'rose 6'},
    //     {value: 22, name: 'rose 7'},
    //     {value: 18, name: 'rose 8'}
    //   ])
    // },0)
    getInfo()
  }, [])

  return(
    <Main>
      <NavBar id={4} />
      <div className="main">
        <div className="browsing">
          <EChartsReact
            className="bar"
            option={pieOption}
            style={{width: '800px', height: '800px'}}
          />
        </div>
        <div className="release">
          发布职位
        </div>
      </div>
    </Main>
  )
}

export default BrowsingRecords
