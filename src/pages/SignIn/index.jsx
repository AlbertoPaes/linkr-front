import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from "../../components/Loading";

import { Wrapper, ContainerPresentation, Logo, Title, ContainerSignIn, StyledLink } from "./style";

import { AuthContext } from '../../contexts/auth';

const Login = () => {
  const navigate = useNavigate();

  const userStorage = localStorage.getItem("user")
  if (userStorage) navigate("/timeline");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState({ placeholder: "Log In", disabled: false });
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    login(formData.email, formData.password, formData.id, isLoading, setIsLoading);

    isLoading.placeholder = <Loading height={100} width={100} />
    isLoading.disabled = true;
    setIsLoading({ ...isLoading });
  }


  const handleInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Wrapper>
      <ContainerPresentation>
        <Logo>linkr</Logo>
        <Title>save, share and discover <br></br> the best links on the web</Title>
      </ContainerPresentation>
      <ContainerSignIn onSubmit={handleLogin} disableButton={isLoading.disabled}>
        <input
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          placeholder="e-mail"
          disabled={isLoading.disabled && "disabled"}
          required
        />
        <input
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
          placeholder="password"
          disabled={isLoading.disabled && "disabled"}
          required
        />
        <button type="submit">
          {isLoading.placeholder}
        </button>
        <StyledLink to="/signup">First time? Create an account!</StyledLink>
      </ContainerSignIn>
    </Wrapper>
  );
}

export default Login;