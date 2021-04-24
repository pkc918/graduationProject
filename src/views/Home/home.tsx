import React, {FC, useEffect, useState} from 'react';
import EChartsReact from 'echarts-for-react';
import request from '../../request/request';
import styled from 'styled-components';

const Home: FC = () => {
  const Main = styled.main`
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
    //background: url("https://xiaopan-struggle.github.io/Echats-Demo/images/bg.jpg") no-repeat;
  `

  const [positionName, setPositionName] = useState(['']);
  const [positionNumber, setPositionNumber] = useState([5000]);
  const [education,setEducation] = useState([{}]);
  const getEducation = () => {
    let educations: Array<object> = [];
    request('/spider-position/education-num','POST')
      .then(res => {
        console.log(res);
        educations = res.data.data.map((item: {education: string, requiredNum: number}) => {
          return {name: item.education,value: item.requiredNum};
        });
        setEducation(educations);
      })
  }
  const getSalary = () => {
    request('/spider-position/salary-num','POST',{searchName: '大数据'})
      .then(res => {
        console.log(res);
      })
  }
  useEffect(() => {
    let profession: Array<string> = [];
    let demand: Array<number> = [];
    request('/spider-position/position-num', 'POST')
      .then(res => {
        console.log(res.data);
        let data = res.data.data;
        for (let item of data) {
          profession.push(item.positionName);
          demand.push(item.positionNumber);
        }
        setPositionName(profession);
        setPositionNumber(demand)
      });
    getEducation();
    getSalary();
  },[]);
  let lineOption = {
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
    axisTick: {
      alignWithLabel: true
    },
    // interval: 30,
    grid: {
      left: '0',
      right: '13%',
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
  let pieOption = {
    title: {
      text: '学历要求统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: education,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  let barOption =  {
    title: {
      text: '职位薪资',
      // textStyle: {
      //   color: '#fff'
      // }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['5k以下', '5k~10k','10k~18k','20k~30k','30k以上'],
      // textStyle: {
      //   color: '#fff'
      // }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['前端','Java','大数据','Python','全栈']
    },
    series: [
      {
        name: '5k以下',
        type: 'bar',
        data: [18203, 23489, 104970, 131744, 630230]
      },
      {
        name: '5k~10k',
        type: 'bar',
        data: [19325, 23438, 121594, 134141, 681807]
      },
      {
        name: '10k~18k',
        type: 'bar',
        data: [19325, 23438, 121594, 134141, 681807]
      },
      {
        name: '20k~30k',
        type: 'bar',
        data: [19325, 23438, 121594, 134141, 681807]
      },
      {
        name: '30k以上',
        type: 'bar',
        data: [19325, 31000, 121594, 134141, 681807]
      }
    ]
  };

  return (
    <Main>
      <EChartsReact
        option={barOption}
        style={{width: '800px',height:'600px'}}
      />
      <EChartsReact
        option={lineOption}
        style={{width: '500px',height: '300px'}}
      />
      <EChartsReact
        option={pieOption}
        style={{height: '600px'}}
      />

    </Main>
  );
};

export default Home;
