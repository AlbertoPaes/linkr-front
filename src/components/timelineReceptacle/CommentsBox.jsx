import styled from "styled-components";
import { useState } from "react";
import { IconContext } from "react-icons";
import { IoPaperPlaneOutline } from "react-icons/io5";

import Comment from "./Comment"
import { postComment } from "../../services/api";

export default function CommentsBox({ comments, postId, setRealodComments, commentBox, userPostId }) {
  const userImage = localStorage.getItem("image");

  const [comment, setComment] = useState("");
  const [submitInputLoad, setSubmitInputLoad] = useState(false);

  function handleTextArea(e) {
    setComment(e.target.value)
    e.target.style.height = "38px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13 && e.shiftKey === false && comment.replace(/\s/g, "").length !== 0) {
      e.preventDefault();
      handleForm();
    }

  }

  async function handleForm() {
    setSubmitInputLoad(true);
    try {
      postComment(postId, comment);
      setComment("");
      setRealodComments();
      setSubmitInputLoad(false);
    } catch (e) {
      console.log(e);
      alert("Something went wrong")
      setSubmitInputLoad(false);
    }
  }

  return commentBox ? (

    <Wrapper comments={comments}>
      {comments.map(({ id, comment, name, image, userId }) => {
        return comment.lenght !== 0 ? (
          <Comment
            key={id}
            userPostId={userPostId}
            userId={userId}
            comment={comment}
            name={name}
            image={image}
          />
        ) : <></>
      })}

      <PublishComment>
        <img src={userImage} alt="user" />

        <ContainerInput >
          <Form onSubmit={handleForm}>
            <textarea
              rows="1"
              value={comment}
              type="text"
              onChange={handleTextArea}
              onKeyDown={handleKeyDown}
              disabled={submitInputLoad}
            />
          </Form>
          <IconContext.Provider value={{ color: "#FFFFFF", className: "paper-plane", size: "20px" }}>
            <IoPaperPlaneOutline onClick={handleForm} />
          </IconContext.Provider>

        </ContainerInput>

      </PublishComment >
    </Wrapper>
  ) : <></>
}

const Wrapper = styled.section`
  padding: 25px;
  position: relative;
  z-index: 1;
  top: -25px;
  width: 100%;
  height: fit-content;
  margin-bottom: -30px;

  background: #1E1E1E;
  border-radius: 16px;
`

const PublishComment = styled.article`
  display: flex;
  padding-top: 20px;
  width: 100%;

  img {
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
  }
  
`

const Form = styled.form`
  width: 100%;
`

const ContainerInput = styled.div`
  position: relative;
  margin-left: 20px;
  width: 100%;
  display:flex;
  align-items: center;
  background-color: #252525;
  border-radius: 8px;

  textarea {
    width: 100%;
    height: auto;
    min-height: 39px;
    background-color: #252525;
    border-radius: 8px;
    border: none;
    padding: 11px 15px;

    font-family: 'Lato';
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #ffffff;
    resize: none;

    &:focus {
      outline: none;
    }
  }

  .paper-plane {
    margin-right: 15px;
    cursor: pointer;
  }
`