import React, {useState} from "react";
import axios from 'axios';
import loginImg from "../../assets/login.svg";
import "./style.scss";

function Login({containerRef, onClick}){
    //Variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Listeners of inputs
    const handleUsernameChange = ({ target }) => {
      setUsername(target.value);
    };
    const handlePasswordChange = ({ target }) => {
      setPassword(target.value);
    };

    //Login action
    const manageLoginClick = () => {
        if ((username === "") || password === ""){
            alert("Debe ingresar un Nombre de usuario y Contraseña válidos")
        }else{
            const persona = {
                username: username,
                password: password
            }
            axios.post('http://localhost:8080/login', { 
                headers: {
                    'Content-Type': 'application/json', 
                    "Access-Control-Allow-Origin": "*"
                }, 
                persona 
            })
            .then(res => {
              const result = res.data.loginResult;
              if (result){
                const moderador = res.data.parameters.moderador;
                onClick(username, moderador)
              }else{
                  alert("Usuario o contraseña inválidos")
              }
            })
        }
    }

    return(
        <div className="base-container" ref={containerRef}>
            <div className="header">Inicio de Sesión</div>
            <div className="content">
                <div className="image" >
                    <img src={loginImg} alt=""/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input type="text" name="username" placeholder="Nombre de usuario" maxlength="16" onChange={handleUsernameChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" placeholder="Contraseña" maxlength="16" onChange={handlePasswordChange}/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={manageLoginClick}>
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
}
export default Login;