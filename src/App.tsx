import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from './common/Layout';
import LoginLayout from './common/LoginLayout';
import { selectUser } from './features/auth/userSlice';
import GamePage from './pages/GamePage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const user = useSelector(selectUser);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {user.token ? (
          <Route index element={<GamePage />} />
        ) : (
          <>
            <Route index element={<Home />}></Route>
            <Route path="/" element={<LoginLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </>
        )}
      </Route>
    </Routes>
  );
};

export default App;
