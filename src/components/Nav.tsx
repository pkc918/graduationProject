import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.ul`
  background: #aaa;
  width: 180px;
  min-width: 180px;
  height: 100%;
  padding: 40px 0;
  list-style: none;
  
  > li{
    width: 100%;
    height: 60px;
    background: #f60;
    
    > a{
      display: inline-block;
      width: 100%;
      height: 100%;
      font-size: 18px;
      color: #000;
      text-align: center;
      line-height: 60px;
    }
    
    .seleted{
      font-weight: 600;
      background-color: #fff;
    }
  }
`;
type propsType = {
  id: number
}
const NavBar = (props: propsType) => {
  return (
    <Nav>
      <li>
        <Link className={props.id === 1 ? 'seleted' : ''} to="/home">数据统计</Link>
      </li>
    </Nav>
  );
};

export {NavBar};
