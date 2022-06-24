import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getFollow } from "../../services/api";

export default function Comment({ comment, name, image, userId, userPostId }) {
  const navigate = useNavigate();
  const [followers, setFollowers] = useState(false);

  const loggedUserId = localStorage.getItem("id")

  useEffect(() => {
    async function getFollowers(loggedUserId, followId) {
      const result = await getFollow(loggedUserId, followId);
      setFollowers(result.data);
    }
    getFollowers(loggedUserId, userId)
  }, [])

  return (
    <ContainerComment>
      <img src={image} alt="user" />
      <CommentInfos>
        <h4 onClick={() => navigate(`/users/${userId}`)}>{name}
          {followers === true ? (<span> • following</span>) : ""}
          {userPostId === userId ? (<span> • post’s author</span>) : ""}
        </h4>
        <p>{comment}</p>
      </CommentInfos>
    </ContainerComment >
  )
}

const ContainerComment = styled.article`
  display:flex;
  align-items:center;
  padding-bottom: 19px;
  border-bottom:1px solid #353535;
  margin-top: 15px;

  img {
    width: 39px;
    height: 39px;
    border-radius: 304px;
  }

`
const CommentInfos = styled.div`
  display:flex;
  flex-direction: column;
  margin-left: 18px;

  h4 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #F3F3F3;
    cursor: pointer;
  }

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
  }

  span {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #565656;
  }
`