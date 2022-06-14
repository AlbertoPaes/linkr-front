import {ThreeDots} from "react-loader-spinner";
import styled from "styled-components";


const Loading = ({height,width}) => {
  return (
    <Wrapper>
      <ThreeDots 
        type="ThreeDots"
        color="#FFFFFF"
        height={height}
        width={width}
        timeout={3000}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Loading;