import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = "http://localhost:8000/api/materialStock";

export default function ModalAddStock({
  show,
  handleClose,
  id_material,
  nom_material,
}) {
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    limpiar();
}, [show]);

  const add = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .put(`${endPoint}/${id_material}`, {
          stock: cantidad,
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
    if (cantidad === 0 || cantidad < 0) {
      toast.error("La cantidad deve ser mayor a 0");
      return false;
    } else if (cantidad === "") {
      toast.error("La cantidad es obligatoria");
      return false;
    } else {
      return true;
    }
  };

    const limpiar = () => {
        setCantidad(0);
    }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agrregar material</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={add}>
          <div className="mb-3">
            <label className="form-label">Agregar stock a: {nom_material}</label>
            <input
              type="number"
              className="form-control"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </div>
          <Button variant="secondary" onClick={handleClose} className="m-2">
            Cerrar
          </Button>
          <Button variant="primary" type="submit">
            Agregar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
