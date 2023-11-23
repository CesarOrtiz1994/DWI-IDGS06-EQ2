import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const endPoint = "http://localhost:8000/api/solicitud";

export default function ModalDetalle({ show, handleClose, idSolicitud }) {
  const [detalle, setDetalle] = useState([]);

  useEffect(() => {
    if (idSolicitud !== 0) {
      const getMaterialById = async () => {
        const res = await axios.get(`${endPoint}/${idSolicitud}`);
        setDetalle(res.data.solicitud);
      };
      getMaterialById();
    }
  }, [idSolicitud]);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de la solicitud</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {detalle.map((item) => (
                  <tr key={item.id}>
                    <td>{item.material.nombre}</td>
                    <td>{item.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
