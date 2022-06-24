import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';

import { getPosts, getFollow, postFollow, deleteFollow, getUserName } from "../../services/api";
import Header from "./../../components/timelineReceptacle/Header";
import Posts from "../../components/timelineReceptacle/Posts";
import HashtagBox from "../../components/timelineReceptacle/HashtagBox";
import Loading from "../../components/Loading";

export default function User() {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    const [postLoadind, setPostLoading] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [reloadPage, setReloadPage] = useState(false);
    const [follow, setFollow] = useState("");
    const [toggle, setToggle] = useState(true);
    const [visible, setVisible] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const { id } = useParams();

    const loggedUserId = localStorage.getItem("id");

    useEffect(() => {

        setPostLoading(true);
        setHasMore(true);

        async function getUserPostsById() {
            try {
                const users = await getPosts(id, 0);
                const userName = await getUserName(id);
                setUser(userName.data);
                setPosts(users.data);
                setPostLoading(false);
                setHasMore(false);

            }
            catch (error) {
                console.log(error);
            }
        }
        getUserPostsById();
    }, [reloadPage, id]);


    useEffect(() => {
        (async () => {
            try {
                const response = await getPosts(id, page);
                if (response.data.length === 0) setHasMore(false);
                setPosts(posts.concat(...response.data));
            } catch (error) {
                alert(error)
            }
        })();
    }, [page]);

    useEffect(() => {

        setPostLoading(true);

        async function getFollows() {
            setFollowLoading(true);
            try {
                const loggedUser = await getFollow(loggedUserId, id);
                setFollowLoading(false);
                if (loggedUser.data === "Myself") setVisible(false);
                else setVisible(true);

                if (!(loggedUser.data)) {
                    setToggle(false);
                    setFollow("Follow");
                }
                else {
                    setToggle(true);
                    setFollow("Unfollow");
                }
            }
            catch (error) {
                console.log(error);
                alert("Não foi possível executar a operação")
            }
        }
        getFollows();
    }, [id]);

    function toggleFollow() {
        setToggle(!toggle);
        if (toggle) {
            setFollow("Follow");
            handleDeleteFollow();
        }
        else {
            setFollow("Unfollow");
            handlePostFollow();
        }
    }

    async function handlePostFollow() {
        try {
            await postFollow({
                userId: loggedUserId,
                followId: id
            });
        }
        catch (e) {
            alert("Houve um erro ao seguir o usuário");
        }
    }

    async function handleDeleteFollow() {
        try {
            await deleteFollow(loggedUserId, id);
        }
        catch (e) {
            alert("Houve um erro ao parar de seguir o usuário");
        }
    }

    function handleUser() {
        if (postLoadind || user.length === 0) return <></>;
        return (
            <UserContainer>
                <div>
                    <UserImage src={user[0].image}></UserImage>
                    <UserName >{user[0].name}'s posts</UserName>
                </div>
            </UserContainer>
        )
    }

    function handlePost() {
        if (postLoadind) return <></>;
        return posts.length !== 0 ?
            (
                posts.map(({ id, userId, link, description, image, name, urlTitle, urlImage, urlDescription }) => {
                    return (
                        <Posts
                            key={id / Math.random()}
                            id={userId}
                            link={link}
                            description={description}
                            name={name}
                            image={image}
                            urlTitle={urlTitle}
                            urlImage={urlImage}
                            urlDescription={urlDescription}
                            postId={id}
                            setReloadPage={() => { setReloadPage(!reloadPage) }}
                        />
                    )
                })
            ) : <h5>There are no posts yet</h5>
    }

    return (
        <>
            <Header />
            <TimelineBox>
                {handleUser()}
                <SubContainer>
                    <WrapperTimeline>
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
                    <Div>
                        {followLoading ? <></> :
                            <Follow selected={toggle} loading={postLoadind} visible={visible}
                                onClick={() => toggleFollow()}>{follow}</Follow>}
                        <HashtagBox reloadPage={reloadPage} />
                    </Div>
                </SubContainer>
            </TimelineBox>
        </>
    )
}

function setBackground(selected) {
    if (selected) return "#FFFFFF";
    else return "#1877F2";
}

function setText(selected) {
    if (selected) return "#1877F2";
    else return "#FFFFFF";
}

function setButton(loading) {
    if (loading) return "none";
    else return "auto";
}

function checkVisible(visible) {
    if (visible) return "";
    else return "none";
}

const TimelineBox = styled.main`
  width: fit-content;
  max-width: 1042px;
  height: fit-content;
  
  margin: 0 auto;

  position:absolute;
  top: 160px;
  left: 0; 
  right: 0;
`
const UserContainer = styled.div`
      display: flex;
      align-items: center;

      padding-left: 15px;

        div {
            display:flex;
            align-items: center;
            gap: 18px;
        }
`
const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26px;
`
const UserName = styled.p`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
`
const SubContainer = styled.div`
    display: flex;
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
const Div = styled.div`
    margin-top: -69px; 
    position: relative;
`
const Follow = styled.button`
    font-family: 'Lato';
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: ${(props) => setText(props.selected)};
    pointer-events: ${(props) => setButton(props.loading)};

    width: 112px;
    height: 31px;

    border-radius: 5px;
    background-color: ${(props) => setBackground(props.selected)};

    display: ${(props) => checkVisible(props.visible)};
    cursor: pointer;

    position: absolute;
    top: 16px;
    right: -0;  
    z-index: 16; 

    @media (max-width: 800px) {
        top: 23px;
        right: -100px;
        z-index: 0;
    }
`