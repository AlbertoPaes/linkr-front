import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Posts from "../../components/timelineReceptacle/Posts";
import Header from "../Header";
import Loading from "../../components/Loading";
import { getPostsByHashtag } from "../../services/api";


export default function Hashtag() {
  const [posts, setPosts] = useState([]);
  const [postLoadind, setPostLoading] = useState(false);
  console.log(posts);

  const { hashtag } = useParams();

  useEffect(() => {
    setPostLoading(true);

    (async () => {
      console.log("timeline")
      const response = await getPostsByHashtag(hashtag);
      setPosts(response.data);
      setPostLoading(false);
    })();

  }, [hashtag])

  function handlePost() {
    if (postLoadind) return <Loading />
    return posts.length !== 0 ?
      (
        posts.map(({ id, link, description, image, name, urlTitle, urlImage, urlDescription }) => {
          return (
            <Posts
              key={id}
              link={link}
              description={description}
              name={name}
              image={image}
              urlTitle={urlTitle}
              urlImage={urlImage}
              urlDescription={urlDescription}
            />
          )
        })
      ) : <h5>There are no posts yet</h5>
  }

  return (
    <>
      <Header />
      <Wrapper>
        <h2>{`# ${hashtag}`}</h2>
        {handlePost()}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  position:absolute;
  top: 146px;
  left: 0; 
  right: 0;
  margin: 0 auto;
  max-width: 611px;

  h2 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 49px;
    color: #FFFFFF;
    margin: 19px 0 19px 17px;

    @media(min-width: 800px){
      margin-left:0;
    }
  }

  h5 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 64px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 20px;
  }
  `