import React, {FC, useEffect, useState} from 'react';
import EChartsReact from 'echarts-for-react';
import request from '../../request/request';
import styled from 'styled-components';
import {NavBar} from '../../components/Nav';

const Main = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;

    > div {
      width: 100%;
      padding: 30px;
      display: grid;
      grid-template-areas: "bar main";
      grid-template-columns: 800px 1fr;

      > .bar {
        grid-area: bar;
      }

      > .main {
        grid-area: main;
        margin-left: 60px;
        display: grid;
        grid-template-rows: auto auto;
      }
    }
  `;


const Home: FC = () => {
  const [positionName, setPositionName] = useState(['']);
  const [positionNumber, setPositionNumber] = useState([5000]);
  const [education, setEducation] = useState([{}]);
  const getEducation = () => {
    let educations: Array<object> = [];
    request('/spider-position/education-num', 'POST')
      .then(res => {
        educations = res.data.data.map((item: { education: string, requiredNum: number }) => {
          return {name: item.education, value: item.requiredNum};
        });
        setEducation(educations);
      });
  };
  const [salaryData, setSalary] = useState(['']);
  const [range5, setRange5] = useState([10]); // 5
  const [range10, setRange10] = useState([10]); // 5~10
  const [range18, setRange18] = useState([10]); // 18
  const [range20, setRange20] = useState([10]); // 20
  const [range30, setRange30] = useState([10]); // 30
  const getSalary = () => {
    let hashTable: Array<string> = [];
    let a5: Array<number> = [];
    let a10: Array<number> = [];
    let a18: Array<number> = [];
    let a20: Array<number> = [];
    let a30: Array<number> = [];
    request('/spider-position/salary-section', 'GET')
      .then(res => {
        res.data.data.forEach((item: object) => {
          for (let key in item) {
            // @ts-ignore
            a5.push(item[key][`5K以下`]);
            // @ts-ignore
            a10.push(item[key]['5K~10K']);
            // @ts-ignore
            a18.push(item[key]['10K~18K']);
            // @ts-ignore
            a20.push(item[key]['20K~30K']);
            // @ts-ignore
            a30.push(item[key][`30K以上`]);
            hashTable.push(key);
          }
        });
        setSalary(hashTable);
        setRange5(a5);
        setRange10(a10);
        setRange18(a18);
        setRange20(a20);
        setRange30(a30);
      });
  };

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
        setPositionNumber(demand);
      });
    getEducation();
    getSalary();
  }, []);
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
      left: 'left',
      top: 100
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '招聘需求量',
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
  let barOption = {
    title: {
      text: '职位薪资',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['5k以下', '5k~10k', '10k~18k', '20k~30k', '30k以上'],
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
      data: salaryData
    },
    series: [
      {
        name: '5k以下',
        type: 'bar',
        data: range5
      },
      {
        name: '5k~10k',
        type: 'bar',
        data: range10
      },
      {
        name: '10k~18k',
        type: 'bar',
        data: range18
      },
      {
        name: '20k~30k',
        type: 'bar',
        data: range20
      },
      {
        name: '30k以上',
        type: 'bar',
        data: range30
      }
    ]
  };

  return (
    <Main>
      <NavBar id={1}/>
      <div>
        <EChartsReact
          className="bar"
          option={barOption}
          style={{width: '800px', height: '800px'}}
        />
        <div className="main">
          <EChartsReact
            option={lineOption}
            style={{width: '500px', height: '300px'}}
          />
          <EChartsReact
            option={pieOption}
            style={{width: '500px', height: '500px'}}
          />
        </div>
      </div>
    </Main>
  );
};

export default Home;
