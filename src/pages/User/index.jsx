import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../../services/api";

import styled from "styled-components";

import Header from "./../Header";
import Posts from "../../components/timelineReceptacle/Posts";
import Loading from "../../components/Loading";

export default function User() {

    const [posts, setPosts] = useState([]);
    const [postLoadind, setPostLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        async function getUserPostsById() {

            try {
                const users = await getPosts(id);
                console.log(users.data);
                setPosts(users.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getUserPostsById();
    }, [])

    function handleUser() {
        return posts.length !== 0 ?
            (
                <UserContainer>
                    <UserImage src={posts[0].image}></UserImage>
                    <h2>{posts[0].name}'s posts</h2>
                </UserContainer>
            ) : <></>;
    }

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
            ) : <Loading />
    }

    return (
        <>
            <Header />
            <Wrapper>
                {handleUser()}
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
const UserContainer = styled.div`
      display: flex;
      align-items: center;
      gap: 18px;
      margin-left: 15px;
`

const UserImage = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 26px;
`
