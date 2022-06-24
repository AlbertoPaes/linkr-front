import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReactHashtag from "@mdnm/react-hashtag";
import { useState, useRef, useEffect } from 'react';
import ReactModal from "react-modal";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import { updatePost, deletePost } from "../../services/api";
import { getCommentByPostId } from "../../services/api";
import Like from "./Like";
import Loading from "../Loading";
import Comments from "./CommentsIndex"
import CommentsBox from "./CommentsBox"
import RePost from "./RePost/RePost";

import noImage from "./noimage.png"

export default function Posts({
  id,
  link,
  description,
  image,
  name,
  urlTitle,
  urlImage,
  urlDescription,
  postId,
  setReloadPage
}) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);
  const [realoadComments, setRealodComments] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [delPostId, setDelPostId] = useState();
  const [comments, setComments] = useState([]);
  const [commentBox, setCommentBox] = useState(false);

  const inputRef = useRef(null);

  const loggedUserId = localStorage.getItem("id");
  let urlDescriptionSplice = urlDescription.slice(0, 150);

  const pattern =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/


  if (urlDescription.length > 150) {
    urlDescriptionSplice += "..."
  }

  if (!urlImage || !urlImage.match(pattern)) {
    urlImage = noImage;
  }

  function handleHashtag(value) {
    const hashtag = value.replace("#", "");
    navigate(`/hashtag/${hashtag}`);
  };

  async function editPost() {
    setIsEditing(!isEditing);
    setEditedDescription(editedDescription);
  }
  useEffect(() => {
    if (isEditing) {
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setRealodComments(false);
    async function getComments() {
      try {
        const response = await getCommentByPostId(postId)
        setComments(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getComments();
  }, [realoadComments]);

  async function update(e, id, description) {
    if (e.keyCode === 13) {
      try {
        setIsLoading(true)
        await updatePost(id, description)
        setIsLoading(false)
        setIsEditing(false)
      } catch (error) {
        alert(error)
      }
    } else if (e.keyCode === 27) {
      setIsEditing(false)
    }
  }
  function handleModal(id) {
    setModalIsOpen(!modalIsOpen);
    setDelPostId(id);
  }

  async function confirmed() {
    setIsLoading(true)
    try {
      await deletePost(delPostId);
      setIsLoading(false);
      setModalIsOpen(false);
      setReloadPage();
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Wrapper>
      <ContainerPost>
        <DivPost>
          <LeftSideContainer>
            <Like image={image} userId={loggedUserId} postId={postId} />
            <Comments
              comments={comments}
              setCommentBox={() => setCommentBox(!commentBox)}
              commentBox={commentBox}
            />
            <RePost postId={postId} setReloadPage={setReloadPage}/>
          </LeftSideContainer>
          <PostInfos>
            <h3 onClick={() => navigate(`/users/${id}`)}>{name}</h3>
            {id === parseInt(loggedUserId) ?
              <Icons>
                <IconContext.Provider value={{ color: "#FFFFFF", className: "edit", size: "15px" }}>
                  <FaPencilAlt onClick={editPost} name="pencil" />
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "#FFFFFF", className: "delete", size: "15px" }}>
                  <FaTrash onClick={() => handleModal(postId)} name="trash" />
                </IconContext.Provider>
              </Icons> : <></>}
            {isEditing ?
              <>
                <textarea
                  type="text"
                  ref={inputRef}
                  value={editedDescription}
                  placeholder="Awesome article about #javascript"
                  name="description"
                  onChange={(e) => setEditedDescription(e.target.value)}
                  onKeyDown={(e) => update(e, postId, editedDescription)}
                  disabled={isLoading}
                />
              </> :
              <p><ReactHashtag onHashtagClick={(value) => handleHashtag(value)}>{editedDescription}</ReactHashtag></p>
            }
            <UrlInfos href={link} target="blank">
              <div>
                <h4>{urlTitle}</h4>
                <p>{urlDescriptionSplice}</p>
                <span>{link}</span>
              </div>
              <div>
                <img src={urlImage} alt="url" />
              </div>
            </UrlInfos>
          </PostInfos>
        </DivPost>
      </ContainerPost>
      <CommentsBox
        comments={comments}
        userPostId={id}
        postId={postId}
        setRealodComments={() => setRealodComments(true)}
        commentBox={commentBox}
      />

      <ReactModal
        className="react-modal"
        isOpen={modalIsOpen}
        shouldCloseOnEsc={true}
        preventScroll={true}
        style={{
          overlay: {
            overflow: 'hidden',
            height: '100%'
          },
          content: {
            top: '50%',
            left: '50%',
            margin: 'auto',
            overflow: 'hidden',
            padding: '0',
            width: 'calc(59700px/1440%)',
            maxWidth: '597px',
            height: '262px',
            borderRadius: '50px',
            transform: 'translate(0, 90%)'
          }
        }}
        ariaHideApp={false}
      >
        {isLoading ?
          <Loading />
          : <Delete>
            <p>Are you sure you want to delete this post?</p>
            <button onClick={() => setModalIsOpen(false)} className="cancel">No, go back</button>
            <button onClick={confirmed} className="confirm">Yes, delete it</button>
          </Delete>
        }
      </ReactModal>
    </Wrapper>
  )
};


const Wrapper = styled.section`
  position: relative;
  z-index:0;
`
const Delete = styled.div`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #333333;
    width: calc(59700px/1440%);
    height: 262px;
    font-weight: 700;
    z-index:10;
    font-size: 18px;
    line-height: 21.6px;
    border-radius: 50px;
    p{
        width: 458px;
        height: 82px;
        color: #ffffff;
        text-align: center;
        font-size: 34px;
        line-height: 40.8px;
    }
    button{
      font-weight: 700;
      width: 120px;
      height: 37px;
      border: none;
      border-radius: 5px;
    }
    .cancel{
        background-color: #fff;
        color: #1877F2;
        margin-right: 27px;
    }
    .confirm{
        background-color: #1877F2;
        color: #fff;
    }
`

const ContainerPost = styled.article`
  width: 100%;
  height: 232px;
  margin-top: 16px;
  padding: 10px 15px 15px 15px;
  background-color: #171717;
  position:relative;
  z-index: 2;

  @media(min-width: 800px){
      border-radius: 16px;
      height: 276px;
    }
`

const DivPost = styled.div`
  display:flex;
  width: 100%;
  height: 100%;
`

const Icons = styled.div` 
  position: absolute;
  top: 5px;
  right: 0;
  color: white;

  .edit {
    margin-right: 10px;
    cursor:pointer;
  }

  .delete {
    cursor:pointer;
  }
`

const PostInfos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 503px;
  position: relative;
  z-index:2;

  h3 {
    width: fit-content;
  }

  h3 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
    margin-bottom: 7px;
    cursor: pointer;
  }

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #B7B7B7;
    margin-bottom: 7px;
    word-break: break-all;

    span{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    margin-bottom: 7px;
    cursor: pointer;
    }
    #text{
      max-width: 100%;
      overflow-x: hidden;
      word-break: break-all;
    }
  };

  @media(min-width: 800px){
    h3 {
      font-size: 19px;
      line-height: 23px;
    }

    p {
      font-size: 17px;
      line-height: 20px;
    }
  }
  textarea {
    width: 100%;
    height: 47px;
    resize: none;
    padding: 10px 11px 0 11px;
    margin-bottom: 5px;
    border-radius: 5px;
    border: none;
    background-color: #EFEFEF;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;

    &::placeholder {
      color: #949494;
    }

    @media(min-width: 800px){
      height: 66px;
      font-size: 15px;
      line-height: 18px;

      &::placeholder{
        font-size: 15px;
        line-height: 18px;
      }
    }
  }
