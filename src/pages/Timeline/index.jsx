import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { publishPost, getAllPosts } from "../../services/api";
import Posts from "../../components/timelineReceptacle/Posts";
import Loading from "../../components/Loading";

import Header from "./../Header"
import HashtagBox from "../../components/timelineReceptacle/HashtagBox";

export default function Timeline() {
  const navigate = useNavigate();
  const token = localStorage.getItem("user");
  const image = localStorage.getItem("image");

  const [formData, setFormData] = useState({ link: "", description: "" });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postLoadind, setPostLoading] = useState(false);
  const [reloadPage, setRealoadPage] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    setPostLoading(true);

    (async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
        setPostLoading(false);
      } catch (e) {
        console.log(e);
        alert("An error occured while trying to fetch the posts, please refresh the page")
      }

    })();

  }, [reloadPage, token, navigate]);

  async function handlePublishPost(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await publishPost({ ...formData });
      setIsLoading(false);
      setFormData({ link: "", description: "" });
      setRealoadPage(!reloadPage);
    } catch (e) {
      alert("Houve um erro ao publicar seu link");
      setIsLoading(false);
    }
  };

  function handlePost() {
    if (postLoadind) return <Loading />
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
            />
          )
        })
      ) : <h5>There are no posts yet</h5>
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
              <img src={image} alt="User" />
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
          {handlePost()}
        </WrapperTimeline >
        <HashtagBox reloadPage={reloadPage} />
      </TimelineBox>
    </>
  );
};

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

