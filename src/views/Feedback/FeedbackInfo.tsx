import styled from 'styled-components';
import {FC} from 'react';
import {NavBar} from '../../components/Nav';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;

  > .main{
    width: 100%;
    padding: 30px;
    display: grid;
  }
`

const FeedbackInfo: FC = () => {
  return(
    <Main>
      <NavBar id={3} />
      <div className="main">
        123
      </div>
    </Main>
  )
}

export default FeedbackInfo
