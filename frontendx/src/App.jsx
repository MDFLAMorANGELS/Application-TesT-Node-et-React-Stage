import React, { useEffect } from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { userAtom } from './atom';
import Cookies from 'js-cookie';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NotFoundPage from './pages/NotFoundPage';


function App() {
  const [user, setUser] = useAtom(userAtom);


  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setUser({
        isLogged: true,
      });
    } else {
      setUser({
        isLogged: false,
      });
      Cookies.remove('token');
      Cookies.remove('id');
      Cookies.remove('username');
      Cookies.remove('email');
      Cookies.remove('admin');
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          {user.isLogged ? (
            <>
              <Route exact path="/home" element={<Home />} />
              <Route path="/signup" element={<Navigate to="/home" />} />
              <Route path="/signin" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route exact path="/home" element={<Navigate to="/signin" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
            </>
          )}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;