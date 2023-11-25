import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Systema from './components/systema/Systema';
import { AuthProvider } from './Auth/auth';
import Usuarios from './components/systema/Usuarios/Usuarios';
import Materiales from './components/systema/Materiales/Materiales'; 

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sistema"  element={<Systema/>} />
          <Route path="/sistema/usuarios" element={<Usuarios/>} />
          <Route path="/sistema/categorias" element={<Materiales/>} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
     
    </>
  );
}

export default App;
