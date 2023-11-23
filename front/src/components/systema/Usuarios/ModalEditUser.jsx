import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = "http://localhost:8000/api/user";
const endPoint1 = "http://localhost:8000/api/users";

export default function ModalEditUser({ show, handleClose, id_user }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState(0);


    useEffect(() => {
    if (id_user !== 0) {

        const getUsuarioById = async () => {
            const res = await axios.get(`${endPoint}/${id_user}`);
              setNombre(res.data.user.name);
              setEmail(res.data.user.email);
              setRol(res.data.user.type);
          };

        getUsuarioById();
      }
    }, [id_user]);

  const edit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios.put(`${endPoint1}/${id_user}`, {
          name: nombre,
          email: email,
          type: rol,
        })
        .then((response) => {
          //console.log(response);
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
    } else if (rol === 0) {
      toast.error("El rol es obligatorio");
      return false;
    } else {
      return true;
    }
  };

  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ediar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={edit}>
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
