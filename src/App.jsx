import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";

import { AuthProvider,AuthContext } from "./contexts/auth";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Timeline from "./pages/Timeline";
import Hashtag from "./pages/Hashtag";

import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
      return <Navigate to="/signup" />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Private> <Timeline /> </Private>} />
          <Route path="/users/:id" element={<Private> <User /> </Private>} />
          <Route path="/hashtag/:hashtag" element={<Private> <Hashtag /> </Private>} />
        </Routes>
      </AuthProvider>
    </Router>

  );
};

export default App;