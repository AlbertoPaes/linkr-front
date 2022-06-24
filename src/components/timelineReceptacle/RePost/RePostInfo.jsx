import styled from 'styled-components';
import { IconContext } from "react-icons";
import { FiRepeat } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


const RePostInfo = ({repostUserId, repostUserName}) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const reposterPage = () => {
    navigate(`/users/${repostUserId}`);
  }

  return (
    <RePostInfoContainer>
      <IconContext.Provider value={{ color: "#FFFFFF", className: "firepeat-icon" }}>
        <FiRepeat />
        <p>{`Re-posted by `} <span onClick={reposterPage}> {parseInt(userId) === repostUserId ? 'you' : repostUserName} </span></p>
      </IconContext.Provider>
    </RePostInfoContainer>
  );
}

const RePostInfoContainer = styled.div`
  width: 611px;
  height: 43px;

  display: flex;
  gap: 6px;

  padding-top: 10px;
  padding-bottom: 10px;

  background-color: #1e1e1e;
  border-radius: 16px 16px 0px 0px;

  position: relative;
  top: 24px;

  .firepeat-icon {
    width: 20px;
    height: 12px;
    margin-left: 10px;
  }

  p {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;

    color: #FFFFFF;
  }

  span {
    font-weight: bold;
    cursor: pointer;
  }

  @media (max-width: 800px){
    width: 100vh;
    border-radius: unset;
  }
`;

export default RePostInfo;