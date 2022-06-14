import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 375px){
    flex-direction: column;
  }
`

const ContainerPresentation = styled.div`
  width: 62.84%;
  min-height: inherit;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  padding: 29.39% 0px 0px 10%;

  background-color:#151515;
  color: #fff;

  @media (max-width: 375px){
    width: 100%;
    min-height: 175px;

    justify-content: center;
    align-items: center;
    padding: 0px;
  }
`

const Logo = styled.p`
  font-family: 'Passion One';
  font-weight: 700;
  font-size: 106px;
  line-height: 117px;
  letter-spacing: 0.05em;

  color: #FFFFFF;

  @media (max-width: 375px){
    font-size: 76px;
    line-height: 84px;

    justify-content: start;
  }
`

const Title = styled.div`
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;

  color: #FFFFFF;

  @media (max-width: 375px){
    font-size: 23px;
    line-height: 34px;
    text-align: center;
  }
`

const ContainerSignUp = styled.form`
  min-height: inherit;
  width: 37.16%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 13px;

  background-color: #333333;

  input {
    height: 85px;
    width: 80%;

    background-color: #FFFFFF;
    color: #9F9F9F;
    
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    
    padding-left: 17px;

    border: none;
    border-radius: 6px;

    &::placeholder {
      color: #9F9F9F;
    }
    &::disabled {
      background-color: #F2F2F2;
      color: #AFAFAF;
    }
  }

  button {
    height: 65px;
    width: 80%;
    background-color: ${props => typeof props.active !== 'boolean' || props.active ? "#1877F2" : "#888"};
    opacity: ${ props => props.disableButton ? 0.7 : 1 };
    color: #FFFFFF;
    
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;

    text-align: center;

    border-radius: 6px;
    border: none;
    
    cursor: ${ props => props.disableButton ? 'not-allowed' : 'pointer' };
    pointer-events: ${ props => props.disableButton ? 'none' : 'auto'};
  }

  @media (max-width: 375px){
    width: 100%;
    min-height: 492px;

    gap: 11px;

    justify-content: start;
    padding-top: 40px;

    input {
      width: 90%;
      height: 55px;
      font-size: 22px;
    }

    button {
      width: 90%;
      height: 55px;
      font-size: 22px;
    }
  }
`

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Lato';
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  text-decoration-line: underline;

  color: #FFFFFF;

  @media (max-width: 375px){
    font-size: 17px;
  }
`;

export {
  Wrapper,
  ContainerPresentation,
  Logo,
  Title,
  ContainerSignUp,
  StyledLink
}