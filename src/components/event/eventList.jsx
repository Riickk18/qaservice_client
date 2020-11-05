import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./style.scss";
import CreateEvent from "./createEvent";
import SelectEventToRegister from "./selectEventToRegister";
import { Redirect } from 'react-router-dom';

export default function EventList({location}) {

   //Variables
   const username = location.state.username;
   const moderador = location.state.moderador;
   const [eventSelected, setEventSelected] = useState(0);
   const [events, setEvents] = useState([]);
   const [createEvent, setCreateEvent] = useState(false);
   const [registerToEvent, setRegisterToEvent] = useState(false);
   const [showQuestions, setShowQuestions] = useState(false);

   //ComponentDidMount
   useEffect(() => {
      updateEvents()
   }, [])

   //Get Event List
   const updateEvents = () => {
      axios.get('http://localhost:8080/evento/list', { 
         headers: {
             'Content-Type': 'application/json', 
             "Access-Control-Allow-Origin": "*"
         }
     })
     .then(res => {
       setEvents(res.data);
     })
   }

   //Create Event Button
   const renderCreateEventButton = () => {
      if (moderador === 1){
         return   <button type="button" className="btn" onClick={createEventClick}>
                     Crear evento
                  </button>
      }else{
         return <div></div>
      }
   }

   //Create Register to Event Button
   const renderCreateRegisterToEventButton = () => {
         return   (<button type="button" className="btn" onClick={registerToEventClick}>
                     Registrarse a evento
                  </button>)
   }

   //Table's header
   const renderTableHeader = () => {
       let header = Object.keys(events[0])
       let value = header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
       value.push(<th key={100}>ACCIONES</th>)
       return value
   }

   const showQuestionsList = (eventid) => {
      setEventSelected(eventid);
      setShowQuestions(true);
   }
 
   //Table's Data
   const renderTableData = () => {
       return events.map((event, index) => {
          const { id, nombre, fecha } = event //destructuring
          return (
             <tr key={id}>
                <td>{id}</td>
                <td>{nombre}</td>
                <td>{fecha}</td>
                <td>
                  {/* <button type="button" className="btn" onClick={showQuestionsList(index)}>
                     Preguntas
                  </button> */}
                </td>
            </tr>
         )
      })
   }

   const cancelAction = () => {
      setCreateEvent(false);
      setRegisterToEvent(false);
   }

   const createEventClick = () => {
      setCreateEvent(true);
   }

   const registerToEventClick = () => {
      setRegisterToEvent(true);
   }

   const createEventSucces = () => {
      setCreateEvent(false);
      setRegisterToEvent(false);
      updateEvents()
   }
 
   if (createEvent){
      return <CreateEvent cancelAction={cancelAction} createSuccessAction={createEventSucces}/>
   }else if (registerToEvent){
      return <SelectEventToRegister cancelAction={cancelAction} createSuccessAction={createEventSucces} username={username}/>
   }else if (showQuestions){
      return (<Redirect to={{
         pathname: '/event/questionsList',
         state: { username: username, moderador: moderador, eventID: events[eventSelected].id, eventName: events[eventSelected].nombre }
         }} />)
   }else{
      if (events.length === 0){
         return (            
            <h1 id='title'>Lista de Eventos</h1>
         )
      }else{
         return (
            <div>
               <h1 id='title'>Lista de Eventos</h1>
               {renderCreateEventButton()}
               {renderCreateRegisterToEventButton()}
               <table id='events'>
                  <tbody>
                     <tr>{renderTableHeader()}</tr>
                     {renderTableData()}
                  </tbody>
               </table>
            </div>
         )
      }
   }
}