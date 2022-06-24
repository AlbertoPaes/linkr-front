import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import { FiRepeat } from "react-icons/fi";
import ReactModal from "react-modal";
import Loading from '../../Loading';
import { getRePosts, makeRePost } from '../../../services/api';


const RePost = ({ postId, setReloadPage }) => {
  const [rePostQuantity, setRePostQuantity] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await getRePosts(postId)
    })();
    requestRePost()
  }, [postId]);

  const requestRePost = async () => {
    try {
      const { data: quantity } = await getRePosts(postId);
      setRePostQuantity(quantity);
    } catch (err) {
      console.log(err.response);
      alert("There was an error requesting the search for likes!");
    }
  }

  async function confirmed(makeRePost) {
    setIsLoading(true);
    try {
      await makeRePost(postId);
      setIsLoading(false);
      setModalIsOpen(false);
      setReloadPage();
    } catch (error) {
      alert(error)
    }
  }

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <ImageRePost>
      <IconContext.Provider value={{ color: "#FFFFFF", className: "firepeat-icon", size: "25px" }}>
        <FiRepeat onClick={handleModal} />
        <p>{`${rePostQuantity} ${rePostQuantity === 1 ? 're-post' : 're-posts'}`}</p>
      </IconContext.Provider>
      <ReactModal
        className="react-modal"
        isOpen={modalIsOpen}
        shouldCloseOnEsc={true}
        preventScroll={true}
        style={{
          overlay: {
            overflowY: 'hidden',
            height: '100%'
          },
          content: {
            top: '50%',
            left: '50%',
            margin: 'auto',
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
          : <RePostModal>
            <p>Do you want to re-post this link?</p>
            <button onClick={() => setModalIsOpen(false)} className="cancel">No, cancel</button>
            <button onClick={() => confirmed(makeRePost)} className="confirm">Yes, share!</button>
          </RePostModal>
        }
      </ReactModal>
    </ImageRePost>
  );

}

const ImageRePost = styled.div`
  margin-right: 18px;
  display:flex;
  flex-direction:column;
  align-items:center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 26.5px;

    @media(min-width: 800px){
      width: 50px;
      height: 50px;
    }
  }

  .firepeat-icon {
    margin-top: 20px;
    cursor: pointer;
  }

  p {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;

    color: #FFFFFF;

    margin-top: 5px;

    @media (max-width: 800px) {
      font-size: 9px;
    }
  }

  span {
    font-family: 'Lato';
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;
    text-align: center;

    color: #505050;
  }
`;


const RePostModal = styled.div`
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

        cursor: pointer;
    }
    .confirm{
        background-color: #1877F2;
        color: #fff;

        cursor: pointer;
    }
    .firepeat-icon{
      cursor: pointer;
    }
`

export default RePost;
