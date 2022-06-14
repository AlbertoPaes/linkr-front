import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
// import { useContext } from "react";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Posts from "./pages/Posts";

// import HomePage from "./pages/HomePage";
import Timeline from "./pages/Timeline";

import GlobalStyle from "./styles/GlobalStyle";

import { AuthProvider, AuthContext } from "./contexts/auth";


const App = () => {
  // const Private = ({ children }) => {
  //   const { authenticated } = useContext(AuthContext);

  //   if (!authenticated) {
  //     return <Navigate to="/signup" />;
  //   }

  //   return children;
  // };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts/:id" element={<Posts />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
        <GlobalStyle />
      </AuthProvider>
    </Router>
  );
};

export default App;