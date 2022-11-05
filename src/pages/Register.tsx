import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { authService } from '../features/auth/auth.service';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    authService
      .register(username, password)
      .then((val) => {
        if (val.data.success) {
          navigate('/login');
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
          `}>
          An error has occured
        </div>
      )}
      <form
        css={css`
          display: contents;
        `}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
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
        <button css={Button} onClick={handleSubmit}>
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
