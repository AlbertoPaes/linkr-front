import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../../services/api";

import styled from "styled-components";

import Header from "./../Header";
import Posts from "../../components/timelineReceptacle/Posts";
import HashtagBox from "../../components/timelineReceptacle/HashtagBox";
import Loading from "../../components/Loading";

export default function User() {

    const [posts, setPosts] = useState([]);
    const [postLoadind, setPostLoading] = useState(false);
    const [reloadPage, setRealoadPage] = useState(false);

    const { id } = useParams();

    useEffect(() => {

        setPostLoading(true);

        async function getUserPostsById() {

            try {
                const users = await getPosts(id);
                setPosts(users.data);
                setPostLoading(false);
                setRealoadPage(!reloadPage);
            }
            catch (error) {
                console.log(error);
            }
        }
        getUserPostsById();
    }, [id])

    function handleUser() {
        if (postLoadind) return <></>
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
            ) : <h5>There are no posts yet</h5>
    }

    return (
        <>
            <Header />
            <TimelineBox>
                <WrapperTimeline>
                    {handleUser()}
                    {handlePost()}
                </WrapperTimeline >
                <HashtagBox reloadPage={reloadPage} />
            </TimelineBox>        
        </>
    )
}
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
