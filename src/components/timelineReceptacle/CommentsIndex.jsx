import styled from "styled-components";
import { AiOutlineComment } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Comments({ comments, setCommentBox, commentBox }) {

  return (
    <Wrapper onClick={setCommentBox} commentBox={commentBox}>
      <IconContext.Provider value={{ color: "#FFFFFF", size: "25px" }}>
        <AiOutlineComment className="comment" name="comment" />
      </IconContext.Provider>
      <p>{comments.length} {comments.length > 1 ? "comments" : "comment"}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .comment > * {
    fill: ${({ commentBox }) => commentBox ? "#727272" : "#ffffff"};
  }


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