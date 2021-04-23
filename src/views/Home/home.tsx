import React, {FC, useEffect, useState} from 'react';
import EChartsReact from 'echarts-for-react';
import request from '../../request/request';

const Home: FC = () => {
  const [positionName, setPositionName] = useState(['']);
  const [positionNumber, setPositionNumber] = useState([5000]);
  useEffect(() => {
    let profession: Array<string> = [];
    let demand: Array<number> = [];
    request('/spider-position/position-num', 'POST')
      .then(res => {
        let data = res.data.data;
        for (let item of data) {
          profession.push(item.positionName);
          demand.push(item.positionNumber);
        }
        setPositionName(profession);
        setPositionNumber(demand)
      });
  },[]);
  let option = {
    title: {
      text: '职位需求量',
      textAlign: 'auto'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          background: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: positionName,
    },
    yAxis: {
      type: 'value',
      data: [100, 500, 1000, 2000, 5000, 6000]
    },
    series: [{
      data: positionNumber,
      type: 'line',
      areaStyle: {
        color: '#f60'
      },
      smooth: true,
      itemStyle: {
        borderWidth: 0
      },
    }]
  };
  return (
    <div className="App">
      <EChartsReact
        option={option}
        style={{width: '50%'}}
      />
    </div>
  );
};

export default Home;
