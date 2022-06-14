import styled from "styled-components";

const Input = styled.input`
  height: 58px;
  width: 100%;
  
  background-color: #FFFFFF;
  color: #000000;
  
  font-family: 'Raleway';
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  text-align: left;
  
  padding: 14px;
  margin-bottom: 13px;
  border-radius: 5px;
  border: 1px solid #D4D4D4;
  &::placeholder {
    color: #000000;
    font-family: 'Raleway', sans-serif;
  }
  &::disabled {
    background-color: #F2F2F2;
    color: #AFAFAF;
  }
`;

export default Input;