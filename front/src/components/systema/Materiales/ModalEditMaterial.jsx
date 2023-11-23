import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = "http://localhost:8000/api/material";

export default function ModalEditMaterial({ show, handleClose, id_material }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (id_material !== 0) {
      const getMaterialById = async () => {
        const res = await axios.get(`${endPoint}/${id_material}`);
        setNombre(res.data.material.nombre);
        setDescripcion(res.data.material.descripcion);
      };
      getMaterialById();
    }
  }, [id_material]);

  const edit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .put(`${endPoint}/${id_material}`, {
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

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Ediar material</Modal.Title>
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
  );

}
