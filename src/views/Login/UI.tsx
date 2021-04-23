import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  background: url("https://static.xiedaimala.com/xdml/image/6e556a51-b8ff-466f-bda6-7d1847e39f2e/2019-12-4-14-4-6.jpg") center center / 100% 100% no-repeat;
  
  > .form {
    width: 400px;
    padding-bottom: 20px;
    background-color: #fff;
    border-radius: 10px;
    display: grid;
    text-align: center;
    align-items: center;
    grid-auto-columns: 100%;
    grid-auto-rows: 80px 80px 80px 80px 80px;

    > h2 {
      font-size: 24px;
      font-weight: 500;
    }

    > .userName {
      justify-self: center;
      width: 300px;
      height: 40px;
      padding: 10px;
      border: 1px solid #333;
      border-radius: 6px;
      outline: none;
    }

    > .password {
      justify-self: center;
      width: 300px;
      height: 40px;
      padding: 10px;
      border: 1px solid #333;
      border-radius: 6px;
      outline: none;
    }

    > .verificationCode {
      width: 300px;
      justify-self: center;
      display: grid;
      grid: 'input btn';
      grid-auto-rows: 150px 150px;

      > input {
        grid-area: input;
        width: 150px;
        height: 40px;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 6px;
        outline: none;
      }

      > button {
        grid-area: btn;
        width: 130px;
        height: 40px;
        color: #fff;
        border: none;
        background-color: #fff;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        
        img{
          width: 100%;
          height: 100%;
          border: none;
        }
      }
    }

    > .loginBtn {
      justify-self: center;
      width: 300px;
      height: 40px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 5px;
    }
  }
`;

export {
  Div
}
