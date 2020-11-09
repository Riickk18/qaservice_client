import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./style.scss";
import CreateEvent from "./createEvent";
import SelectEventToRegister from "./selectEventToRegister";
import { Redirect, useHistory } from 'react-router-dom';

export default function EventList({location}) {

   //Variables
   let history = useHistory();
   const username = location.state.username;
   const moderador = location.state.moderador;
   const [eventSelected, setEventSelected] = useState(0);
   const [events, setEvents] = useState([]);
   const [createEvent, setCreateEvent] = useState(false);
   const [registerToEvent, setRegisterToEvent] = useState(false);
   const [showQuestions, setShowQuestions] = useState(false);
   const [showReportEvent, setShowReportEvent] = useState(false);

   //ComponentDidMount
   useEffect(() => {
      updateEvents()
   }, [])

   //Get Event List
   const updateEvents = () => {
      axios.get('http://localhost:8080/evento/list?username='+ username, { 
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
         return   <button type="button" className="btn btn-Space" onClick={createEventClick}>
                     Crear evento
                  </button>
      }else{
         return <div></div>
      }
   }

   //Create Register to Event Button
   const renderCreateRegisterToEventButton = () => {
         return   (<button type="button" className="btn btn-Space" onClick={registerToEventClick}>
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

   const showReportButton = (index) => {
      if (moderador === 1){
         return (<button type="button" className="btn btn-Space" onClick={() => showEventReport(index)}>
                  Reporte
                  </button>)
      }else{
         return (<div></div>)
      }
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
                  <button type="button" className="btn btn-Space" onClick={() => showQuestionsList(index)}>
                     Preguntas
                  </button>
                  {showReportButton(index)}
                </td>
            </tr>
         )
      })
   }

   const cancelAction = () => {
      setCreateEvent(false);
      setRegisterToEvent(false);
      setShowReportEvent(false);
   }

   const createEventClick = () => {
      setCreateEvent(true);
   }

   const registerToEventClick = () => {
      setRegisterToEvent(true);
   }

   const showEventReport = (index) => {
      setEventSelected(index)
      setShowReportEvent(true);
   }

   const createEventSucces = () => {
      cancelAction()
      updateEvents()
   }

   const backAction = () =>{
      history.goBack()
   }
 
   if (createEvent){
      return <CreateEvent cancelAction={cancelAction} createSuccessAction={createEventSucces}/>
   }else if (registerToEvent){
      return <SelectEventToRegister cancelAction={cancelAction} createSuccessAction={createEventSucces} username={username}/>
   }else if (showQuestions){
      return (<Redirect push to={{
         pathname: '/event/questionsList',
         state: { username: username, moderador: moderador, eventID: events[eventSelected].id, eventName: events[eventSelected].nombre }
         }} />)
   }else if (showReportEvent){
      return (<Redirect push to={{
         pathname: '/event/report',
         state: { username: username, moderador: moderador, eventID: events[eventSelected].id, eventName: events[eventSelected].nombre }
         }} />)
   }else{
      if (events.length === 0){
         return ( 
            <div>
               <div className="navigationBar">
                  <button className="navButton navBackButton" onClick={backAction}><b>Salir</b></button>
               </div>           
               <h1 id='title'>Lista de Eventos</h1>
               {renderCreateEventButton()}
               {renderCreateRegisterToEventButton()}
            </div>
         )
      }else{
         return (
            <div>
               <div className="navigationBar">
                  <button className="navButton navBackButton" onClick={backAction}><b>Salir</b></button>
               </div>
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