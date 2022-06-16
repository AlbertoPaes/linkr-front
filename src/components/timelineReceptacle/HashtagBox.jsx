import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactHashtag from "@mdnm/react-hashtag";
import { useEffect } from "react";

import { getPostsByHashtag } from "../../services/api";



export default function HashtagBox() {
  const [hashtags, setHashtags] = useState([]);
  const [postLoadind, setPostLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPostsByHashtag();
        setHashtags(response.data);
        setPostLoading(false);
      } catch (e) {
        console.log(e);
        alert("An error occured while trying to fetch the posts, please refresh the page")
      }
    })();
  }, []);

  return (
    <WrapperHashtags>
      <h2>trendings</h2>
      <div></div>
    </WrapperHashtags>
  );
};

const WrapperHashtags = styled.aside`
  position: sticky;
  top: 100px;
  width:301px;
  height: fit-content;
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

  div {
    position: absolute;
    top: 0;
    height: 10px;
    width: 10px;
    background-color: red;
    border-bottom: 1px solid #ccc;
  }

  @media(max-width: 800px){
    display:none;
  }
  `