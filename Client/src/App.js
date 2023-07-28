import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Navbar/Nav";
import About from "./components/About/About";
import Form from "./components/Form/Form";
import Detail from "./components/Detail/Detail";
import axios from "axios";
import style from "./App.module.css";
import Favorites from "./components/Favorites/Favorites";
import Profile from "./components/Profile/Profile";

function App() {
  const navigate = useNavigate(); // Importar useNavigate !!!!!
  const [access, setAccess] = React.useState(false);
  const [errorApi, seterrorApi] = React.useState(false);

  function logout() {
    setAccess(false);
  }

  async function login(userData) {
    const { email, password } = userData;
    const URL = "http://localhost:3001/user/login/";

    try {
      const backendLogin = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { data } = backendLogin;
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      // No se pudo hacer la solicitud al backend.
      alert(error.message);
    }
    // axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
    //   const { access } = data;
    //   setAccess(access);
    //   access && navigate("/home");
    // });
  }

  useEffect(() => {
    !access && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);

  async function onSearch(dato) {
    // agrega personajes a characters
    // axios(`http://localhost:3001/character/${dato}`)
    //   .then((respuesta) => {
    //     if (respuesta.data.name) {
    //       // antes de agregar busco si "ya existe". Como lo harias?
    //       // tu codigo aquí:
    //       // if("yaExiste") return
    //       setCharacters((oldChars) => [...oldChars, respuesta.data]);
    //     } else {

    //     }
    //   })
    //   .catch((err) => alert(err.response.data.error));

    try {
      const backRequest = await axios(
        `http://localhost:3001/character/${dato}`
      );
      if (backRequest.data.name) {
        seterrorApi(false);
        setCharacters((oldChars) => [...oldChars, backRequest.data]);
      } else {
        seterrorApi(true);
      }
    } catch (error) {
      seterrorApi(true);
    }
  }

  function onClose(id) {
    // elimina personajes de characters
    // window.alert("onClose :)")
    setCharacters(
      characters.filter((pj) => {
        return pj.id !== Number(id);
      })
    );
  }

  const [characters, setCharacters] = useState([]); // [{}]

  const location = useLocation();

  return (
    <div className={style.App}>
      {location.pathname !== "/" && <Nav onSearch={onSearch} out={logout} />}
      <Routes>
        <Route
          path="/home"
          element={
            !errorApi ? (
              <Home characters={characters} onClose={onClose} />
            ) : (
              <h1>Componente de error 404</h1>
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/" element={<Form login={login} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/dashboard/:idUser"
          element={
            <Profile
              name={"Messi"}
              username={"leo36"}
              email={"leo@messi.com"}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

// lo que tenemos con axios pero con fetch

// fetch(`https://rickandmortyapi.com/api/character/${dato}`)
// .then(respuesta => respuesta.json())
// .then((respuestaJson) => {
//   if (respuestaJson.name) {
//     setCharacters((oldChars) => [...oldChars, respuestaJson]);
//   } else {
//   }
// })
// .catch((err) => window.alert("¡No hay personajes con este ID!"));
