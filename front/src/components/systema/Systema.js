import React from 'react'
import Menu from './menu/Menu';
import './systema.css';
import { AuthRoute, useAuth } from '../../Auth/auth';

export default function Systema() {

  const [inactive, setInactive] = React.useState(false);
  const auth = useAuth();

  return (
    <AuthRoute>
      <Menu onCollapse={(inactive) => {
        //console.log(inactive);
        setInactive(inactive);
      }}/>
      <div className={`conter ${inactive ? 'inactive' : ''}`}>
        <h1>Electro GP</h1>
        <div className="divhr"></div>
        <br />

        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bienvedido {auth.dataUser.name}</h5>
                <p className="card-text">Tu rol es: {auth.dataUser.rol === 1 ? "Administrador" : auth.dataUser.rol === 2 ? "Almacen" : "Jefe de area"}</p>
                <div className="divhr"></div>
                <br />
                <p className="card-text">Informacion de tu cuenta</p>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">Email: {auth.dataUser.email}</li>
              </ul>

              </div>
              <div className="card-footer">
                <small className="text-muted">Electro GP | InnovacionQueretaro</small>
              </div>
            </div>
          </div>
        </div>
            


      </div>

    </AuthRoute>
      
  )
}
