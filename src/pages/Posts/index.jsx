import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Posts(req, res) {

    const URL = "http://localhost:4000/users/"

    const { id } = useParams();

    const [search, setSearch] = useState("");

    // FAZER A REQUISIÇÃO NO BACKEND E SUBSTITUIR POR ESSE ARRAY;
    // Na requisição, fazer usando o estado search;

    const usuarios = [
        { name: "Usuário1", image: "Imagem1" },
        { name: "Usuário2", image: "Imagem2" },
        { name: "Usuário3", image: "Imagem3" }
    ]

    useEffect(() => {
        async function getUserById() {

            try {
                const users = await axios.get(`${URL}1`);
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
            <Header>
                <Logo>linkr</Logo>
            </Header>
            <Container>
                <Input type="text" placeholder='Search for people and friends' required
                    onChange={(e) => setSearch(e.target.value)} value={search}>
                </Input>
                {usuarios.length > 0 ?
                    <Users>
                        {usuarios.map(usuario => {
                            return (
                                <User>
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

const User = styled.div`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    line-height: 23px;    

    display: flex;
    flex-direction: column;

    padding-top: 34px;
    gap: 24px;
`

const Users = styled.div`
    width: 350px;

    background-color: #E7E7E7;

    margin-top:-10px;
    margin-left: 10px;

    display: ;
`

const Header = styled.div`
    width: 375px;
    height: 72px;

    background-color: #151515;
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
    width: 375px;
    height: 142px;

    background-color: #333333;
`
const Input = styled.input`
    width: 350px;
    height: 45px;

    background-color: #FFFFFF;
    color: #151515;
    
    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    
    padding-left: 16px;
    margin-top: 10px;
    margin-left: 10px;

    border: none;
    border-radius: 8px;

    &::placeholder {
      color: #9F9F9F;
    }
    &::disabled {
      background-color: #F2F2F2;
      color: #AFAFAF;
    }

    /* @media (min-width: 375px) {
        display: none;
    } */
`

export default Posts;