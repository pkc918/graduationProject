import styled from 'styled-components';

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

export {
  Div
}
