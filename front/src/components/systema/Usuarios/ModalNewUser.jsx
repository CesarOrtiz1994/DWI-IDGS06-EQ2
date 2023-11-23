import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = "http://localhost:8000/api/register";

export default function ModalNewUser({ show, handleClose }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(0);

  useEffect(() => {
    limpiar();
  }, [show]);

  const store = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .post(endPoint, {
          name: nombre,
          email: email,
          password: password,
          type: rol,
        })
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
  };

  const validate = () => {
    if (nombre === "") {
      toast.error("El nombre es obligatorio");
      return false;
    } else if (email === "") {
      toast.error("El email es obligatorio");
      return false;
    } else if (password === "") {
      toast.error("La contraseña es obligatoria");
      return false;
    } else if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return false;
    } else if (rol === 0) {
      toast.error("El rol es obligatorio");
      return false;
    } else {
      return true;
    }
  };

  const limpiar = () => {
    setEmail("");
    setNombre("");
    setPassword("");
    setRol(0);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear nuevo usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={store}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rol</label>
            <select
              className="form-select"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="0">Seleccione un rol</option>
              <option value="1">Administrador</option>
              <option value="2">Almacen</option>
              <option value="3">Jefe de area</option>
            </select>
          </div>
          <Button variant="secondary" onClick={handleClose} className="m-2">
            Cerrar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
