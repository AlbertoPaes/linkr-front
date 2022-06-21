import styled from "styled-components";
import { useState, useEffect } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { IconContext } from "react-icons";

import { getCommentByPostId } from "../../services/api";

export default function Comments({ comments, setCommentBox }) {

  return (
    <Wrapper onClick={setCommentBox}>
      <IconContext.Provider value={{ color: "#FFFFFF", className: "comment", size: "25px" }}>
        <AiOutlineComment name="comment" />
      </IconContext.Provider>
      <p>{comments.length} {comments.length > 1 ? "comments" : "comment"}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 5px;
    margin-left: -15px;

    @media (max-width: 800px) {
      font-size: 9px;
    }
  }
`