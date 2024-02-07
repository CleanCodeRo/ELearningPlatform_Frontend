import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./Login";

export const UserContext = createContext();

const LoginService = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Oli");
  const [password, setPassword] = useState("1234");
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  async function login(e) {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/users/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        console.log(response);
        setError("Incorrect username or password");
        setUsername("");
        setPassword("");
      } else {
        setError(null);
        const data = await response.json();
        const token = data.response;
        const decoded = jwtDecode(token);

        console.log(decoded);

        localStorage.setItem("ELearningToken", token);
        console.log("Login successful: ", data);

        setUser(decoded);
        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <UserContext.Provider value={user}>
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        login={login}
        error={error}
      />
    </UserContext.Provider>
  );
};
export default LoginService;
