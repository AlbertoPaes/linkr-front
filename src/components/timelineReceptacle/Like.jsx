import { useState, useEffect } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import ReactTooltip from 'react-tooltip';

import { getLikes, addOrRemoveLike } from "../../services/api";

const Like = ({ image, userId, postId }) => {
  const [like, setLike] = useState();
  const [usersWhoLikes, setUsersWhoLikes] = useState([]);

  useEffect(() => {
    (async () => {
      await getLikes(postId)
    })();
    requestLikes();
  }, [postId]);

  const requestLikes = async () => {
    try {
      const { data: users } = await getLikes(postId);
      const statusLike = hasUser(users);
      setUsersWhoLikes(users.map(({ name }) => name));
      setLike(statusLike);
    } catch (err) {
      console.log(err.response);
      alert("There was an error requesting the search for likes!");
    }
  }

  const toogleLike = async (userId, postId) => {
    await addOrRemoveLike(userId, postId);
    requestLikes();
    ReactTooltip.rebuild();
  }

  const hasUser = (users) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === parseInt(userId)) {
        return true;
      }
    }
    return false;
  }

  return (
    <ImageLikes displayLike={like}>
      <img
        src={image}
        alt="foto" />
      <IconContext.Provider value={{ color: "#FFFFFF", className: "heart-icon", size: "25px" }}>
        <FiHeart onClick={() => toogleLike(userId, postId)} />
      </IconContext.Provider>
      <p data-tip='tooltip' data-for={`postLikes-${postId}`}>
        {`${usersWhoLikes.length} ${usersWhoLikes.length === 1 ? "like" : "likes"}`}
      </p>
      {usersWhoLikes.length > 0 && <ToolTip postId={postId} usersWhoLikes={usersWhoLikes} like={like} />}
    </ImageLikes>
  );
}

const ToolTip = ({ postId, usersWhoLikes, like }) => {
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
          : (usersWhoLikes.length === 1 && !like) ? <span>{usersWhoLikes[0]}</span>
            : (usersWhoLikes.length === 2 && like) ? <span>You and {usersWhoLikes[0]}</span>
              : (usersWhoLikes.length === 2 && !like) ? <span>{usersWhoLikes[0]} and {usersWhoLikes[1]}</span>
                : (usersWhoLikes.length > 2 && like) ? <span>You, {usersWhoLikes[0]} and other {usersWhoLikes.length - 2} people</span>
                  : (usersWhoLikes.length > 2 && !like) ? <span>{usersWhoLikes[0]}, {usersWhoLikes[1]} and other {usersWhoLikes.length - 2} people</span>
                    : ''
      }
    </ReactTooltip>
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
    fill: ${displayLike ? "#AC0000" : "#171717"};
    stroke: ${displayLike ? "#AC0000" : "#FFFFFF"};
    cursor: pointer;
  }

  p {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 12px;
  }

  span {
    font-family: 'Lato';
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;
    text-align: center;

    color: #505050;
  }
`);

export default Like;