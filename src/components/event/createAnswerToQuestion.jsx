import {useState} from "react";
import axios from "axios";

export default function CreateAnswerToQuestion({cancelAction, createSuccessAction, contenidoPregunta, eventID, preguntaID, eventName, username}){

    //Variables
    const [contenido, setContenido] = useState("");

    //Listeners of inputs 
    const handleContenidoChange = ({target}) => {
        setContenido(target.value)
    }

    //Create Event action
    const manageCreateEvent = () => {
        if(contenido === ""){
            alert("Debe ingresar una respuesta válida")
        }else{
            var date = new Date();
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();

            date = yyyy + '-' + mm + '-' + dd;
            axios.post('http://localhost:8080/evento/pregunta/respuesta/create', { 
                headers: {
                    'Content-Type': 'application/json', 
                    "Access-Control-Allow-Origin": "*"
                }, 
                contenido: contenido,
                fecha: date,
                username: username,
                idEvento: eventID,
                idPregunta: preguntaID
            })
            .then(res => {
              const result = res.data.result;
              if (result){
                createSuccessAction("answer")
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
                        <div className="header">Aceptar Pregunta</div>
                        <div className="content">
                            <div className="form">
                                <div className="form-group">
                                <label htmlFor="name">Evento: <i>{eventName}</i></label>
                                </div>
                            </div>
                            <div className="form">
                                <div className="form-group">
                                <label htmlFor="name">Pregunta: <i>{contenidoPregunta}</i></label>
                                </div>
                            </div>
                            <div className="form">
                                <div className="form-group">
                                <label htmlFor="name">Respuesta</label>
                                <textarea className="textArea" onChange={handleContenidoChange} />
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <button type="button" className="btn btn-Cancel" onClick={cancelAction}>
                                Cancelar
                            </button>
                            <button type="button" className="btn" onClick={manageCreateEvent}>
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}