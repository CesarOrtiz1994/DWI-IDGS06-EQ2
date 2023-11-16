import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{display: 'flex'}}>
      <nav style={{
        minHeight: '900px',
        background: '#f0f0f0',
        marginRight: '50px',
        paddingRight: '50px',
      }}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/alumno">Alumno</Link>
          </li>
          <li>
            <Link to="/profesor">Profesor</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
