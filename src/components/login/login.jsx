import React, {useCallback} from "react";
import loginImg from "../../assets/login.svg";
import "./style.scss";

function Login({containerRef, onClick}){
    return(
        <div className="base-container" ref={containerRef}>
            <div className="header">Inicio de Sesión</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg}/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input type="text" name="username" placeholder="Nombre de usuario"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="text" name="password" placeholder="Contraseña"/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={onClick}>
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
}
export default Login;