import { useState, useEffect } from "react";

import styled from "styled-components";
import { publishPost } from "../../services/api";

export default function Timeline() {

  const [formData, setFormData] = useState({ link: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Recarregou");
  }, [isLoading])

  async function handlePublishPost(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await publishPost({ ...formData });
      setIsLoading(false);
      setFormData({ link: "", description: "" });
    } catch (e) {
      alert("Houve um erro ao publicar seu link");
      setIsLoading(false);
    }
  };

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  console.log(formData)
  return (
    <Wrapper>
      <h2>timeline</h2>
      <ContainerPublishPost>
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
            <button disabled={isLoading} >
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </Form>
        </DivPublishPost>
        <ContainerPost>
          <DivPost>
            <ImageLikes>
              <img
                src="https://pbs.twimg.com/media/EzsyfzJXEAAouNb.jpg"
                alt="foto" />
            </ImageLikes>

            <PostInfos>
              <h3>Juvenal Juvêncio</h3>
              <p>
                Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material
              </p>

            </PostInfos>
          </DivPost>
        </ContainerPost>
      </ContainerPublishPost>
    </Wrapper>
  )
};

const Wrapper = styled.section`
  margin-top: 72px;

  h2 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 49px;
    color: #FFFFFF;
    margin: 19px 0 19px 17px;
  }
`

const ContainerPublishPost = styled.article`
  width: 100%;
  height: 164px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const DivPublishPost = styled.div`
  padding: 15px;
  height: 100%; 
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    width: 345px;
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
  }

  textarea {
    width: 345px;
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
  }
`

const ContainerPost = styled.article`
  width: 100%;
  height: 232px;
  margin-top: 16px;
  padding: 10px 15px 15x 15px;
  background-color: #171717;
`

const DivPost = styled.div`
  display:flex;
  align-items:center;
  width: 100%;
  height: 100%;
`

const ImageLikes = styled.div`
  img {
    width: 40px;
    height: 40px;
    top: 348px;
    border-radius: 26.5px;
  }
`
const PostInfos = styled.div`
`
