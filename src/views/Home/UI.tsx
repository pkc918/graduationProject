import styled from 'styled-components';
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
      grid-template-columns: 700px 1fr;
      overflow: scroll;

      > .bar {
        grid-area: bar;
      }

      > .main {
        grid-area: main;
        display: grid;
        grid-template-rows: auto auto;
      }
    }
  `;
export {
  Main
}
