import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";

import { makeSignUp } from "../../services/api";

import { Wrapper, ContainerPresentation, Logo, Title, ContainerSignUp, StyledLink} from "./style";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState({
    placeholder: "Sign Up",
    disabled: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(formData);

    isLoading.placeholder = <Loading height={100} width={100} />;
    isLoading.disabled = true;
    setIsLoading({ ...isLoading });

    try {
      await makeSignUp({ ...formData });
      setIsLoading(false);
      navigate("/");
    } catch {
      alert("Please fill in the data correctly");
      isLoading.placeholder = "Sign Up";
      isLoading.disabled = false;
      setIsLoading({ ...isLoading });
    }
  };

  return (
    <Wrapper>
      <ContainerPresentation>
        <Logo>linkr</Logo>
        <Title>save, share and discover <br></br> the best links on the web</Title>
      </ContainerPresentation>
      <ContainerSignUp onSubmit={handleSignUp} disableButton={isLoading.disabled}>     
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
        <input
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          placeholder="username"
          disabled={isLoading.disabled && "disabled"}
          required
        />
        <input
          type="text"
          value={formData.image}
          onChange={handleInputChange}
          name="image"
          placeholder="picture url"
          disabled={isLoading.disabled && "disabled"}
          required
        />
        <button type="submit">
          {isLoading.placeholder}
        </button>
        <StyledLink to="/">Switch back to log in</StyledLink>
      </ContainerSignUp>
    </Wrapper>
  );
};

export default SignUp;