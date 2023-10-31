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
import CreateStuff from './pages/CreateStuff';
import Thing from './pages/Thing';


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
      Cookies.remove('email');
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {user.isLogged ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/stuff/:id" element={<Thing />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/create" element={<CreateStuff />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Signin />} />
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;