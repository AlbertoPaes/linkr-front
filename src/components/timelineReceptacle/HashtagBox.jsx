import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactHashtag from "@mdnm/react-hashtag";
import { useEffect } from "react";

import { getHashtagsByQuantity } from "../../services/api";
import Loading from "../Loading";

export default function HashtagBox({ reloadPage }) {
  const navigate = useNavigate();

  const [hashtags, setHashtags] = useState([]);
  const [postLoadind, setPostLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getHashtagsByQuantity();
        setHashtags(response.data);
        setPostLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [reloadPage]);

  function handlHashtag(value) {
    const hashtag = value.replace("#", "");
    navigate(`/hashtag/${hashtag}`);
  }

  console.log(hashtags.length)

  return (
    <WrapperHashtags>
      <h2>trendings</h2>
      <div className="horizontal-line"></div>
      {!postLoadind ? (
        <ContainerHashtags>
          {hashtags.lenght !== 0 ? (
            hashtags.map(({ name, hashtagId }) => {
              return (
                <ReactHashtag onHashtagClick={(value) => handlHashtag(value)} key={hashtagId}>{name}</ReactHashtag>
              )
            })
          ) : <h3>There are no hashtags yet</h3>}

        </ContainerHashtags>
      ) : <Loading />}

    </WrapperHashtags>
  )
};

const WrapperHashtags = styled.aside`
  position: sticky;
  top: 100px;
  height: fit-content;
  min-height: 310px;
  width: 301px;
  margin-left: 25px;
  margin-top: 85px;
  padding: 9px 16px 9px 16px;
  background-color: #171717;
  border-radius: 16px;  

  h2 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
  }

  .horizontal-line {
    position: absolute;
    width: 100%;
    top: 60px;
    left: 0;
    border: 1px solid #484848;
  }

  @media(max-width: 800px){
    display:none;
  }
  `

const ContainerHashtags = styled.section`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;

  span {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    margin-bottom: 10px;
    color: #FFFFFF;
    cursor: pointer;
  }

  h3 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 64px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 20px;
  }
`