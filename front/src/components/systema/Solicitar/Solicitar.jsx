import React, { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import "../systema.css";
import { AuthRoute, useAuth } from "../../../Auth/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
//import ModalAddStock from "./ModalAddStock";
import { ToastContainer, toast } from "react-toastify";

const urlMateriales = "http://localhost:8000/api/materiales";
const urlMaterial = "http://localhost:8000/api/material";
const urlSolicitar = "http://localhost:8000/api/solicitud";

function useLocalStorage(itemName, inicialValue) {
  const localStorageItem = localStorage.getItem(itemName);
  let parseItem;
  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(inicialValue));
    parseItem = [];
  } else {
    parseItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parseItem);

  const saveItem = (newitem) => {
    localStorage.setItem(itemName, JSON.stringify(newitem));
    setItem(newitem);
  };

  return [item, saveItem];
}

function Solicitar() {
  const auth = useAuth();

  const [inactive, setInactive] = useState(false);
  const [detalleSolicitud, saveDetalleSolicitud] = useLocalStorage(
    "detalleSolicitud",
    []
  ); // detalle de la solicitud
  const [materiales, setMateriales] = useState([]); // materiales
  const [cantidad, setCantidad] = useState(0); // cantidad
  const [idMaterial, setIdMaterial] = useState(""); // id del material
  const [material, setMaterial] = useState(""); // nombre del material
  const [stock, setStock] = useState(0); // stock del material

  useEffect(() => {
    if (idMaterial !== "") {
        console.log(idMaterial);
      const dataMAterial = async () => {
        await axios.get(`${urlMaterial}/${idMaterial}`).then((response) => {
          setMaterial(response.data.material.nombre);
          setStock(response.data.material.stock);
        });
      };
      dataMAterial();
    }
  }, [idMaterial]);

  const add = () => {
    if (validar()) {
      const newDetalleSolicitud = {
        material_id: idMaterial,
        material: material,
        cantidad: cantidad,
        stock: stock,
      };
      saveDetalleSolicitud([...detalleSolicitud, newDetalleSolicitud]);
      setIdMaterial("");
      setMaterial("");
      setCantidad("");
    }
  };

  useEffect(() => {
    getMateriales();
  }, []);

  const getMateriales = async () => {
    await axios.get(`${urlMateriales}`).then((response) => {
      setMateriales(response.data.materiales);
    });
  };

  const validar = () => {
    
    parseInt(cantidad);
    parseInt(stock);
    
    if (idMaterial === "" || cantidad === "") {
      toast.error("Debe seleccionar un material y agregar una cantidad");
      return false;
    } else if (cantidad <= 0) {
      toast.error("La cantidad debe ser mayor a 0");
      return false;
    } else if ( parseInt(stock) <  parseInt(cantidad)) {
        toast.error("No hay stock suficiente");
        return false;
    } else if (detalleSolicitud.some((item) => item.material_id === idMaterial)) {
        toast.error("El material ya se encuentra en la lista de materiales si quiere aumentar la cantidad debe eliminarlo y agregarlo nuevamente");
        return false;
    } else {
        return true;
    }
  };

  const eliminar = (index) => {
    const newDetalleSolicitud = [...detalleSolicitud];
    newDetalleSolicitud.splice(index, 1);
    saveDetalleSolicitud(newDetalleSolicitud);
  };

  const Solicitar = async () => {
    const data = {
      user_id: auth.dataUser.id,
      materiales: detalleSolicitud,
    };
    await axios.post(`${urlSolicitar}`, data).then((response) => {
      toast.success("Solicitud enviada");
      saveDetalleSolicitud([]);
    })
    .catch((error) => {
        toast.error(error.response.data.message);
    });
  };



  if (auth.dataUser.rol !== 3) {
    return <Navigate to="/" />;
  }

  return (
    <AuthRoute>
      <Menu
        onCollapse={(inactive) => {
          //console.log(inactive);
          setInactive(inactive);
        }}
      />

      <div className={`conter ${inactive ? "inactive" : ""}`}>
        <h1>Solicitar material</h1>

        <div className="divhr"></div>
        <br />

        <div className="row d-flex justify-content-center">
          <div className="col-md-10 flex-column mb-3">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Materiales</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <label htmlFor="material">Material</label>
                    <select
                      className="form-control"
                      id="material"
                      value={idMaterial}
                      onChange={(e) => setIdMaterial(e.target.value)}
                    >
                      <option value="">Seleccione</option>
                      {materiales.map((material) => (
                        <option key={material.id} value={material.id}>
                          {material.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                      type="number"
                      className="form-control"
                      name="cantidad"
                      id="cantidad"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="">Accion</label>
                    <button className="btn btn-primary btn-block" onClick={add}>
                      <FiPlus /> Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-10 flex-column">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Detalle de la solicitud</h3>
              </div>
              <div className="card-body">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Cantidad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalleSolicitud.length === 0 ? (
                      <tr>
                        <td colSpan="3">No hay materiales</td>
                      </tr>
                    ) : (
                      detalleSolicitud.map((detalle, index) => (
                        <tr key={index}>
                          <td>{detalle.material}</td>
                          <td>{detalle.cantidad}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminar(index)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="card-footer text-end">
                <button className={`btn btn-primary btn-block ${detalleSolicitud.length === 0 ? "disabled" : ""}`}
                onClick={Solicitar}>
                   Crear Solicitud
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </AuthRoute>
  );
}

export default Solicitar;
