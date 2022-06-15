import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Header(req, res) {

    const { id } = useParams();

    const URL = `http://localhost:4000/users/${id}`

    const [search, setSearch] = useState("");

    // FAZER A REQUISIÇÃO NO BACKEND E SUBSTITUIR POR ESSE ARRAY;
    // Na requisição, fazer usando o estado search;
    const image = "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTJZdgr78rDXpqi86iP1t3PCFP751DDnMQyyD8HrMGg3n1DfEQjwi_airYznGgTe_swiOykmpyniB2OX6fF7LroFIKG7jhduXv9s6ySD9zI&usqp=CAE"

    const usuarios = [
        { name: "Usuário1",image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTJZdgr78rDXpqi86iP1t3PCFP751DDnMQyyD8HrMGg3n1DfEQjwi_airYznGgTe_swiOykmpyniB2OX6fF7LroFIKG7jhduXv9s6ySD9zI&usqp=CAE"},
        { name: "Usuário2", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTJZdgr78rDXpqi86iP1t3PCFP751DDnMQyyD8HrMGg3n1DfEQjwi_airYznGgTe_swiOykmpyniB2OX6fF7LroFIKG7jhduXv9s6ySD9zI&usqp=CAE"},
        { name: "Usuário3", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTJZdgr78rDXpqi86iP1t3PCFP751DDnMQyyD8HrMGg3n1DfEQjwi_airYznGgTe_swiOykmpyniB2OX6fF7LroFIKG7jhduXv9s6ySD9zI&usqp=CAE"}
    ]

    useEffect(() => {
        async function getUserById() {

            try {
                const users = await axios.get(URL);
                console.log(users.data[0]);
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(500); // server error
            }
        }
        getUserById();
    }, [])

    return (
        <>
            <Head>
                <Logo>linkr</Logo>
                <Icon>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </Icon>
                <Image src={image}></Image>
            </Head>
            <Container>
                <Input type="text" placeholder='Search for people and friends' required
                    onChange={(e) => setSearch(e.target.value)} value={search}>
                </Input>
                {usuarios.length > 0 ?
                    <Users>
                        {usuarios.map(usuario => {
                            return (
                                <User>
                                    <UserImage src={usuario.image}></UserImage>
                                    {usuario.name}
                                </User>
                            )
                        })}
                    </Users> :
                    <></>
                }
            </Container>
        </>
    )
}

const UserImage = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 26px;
`

const Icon = styled.button`
    font-size: 25px;
    border: none;
    color: white;
    background-color: #151515;
    position: absolute;
    top: 27px;
    right: 65px;

`
const Image = styled.img`
    width: 41px;
    height: 41px;
    margin-right: 18px;
    border-radius: 26px;

    position: absolute;
    top: 15px;
    right: 1px;
`

const User = styled.div`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    line-height: 23px;    
    color: #515151;

    display: flex;
    align-items: center;
    gap: 12px;

    padding-top: 14px;
    padding-left: 17px;

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

    position: fixed;
    top: 0;
    left: 0;
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
`

const Container = styled.div`
    width: 100%;

    margin-top: 72px;

    position: relative;
    z-index: 10;
`
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

    &::placeholder {
      color: #9F9F9F;
    }
    /* &::disabled {
      background-color: #F2F2F2;
      color: #AFAFAF;
    } */

    /* @media (min-width: 375px) {
        display: none;
    } */
`

export default Header;