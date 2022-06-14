import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";

// import { makeSignUp } from "../../services/api";

import { Wrapper, ContainerPresentation, Logo, Title, ContainerSignUp, StyledLink} from "./style";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    pictureUrl: "",
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
      // await makeSignUp({ ...formData });
      setIsLoading(false);
      navigate("/sign-in");
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
      <ContainerSignUp onSubmit={handleSignUp}>     
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
          value={formData.username}
          onChange={handleInputChange}
          name="username"
          placeholder="username"
          disabled={isLoading.disabled && "disabled"}
          required
        />
        <input
          type="url"
          value={formData.pictureUrl}
          onChange={handleInputChange}
          name="pictureUrl"
          placeholder="picture url"
          disabled={isLoading.disabled && "disabled"}
          required
        />
        <button type="submit" disableButton={isLoading.disabled}>
          {isLoading.placeholder}
        </button>
        <StyledLink to="/sign-in">Switch back to log in</StyledLink>
      </ContainerSignUp>
    </Wrapper>
  );
};

export default SignUp;