import React from "react";
import loginImg from "../../assets/login.svg";
const { render } = require("react-dom");

export class Register extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Registrarse</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Nombre de usuario</label>
                            <input type="text" name="username" placeholder="Nombre de usuario"/>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" name="name" placeholder="Nombre"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Apellido</label>
                            <input type="text" name="lastname" placeholder="Apellido"/>
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input type="email" name="email" placeholder="Correo electrónico"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="text" name="password" placeholder="Password"/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn">
                        Registrarse
                    </button>
                </div>
            </div>
        );
    }
}

