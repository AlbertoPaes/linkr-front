import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';

import Posts from "../../components/timelineReceptacle/Posts";
import Header from "./../../components/timelineReceptacle/Header";
import Loading from "../../components/Loading";
import { getPostsByHashtag } from "../../services/api";


export default function Hashtag() {
  const [posts, setPosts] = useState([]);
  const [reloadHashtag, setReloadHashtag] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { hashtag } = useParams();

  useEffect(() => {
    setReloadHashtag(true);

    (async () => {
      try {
        const response = await getPostsByHashtag(hashtag, 0);
        setPosts(response.data);
        setReloadHashtag(false);
      } catch (e) {
        console.log(e);
        alert("An error occured while trying to fetch the posts, please refresh the page")
      }
    })();

  }, [reloadPage, hashtag]);

  useEffect(() => {

    (async () => {
      try {
        const response = await getPostsByHashtag(hashtag, page);
        if (response.data.length === 0) setHasMore(false);
        setPosts(posts.concat(...response.data));
      } catch (error) {
        alert(error)
      }
    }) ();
  }, [page])

  function handleHashtag() {
    if (reloadHashtag) return <></>
    return posts.length !== 0 ?
      (
        posts.map(({ id, userId, link, description, image, name, urlTitle, urlImage, urlDescription }) => {
          return (
            <Posts
              key={id}
              id={userId}
              link={link}
              description={description}
              name={name}
              image={image}
              urlTitle={urlTitle || "No Title Found"}
              urlImage={urlImage}
              postId={id}
              urlDescription={urlDescription || "No Description Found"}
              setReloadPage={() => { setReloadPage(!reloadPage) }}
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
        <InfiniteScroll
          className="infinit-scroll"
          dataLength={posts.length}
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          loader={<><Loading /><p style={{ textAlign: "center", color: "#6D6D6D" }}>Loading more posts...</p></>}
          endMessage={<h5>Nothing more to show</h5>}>
          {handleHashtag()}
        </InfiniteScroll>
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

  .infinit-scroll::-webkit-scrollbar {
    display: none;
  }

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