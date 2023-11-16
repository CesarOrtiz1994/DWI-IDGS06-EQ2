import Alumno from "./components/Alumno";
import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profesor from "./components/Profesor";

function App() {
  const mensaje = "Aprendiendo React";

  return (
    <>
    <div>
    <h1>Hola mundo</h1>
    </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Alumno />} />
            <Route
              path="Alumno"
              element={
                <Alumno titulo="Mi componente Alumno" detalle={mensaje} />
              }
            />
            <Route
              path="Profesor"
              element={<Profesor titulo="Mi componente Profesor">
                <p>Este es un componente hijo</p>
                </Profesor>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
