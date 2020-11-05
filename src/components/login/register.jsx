import React, {useState, useRef} from "react";
import axios from "axios";
import loginImg from "../../assets/login.svg";
import "./style.scss";

function Register({containerRef, onClick}){

    //Variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [moderador, setModerador] = useState("");
    const typeUser = useRef(null);

    //Listeners of inputs
    const handleUsernameChange = ({ target }) => {
      setUsername(target.value);
    };
    const handlePasswordChange = ({ target }) => {
      setPassword(target.value);
    };
    const handleModeradorChange = ({ target }) => {
        const value = target.value
        if (value.length > 1){
            setModerador(value.charAt(0));
        }else{
            setModerador(value);
        }
    };

    //Register Action
    const manageRegisterClick = () => {
        if ((username === "") || password === "" || moderador == ""){
            alert("Debe ingresar un Nombre de usuario, Contraseña y Tipo Usuario válidos")
        }else{
            const persona = {
                username: username,
                password: password,
                moderador: moderador
            }
            axios.post('http://localhost:8080/register', { 
                headers: {
                    'Content-Type': 'application/json', 
                    "Access-Control-Allow-Origin": "*"
                }, 
                persona 
            })
            .then(res => {
                const result = res.data.loginResult;
                if (result){
                  onClick(username, moderador)
                }
            })
        }
    }

    return(
        <div className="base-container" ref={containerRef}>
            <div className="header">Registrarse</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt=""/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleUsernameChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Tipo usuario</label>
                        <input type="email" name="email" ref={typeUser} placeholder="(Participante: 0, Moderador: 1)" onChange={handleModeradorChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" placeholder="Password" onChange={handlePasswordChange}/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={manageRegisterClick}>
                    Registrarse
                </button>
            </div>
        </div>
    );
}

export default Register;
