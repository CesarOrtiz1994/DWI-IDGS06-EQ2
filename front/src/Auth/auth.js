import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

const AuthContext = React.createContext();

function AuthProvider({ children }) {

  const API = axios.create({ 
    baseURL: "http://127.0.0.1:3001/api",
   });

  const navigate = useNavigate();
  
  const [dataUser, saveDataUser] = useLocalStorage('dataUser', []);

  const login = ({ email, password }) => {

    API.post("/login", {
      email: email,
      password: password,
    }
    )
    .then((res) => {
      //console.log(res.data);
        toast.success(res.data.message);
        saveDataUser({...dataUser,
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          rol: res.data.user.type,
          token: res.data.token,
        });
        navigate("/sistema");
    }
    )
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
        //console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      }
    }
    );
   
  };

  const logout = () => {
    //setEmail(null);
    saveDataUser([]);
    navigate("/");
  };

  const auth = {
    dataUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

function AuthRoute(props) {
 const auth = useAuth();
  if (!auth.dataUser.token) {
    return <Navigate to="/" />;
  }
  return props.children;
}

export { AuthProvider, useAuth, AuthRoute };
