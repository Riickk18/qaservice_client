import React, {useState} from "react";
import axios from "axios";

export default function CreateEvent({cancelAction, createSuccessAction}){

    //Variables
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");

    //Listeners of inputs 
    const handleNombreChange = ({target}) => {
        setNombre(target.value)
    }
    const handleFechaChange = ({target}) => {
        setFecha(target.value)
    }

    //Create Event action
    const manageCreateEvent = () => {
        if(nombre === "" || fecha === ""){
            alert("Debe ingresar un nombre y fecha válidos")
        }else{
            const evento = {
                nombre: nombre,
                fecha: fecha
            }
            axios.post('http://localhost:8080/evento/create', { 
                headers: {
                    'Content-Type': 'application/json', 
                    "Access-Control-Allow-Origin": "*"
                }, 
                evento 
            })
            .then(res => {
              const result = res.data.loginResult;
              if (result){
                createSuccessAction()
              }else{
                  alert("Usuario o contraseña inválidos")
              }
            })
        }
    }

    return(
        <div className="App">
            <div className="login">
                <div className="container">
                    <div className="base-container">
                        <div className="header">Crear evento</div>
                        <div className="content">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre Evento</label>
                                    <input type="text" name="name" placeholder="Nombre Evento" onChange={handleNombreChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Fecha</label>
                                    <input type="date" name="date" placeholder="Fecha" onChange={handleFechaChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <button type="button" className="btn btn-Cancel" onClick={cancelAction}>
                                Cancelar
                            </button>
                            <button type="button" className="btn" onClick={manageCreateEvent}>
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}