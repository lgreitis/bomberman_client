import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../features/auth/authApi";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    authApi
      .register(username, password)
      .then((val) => {
        if (val.data.success) {
          navigate("/login");
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <>
      {error && (
        <div
          css={css`
            background-color: #ff7d7d;
            border-radius: 5px;
            padding: 5px;
          `}
        >
          An error has occured
        </div>
      )}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>Register</button>
    </>
  );
};

export default Register;
