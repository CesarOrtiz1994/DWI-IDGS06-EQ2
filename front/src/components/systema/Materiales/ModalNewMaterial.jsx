import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = "http://localhost:8000/api/material";

export default function ModalNewMaterial({ show, handleClose }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        limpiar();
    }, [show]);

    const store = async (e) => {
        e.preventDefault();
        if (validate()) {
            await axios
                .post(endPoint, {
                    nombre: nombre,
                    descripcion: descripcion,
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
        } else if (descripcion === "") {
            toast.error("La descripcion es obligatoria");
            return false;
        } else {
            return true;
        }
    };

    const limpiar = () => {
        setNombre("");
        setDescripcion("");
    };


  return (
   <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear nuevo material</Modal.Title>
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
            <label className="form-label">Descripcion</label>
            <input
              type="text"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
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
  )
}
