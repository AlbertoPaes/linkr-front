import { useState } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import ReactTooltip from 'react-tooltip';

import { getLikes,addOrRemoveLike } from "../../services/api";

const Like = ({image,userId,postId}) => {
  const [like,setLike] = useState(true);
  const [usersWhoLikes,setUsersWhoLikes] = useState(0);

  const requestLikes = async () => {
    try {
      const response = await getLikes(postId);
      console.log(response.data);
      setUsersWhoLikes(response.data);

    } catch (err) {
      console.log(err.response);
      alert("There was an error requesting the search for likes!");
    }
  }

  const statusLike = async (likeStatus,postId) => {
    console.log("postId:", postId);
    likeStatus ? setLike(false) : setLike(true);
    await addOrRemoveLike(postId);
    requestLikes();
    ReactTooltip.rebuild();
  }

  const ToolTip = ({postId,usersWhoLikes,like}) => {
    return (
      <ReactTooltip 
      id={`postLikes-${postId}`} 
      place="bottom" 
      effect="solid" 
      type="info"
      delay-hide={1000}
      backgroundColor={"rgba(255, 255, 255, 0.9)"}	
      textColor={"#505050"}
      >
      {
         (usersWhoLikes.length === 1 && like) ? <span>You</span>
        :(usersWhoLikes.length === 1 && !like) ? <span>{usersWhoLikes[0]}</span> 
        :(usersWhoLikes.length === 2 && like) ? <span>`You and ${usersWhoLikes[0]}`</span>
        :(usersWhoLikes.length === 2 && !like) ? <span>`${usersWhoLikes[0]} and ${usersWhoLikes[1]}`</span>
        :(usersWhoLikes.length > 2 && like) ? <span>`You, ${usersWhoLikes[0]} and other ${usersWhoLikes.length - 2} people`</span>
        :(usersWhoLikes.length > 2 && !like) ? <span>`${usersWhoLikes[0]}, ${usersWhoLikes[1]} and other ${usersWhoLikes.length - 2} people`</span>
        : ''
      }
      </ReactTooltip>
    );
  }

  return (
    <ImageLikes displayLike={like}>
      <img
        src={image}
        alt="foto" />
      <IconContext.Provider value={{ color: "#FFFFFF", className: "heart-icon", size: "25px" }}>
        <FiHeart onClick={() => statusLike(like,postId)} />
      </IconContext.Provider>
      { usersWhoLikes.length > 0 &&
        <p data-tip='tooltip' data-for={`postLikes-${postId}`}>
          {`${usersWhoLikes.length} {${usersWhoLikes.length === 1 ? "like" : "likes"}}`}
        </p>
      }
      {usersWhoLikes.length > 0 && <ToolTip postId={postId} usersWhoLikes={usersWhoLikes} like={like} />}
    </ImageLikes>
  );
}

const ImageLikes = styled.div(({ displayLike }) => `
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

  .heart-icon {
    margin-top: 20px;
    fill: ${displayLike ? "#171717" : "#AC0000"};
    stroke: ${displayLike ? "#FFFFFF" : "#AC0000"};
    cursor: pointer;
  }

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 12px;
  }
`);

export default Like;