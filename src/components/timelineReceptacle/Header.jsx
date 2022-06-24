import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AuthContext } from '../../contexts/auth';
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import { DebounceInput } from 'react-debounce-input';

import { getSearch, getFollowersById } from "../../services/api";

function Header() {
    const { logout } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [userMenu, setUserMenu] = useState(true);
    const [followingUsers, SetFollowingUsers] = useState(new Map());

    const navigate = useNavigate();

    const userPicture = localStorage.getItem("image");
    const loggedUserId = localStorage.getItem("id");

    const handleUserMenu = (userMenuStatus) => {
        userMenuStatus ? setUserMenu(false) : setUserMenu(true);
    }

    const handleLogout = () => {
        if (window.confirm("Do you want to leave the current session?")) {
            setUserMenu(true);
            logout();
            navigate("/");
            window.location.reload(true);
        }
        return;
    }

    const handleSearch = async (userInitials) => {

        followingUsers.clear();

        try {
            if (userInitials.length > 0) {
                const search = await getSearch(userInitials);

                let searchFollow = await getFollowersById(userInitials, loggedUserId);

                if (searchFollow.data.length > 0)
                    searchFollow.data.forEach(search => followingUsers.set(search));
                setUsers(search.data);
            }
            else setUsers([])
        }
        catch (error) {
            alert("Error in server connection");
        }
    }

    function goToUsersPage(id) {
        navigate(`/users/${id}`);
        setUsers([]);
    }

    function handleDebounceInput() {
        return (
            <ContainerInput>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    className="debounce"
                    placeholder='Search for people and friends' required
                    onChange={(e) => handleSearch(e.target.value)} />
                <IconContext.Provider value={{ color: "#C6C6C6", className: "search-icon", size: "25px" }}>
                    <BsSearch />
                </IconContext.Provider>
            </ContainerInput>
        )
    }

    function handleUsersMobile() {
        return (
            <UsersMobile>
                {users.map(user => {
                    const { id, image, name } = user;
                    const checkId = followingUsers.has(user.id);
                    return handleFollowingUsers(id, image, name, checkId)
                })}
                {users.map(user => {
                    const { id, image, name } = user;
                    const checkId = followingUsers.has(user.id);
                    return handleNotFollowingUsers(id, image, name, checkId)
                })}
            </UsersMobile>
        )
    }

    function handleUsersDesktop() {
        return (
            <UsersDesktop>
                {users.map(user => {
                    const { id, image, name } = user;
                    const checkId = followingUsers.has(user.id);
                    return handleFollowingUsers(id, image, name, checkId)
                })}
                {users.map(user => {
                    const { id, image, name } = user;
                    const checkId = followingUsers.has(user.id);
                    return handleNotFollowingUsers(id, image, name, checkId)
                })}
            </UsersDesktop>
        )
    }

    function handleFollowingUsers(id, image, name, checkId) {
        return checkId ?
            (
                <User key={id}>
                    <UserImage src={image}></UserImage>
                    <h1 onClick={() => goToUsersPage(id)}>{name}</h1>
                    <Following> • following </Following>
                </User>
            ) : <></>;
    }

    function handleNotFollowingUsers(id, image, name, checkId) {
        return !checkId ?
            (
                <User key={id}>
                    <UserImage src={image}></UserImage>
                    <h1 onClick={() => goToUsersPage(id)}>{name}</h1>
                </User>
            ) : <></>;
    }

    return (
        <>
            <MobileContainer>
                {handleDebounceInput()};
                {users.length > 0 ?
                    handleUsersMobile() :
                    <></>
                }
            </MobileContainer>
            <Head>
                <Logo onClick={() => navigate("/timeline")}>linkr</Logo>
                <ContainerHead>
                    {handleDebounceInput()}
                    {users.length > 0 ?
                        handleUsersDesktop() :
                        <></>
                    }
                </ContainerHead>
                <Logout>
                    <AiOutlineWrap onClick={() => handleUserMenu(userMenu)}>
                        {userMenu ?
                            <IconContext.Provider value={{ color: "#FFFFFF", className: "global-class-name", size: "25px" }}>
                                <AiOutlineDown />
                            </IconContext.Provider>
                            : <IconContext.Provider value={{ color: "#FFFFFF", className: "global-class-name", size: "25px" }}>
                                <AiOutlineUp />
                            </IconContext.Provider>
                        }
                    </AiOutlineWrap>
                    <Image src={userPicture} onClick={() => handleUserMenu(userMenu)}></Image>
                    {
                        (userMenu === false) ?
                            <Overlay onClick={() => setUserMenu(true)}>
                                <UserMenu displayMenu={userMenu}> <span onClick={handleLogout}>Logout</span> </UserMenu>
                            </Overlay>
                            : null
                    }
                </Logout>
            </Head>
        </>
    )
}

const MobileContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 72px;
    margin-top: 72px;

    position: relative;
    z-index: 10;

    @media (min-width: 800px) {
        display: none;
    }
`
const ContainerInput = styled.div`
    width: 95%;
    max-width: 563px;
    height: 45px;

    display: flex;
    align-items:center;

    background-color: #FFFFFF;
    border-radius: 8px;

    padding-left: 10px;
    padding-right: 15px;
    margin: 10px;

    position: relative;

    .debounce {
        width: 95%;
        max-width: 563px;
        height: 45px;

        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #151515;

        background-color: #FFFFFF;
        border: none;
        border-radius: 8px;

        &:focus {
            outline: none;
        }

        &::placeholder {
            color: #9F9F9F;
        }
    }
`
const UsersMobile = styled.div`
    width: 95%;
    max-width: 563px;
    max-height: 125px;

    background-color: #E7E7E7;
    border-radius: 8px;

    padding-top: 14px;
    padding-bottom: 23px;
    margin-top:-40px;

    overflow-y: scroll; 

    ::-webkit-scrollbar {
            width: 0px;
        }   
`
const User = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    padding-top: 14px;
    padding-left: 17px;

    h1 {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        line-height: 23px;
        color: #515151;
        cursor: pointer;
    }
`
const UserImage = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 26px;
`
const Following = styled.p`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    line-height: 23px;
    color: #C5C5C5;

    margin-left: -7px;
`
const Head = styled.div`
    width: 100%;
    height: 72px;

    display: flex;
    justify-content: space-between;

    background-color: #151515;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
`
const Logo = styled.p`
    font-family: 'Passion One';
    font-weight: 700;
    font-size: 45px;
    line-height: 50px;
    letter-spacing: 0.05em;
    color: #FFFFFF;

    padding-top: 13px;
    padding-left: 17px;
    cursor: pointer;
`
const ContainerHead = styled.div`
    display: none;

    @media (min-width: 800px) {
        min-width: 563px;
        height: 72px;
        display: block;

        padding-top:3px;
        margin: 0 auto;

        position: relative;
    }
`
const UsersDesktop = styled.div`
    display: none;

    @media (min-width: 800px) {
        width: 95%;
        max-height: 175px;
        max-width: 563px;
        display: block;

        border-radius: 8px;
        background-color: #E7E7E7;

        padding-top: 14px;
        padding-bottom: 23px;
        margin-top: -40px;
        margin-left: 10px;

        overflow-y: scroll; 
        ::-webkit-scrollbar {
        width: 0px;
        }      
    }
`
const Logout = styled.div`
    margin: auto 0;
`
const AiOutlineWrap = styled.div`
    position: absolute;
    top: 25px;
    right: 67px;
    cursor: pointer;
    z-index: 11;
`
const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
  
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);

    padding: 19px;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
`

const UserMenu = styled.div(({ displayMenu }) => `
    height: 47px;
    width: 150px;

    visibility: ${displayMenu ? "hidden" : "visible"};
    z-index: 11;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #171717;
    border-radius: 0px 0px 20px 20px;

    position: fixed;
    top: 72px;
    right: -20px;
    padding: 0px 20px 10px 0px;

    span {
        font-family: 'Lato';
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        cursor: pointer;
    }
`)

const Image = styled.img`
    width: 41px;
    height: 41px;

    margin-right: 18px;
    border-radius: 26px;
    cursor: pointer;
`
export default Header;