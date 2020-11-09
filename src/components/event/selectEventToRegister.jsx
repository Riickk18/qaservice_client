import {useState, useEffect} from "react";
import axios from "axios";

export default function SelectEventToRegister({cancelAction, createSuccessAction, username}){

    //Variables
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(0);

    //ComponentDidMount
    useEffect(() => {
        updateEvents()
     }, [])
  
     //Get events where user is not registered
     const updateEvents = () => {
        axios.get('http://localhost:8080/evento/unregistered/list?username='+ username, { 
           headers: {
               'Content-Type': 'application/json', 
               "Access-Control-Allow-Origin": "*"
           }
       })
       .then(res => {
         setEvents(res.data);
       })
     }

     //Options of select
    const refreshList = () => {
        return events.map((event, index) => {
            const { id, nombre, fecha } = event //destructuring
            return (<option key = {id} value={id}>{nombre}</option>)
        })
    }

    //Listener of selection
    const handleSelectedOption = ({target}) => {
        console.log(target.value)
        setSelectedEventId(target.options[target.selectedIndex].value);
    }

    //Register to selected event action
    const manageRegisterToEvent = () => {
        if (selectedEventId === 0){
            alert("Debe seleccionar un evento")
        }else{
            const personaEvento = {
                idEvento: selectedEventId,
                username: username
            }
            axios.post('http://localhost:8080/evento/register', { 
                headers: {
                    'Content-Type': 'application/json', 
                    "Access-Control-Allow-Origin": "*"
                }, 
                personaEvento 
            })
            .then(res => {
              const result = res.data.result;
              if (result){
                createSuccessAction()
              }else{
                  alert("Usuario o contraseña inválidos")
              }
            })
        }
    }

    if (events.length === 0){
        return <p>Actualizando lista</p>
    }else{
        return(
            <div className="App">
                <div className="login">
                    <div className="container">
                        <div className="base-container">
                            <div className="header">Registrar asistencia a Evento</div>
                            <div className="content">
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="name">Seleccione un evento de la lista</label>
                                        <select id = "myList" onChange={handleSelectedOption} style={{width: 300}}>
                                            <option key="0" value="0" selected>Seleccione...</option>
                                            {refreshList()}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <button type="button" className="btn btn-Cancel" onClick={cancelAction}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn" onClick={manageRegisterToEvent}>
                                    Registrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}