`

const UrlInfos = styled.a`
  position: relative;
  display:flex;
  flex-direction: column;
  padding: 8px 0 8px 11px;
  justify-content: space-between;
  width: 100%;
  height: 116px;
  border: 1px solid #4D4D4D;
  border-radius: 11px;
  flex-wrap: wrap;
  overflow: hidden;
  color: inherit;
  text-decoration: none;

  @media(min-width: 800px){
    height: 155px;
  }

  div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-width: 178px; 
    overflow: hidden;

    @media(min-width: 800px){
      max-width: 320px; 
      justify-content: center;
    }

    h4 {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      color: #CECECE;
      margin-bottom: 5px;

      @media(min-width: 800px){
        font-size: 16px;
        line-height: 19px;
      }
    }

    p {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 9px;
      line-height: 11px;
      color: #9B9595;
      margin-bottom: 5px;

      @media(min-width: 800px){
        font-size: 11px;
        line-height: 13px;
        margin-bottom: 10px;
      }
    }

    span{
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      font-size: 9px;
      line-height: 11px;
      color: #CECECE;

      @media(min-width: 800px){
        font-size: 11px;
        line-height: 13px;
      }
    }
  };

  div:last-child{
    position: absolute;
    top: 0;
    right: 0;
    img {
      width: 95px;
      height: 115px;
      border-radius: 0px 12px 13px 0px;

      @media(min-width: 800px){
        width: 153.44px;
        height: 155px;
      }
    }
  }
`

const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;

  .comment {
    margin-top: 15px;
    margin-left: 12px;

    @media (max-width: 800px) {
      margin-left: 7px;
    }
  }
`