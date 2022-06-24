import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInterval from "use-interval";
import dayjs from "dayjs";
import InfiniteScroll from 'react-infinite-scroll-component';
import utc from "dayjs/plugin/utc"

import styled from "styled-components";
import { publishPost, getPostsByFollows, getNewPostsByFollows } from "../../services/api";
import Posts from "../../components/timelineReceptacle/Posts";
import Loading from "../../components/Loading";
import { GrUpdate } from "react-icons/gr"


import Header from "./../../components/timelineReceptacle/Header";
import HashtagBox from "../../components/timelineReceptacle/HashtagBox";

export default function Timeline() {
  dayjs.extend(utc);

  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const image = localStorage.getItem("image");

  const [formData, setFormData] = useState({ link: "", description: "" });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postLoadind, setPostLoading] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [isNewPosts, setIsNewPosts] = useState([])
  const [now, setNow] = useState(dayjs().utc().format("YYYY-MM-DD HH:mm:ss"))
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPostLoading(true);
    (async () => {
      try {
        const response = await getPostsByFollows(userId, 0);
        setPosts(response.data);
        setNow(dayjs().utc().format("YYYY-MM-DD HH:mm:ss"))
        setPostLoading(false);
      } catch (e) {
        console.log(e);
        alert("An error occured while trying to fetch the posts, please refresh the page")
      }

    })();

  }, [reloadPage, navigate]);

  useEffect(async () => {

    try {
      const response = await getPostsByFollows(userId, page);
      if (response.data.length === 0) setHasMore(false);
      setPosts(posts.concat(...response.data));
    } catch (error) {
      alert(error)
    }
  }, [page])

  useInterval(async () => {
    try {
      const response = await getNewPostsByFollows(now)
      setIsNewPosts(response.data)
    } catch (error) {
      alert(error)
    }

  }, 15000);


  async function handlePublishPost(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await publishPost({ ...formData });
      setIsLoading(false);
      setFormData({ link: "", description: "" });
      setReloadPage(!reloadPage);
    } catch (e) {
      alert("Houve um erro ao publicar seu link");
      setIsLoading(false);
    }
  };

  function updateTimeline() {
    setIsNewPosts([])
    setReloadPage(!reloadPage)
  }

  function handlePost() {
    if (postLoadind) return <></>
    if (posts) {
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
                urlDescription={urlDescription || "No Description Found"}
                postId={id}
                setReloadPage={() => setReloadPage(!reloadPage)} />
            )
          })
        ) : <h5>No posts found from your friends</h5>
    }
    return <h5>You don't follow anyone yet. Search for new friends!</h5>
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };
  return (
    <>
      <Header />
      <TimelineBox>
        <WrapperTimeline>
          <h2>timeline</h2>
          <ContainerPublishPost>
            <DivImage>
              <img src={image} alt="User" onClick={() => navigate(`/users/${userId}`)} />
            </DivImage >

            <DivPublishPost>
              <h3>What are you going to share today?</h3>
              <Form onSubmit={handlePublishPost}>
                <input
                  type="url"
                  value={formData.link}
                  placeholder="http://..."
                  name="link"
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />

                <textarea
                  type="text"
                  value={formData.description}
                  placeholder="Awesome article about #javascript"
                  name="description"
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button disabled={postLoadind} >
                  {isLoading ? "Publishing..." : "Publish"}
                </button>
              </Form>
            </DivPublishPost>
          </ContainerPublishPost>
          <UpdateTimeline>
            {isNewPosts.length > 0 ?
              <button onClick={updateTimeline}>{isNewPosts.length === 1 ? `1 new post, load more!` : `${isNewPosts.length} new posts, load more!`}
                <GrUpdate ClassName="update" />
              </button> :
              <>
              </>}
          </UpdateTimeline>
          <InfiniteScroll
            className="infinit-scroll"
            dataLength={posts.length}
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={<><Loading /><p style={{ textAlign: "center", color: "#6D6D6D" }}>Loading more posts...</p></>}
            endMessage={<h5>Nothing more to show</h5>}>
            {handlePost()}
          </InfiniteScroll>
        </WrapperTimeline >
        <HashtagBox reloadPage={reloadPage} />
      </TimelineBox>
    </>
  );
};

const UpdateTimeline = styled.div`
  display: flex;
  align-items: center;
  svg path{
    stroke: #fff;
  }
  button{
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 375px;
    height: 61px;
    border: none;
    border-radius: 16px;
    background-color: #1877F2;
    color: #ffffff;
    font-family: 'Lato';
    font-size: 16px;
    line-height: 29px;
    text-align: center;
    @media(min-width: 800px){
      width: 611px;
    }
  }
`

const TimelineBox = styled.main`
  position:absolute;
  display:flex;
  top: 160px;
  width: fit-content;
  max-width: 1042px;
  left: 0; 
  right: 0;
  margin: 0 auto;
`
const WrapperTimeline = styled.section`
  width: 100%;
  min-width:375px;
  margin-bottom: 30px;

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

  @media(min-width: 800px){
    width: 611px;
  }
`

const ContainerPublishPost = styled.article`
  width: 100%;
  height: 164px;
  display: flex;
  justify-content: flex-start;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media(min-width: 800px){
    border-radius: 16px;
    height: 209px;

    img {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 26.5px;
    }
  }
`

const DivImage = styled.div`
  
  img {
    cursor: pointer;
    display: none;
  }
  
  @media(min-width: 800px){
    margin: 16px 3px 0 18px;
    border-radius: 16px;
    width: fit-content;
    height: 100%;

    img {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 26.5px;
    }
  }
`

const DivPublishPost = styled.div`
  padding: 15px;
  height: 100%; 
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    color: #707070;
    margin-bottom: 10px; 
  }

  @media(min-width: 800px){
    h3 {
      text-align:left;
      font-size: 20px;
      line-height: 24px;
    }
  }
`

const Form = styled.form`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: flex-end;

  input {
    width: 100%;
    height: 30px;
    padding: 0 11px 0 11px;
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
      font-family: 'Lato';
      font-style: normal;
      font-weight: 300;
      font-size: 13px;
      line-height: 16px;
      color: #949494;
    }

    @media(min-width: 800px){
      font-size: 15px;
      line-height: 18px;

      &::placeholder{
        font-size: 15px;
        line-height: 18px;
      }
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

  button {
    width: 112px;
    height: 22px;
    background-color: #1877F2;
    border-radius: 5px;
    border:none;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;

    @media(min-width: 800px){
      height: 31px;
      font-size: 14px;
      line-height: 17px;
    }
  }
`

