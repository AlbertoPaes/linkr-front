import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function User() {

    const { id } = useParams();

    const URL = `http://localhost:4000/users/${id}`

    useEffect(() => {
        async function getUserById() {

            try {
                const users = await axios.get(URL);
                console.log(users.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getUserById();
    }, [])

    return (
        <h1>Página de usuarios</h1>
    )
}