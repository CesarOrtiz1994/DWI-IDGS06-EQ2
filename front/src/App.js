import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Systema from './components/systema/Systema';
import { AuthProvider } from './Auth/auth';
import Solicitudes from './components/systema/Solicitudes/Solicitudes';
import Usuarios from './components/systema/Usuarios/Usuarios';
import Inventario from './components/systema/Inventario/Inventario';
import Materiales from './components/systema/Materiales/Materiales'; 
import Solicitar from './components/systema/Solicitar/Solicitar';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sistema"  element={<Systema/>} />
          <Route path="/sistema/solicitudes" element={<Solicitudes/>} />
          <Route path="/sistema/usuarios" element={<Usuarios/>} />
          <Route path="/sistema/inventario" element={<Inventario/>} />
          <Route path="/sistema/materiales" element={<Materiales/>} />
          <Route path="/sistema/solicitar" element={<Solicitar/>} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
     
    </>
  );
}

export default App;
