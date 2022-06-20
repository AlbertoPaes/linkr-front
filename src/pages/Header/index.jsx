import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AuthContext } from '../../contexts/auth';
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import styled from "styled-components";
import { DebounceInput } from 'react-debounce-input';

import { getSearch } from "../../services/api";

function Header() {
    const { logout } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [userMenu, setUserMenu] = useState(true);

    const navigate = useNavigate();

    const userPicture = localStorage.getItem("image");

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

    const handleSearch = async (value) => {
        try {
            if (value.length > 0) {
                const search = await getSearch(value);
                console.log("search: ", search.data);
                setUsers(search.data)
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

    return (
        <>
            <Container>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    className="debounce"
                    placeholder='Search for people and friends' required
                    onChange={(e) => handleSearch(e.target.value)} />

                {users.length > 0 ?
                    <Users>
                        {users.map(user => {
                            return (
                                <User key={user.id}>
                                    <UserImage src={user.image}></UserImage>
                                    <p onClick={() => goToUsersPage(user.id)}>{user.name}</p>
                                </User>
                            )
                        })}
                    </Users> :
                    <></>
                }
            </Container>
            <Head>
                <Logo onClick={() => navigate("/timeline")}>linkr</Logo>
                <ContainerHead>
                    <DebounceInput
                        minLength={3}
                        debounceTimeout={300}
                        className="debounce"
                        placeholder='Search for people' required
                        onChange={(e) => handleSearch(e.target.value)} />


                    {users.length > 0 ?
                        <UsersHead>
                            {users.map(user => {
                                return (
                                    <User key={user.id}>
                                        <UserImage src={user.image}></UserImage>
                                        <p onClick={() => goToUsersPage(user.id)}>{user.name}</p>
                                    </User>
                                )
                            })}
                        </UsersHead> :
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

const Logout = styled.div`
    margin: auto 0;
`
const ContainerHead = styled.div`

    display: none;

    .debounce {
         width: 95%;
        max-width: 563px;
        height: 45px;

        background-color: #FFFFFF;
        color: #151515;

        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;

        padding-left: 10px;
        padding-right: 15px;
        margin: 10px;

        border: none;
        border-radius: 8px;

        position: relative;
        z-index: 10;

    &::placeholder {
      color: #9F9F9F;
        }
    }
   

    @media (min-width: 800px) {
        min-width: 563px;

        margin: 0 auto;

        display: block;
    }
`

const UsersHead = styled.div`

    display: none;

    @media (min-width: 800px) {
        display: block;
        width: 95%;
    max-width: 563px;

    border-radius: 8px;

    background-color: #E7E7E7;

    position: relative;
    z-index: 5;

    padding-top: 14px;
    padding-bottom: 23px;
    margin-top:-25px;
    margin-left: 10px;
    }
`

const UserImage = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 26px;
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
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 12;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 19px;
`;

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
`);

const Image = styled.img`
    width: 41px;
    height: 41px;
    margin-right: 18px;
    border-radius: 26px;
    cursor: pointer;
`

const User = styled.div`

    display: flex;
    align-items: center;
    gap: 12px;

    padding-top: 14px;
    padding-left: 17px;

    p {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        line-height: 23px;
        color: #515151;
    }

`

const Users = styled.div`
    width: 95%;
    max-width: 563px;

    border-radius: 8px;

    background-color: #E7E7E7;

    padding-top: 14px;
    padding-bottom: 23px;
    margin-top:-25px;
    margin-left: 10px;

`

const Head = styled.div`
    width: 100%;
    height: 72px;

    background-color: #151515;

    display: flex;
    justify-content: space-between;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
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

const Container = styled.div`
    width: 100%;
    display: flex;

    margin-top: 72px;
    margin-top: 72px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
    z-index: 10;

    .debounce {
         width: 95%;
        max-width: 563px;
        height: 45px;

        background-color: #FFFFFF;
        color: #151515;

        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;

        padding-left: 10px;
        padding-right: 15px;
        margin: 10px;

        border: none;
        border-radius: 8px;

        position: relative;
        z-index: 10;

    &::placeholder {
      color: #9F9F9F;
        }

        @media (min-width: 800px) {
        display: none;
        }
    }

    @media (min-width: 800px) {
        display: none;
    }
`;

const Input = styled.input`
    width: 95%;
    max-width: 563px;
    height: 45px;

    background-color: #FFFFFF;
    color: #151515;

    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;

    padding-left: 10px;
    padding-right: 15px;
    margin: 10px;

    border: none;
    border-radius: 8px;

    position: relative;
    z-index: 10;

    &::placeholder {
      color: #9F9F9F;
    }
    /* &::disabled {
      background-color: #F2F2F2;
      color: #AFAFAF;
    } */

`

export default Header;