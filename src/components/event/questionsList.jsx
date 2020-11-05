import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./style.scss";
import SelectEventToRegister from "./selectEventToRegister";

export default function QuestionsList({location}) {
    //Variables
   const username = location.state.username;
   const moderador = location.state.moderador;
   const eventName = location.state.eventName;
   const eventID = location.state.eventID;
   const [questions, setQuestions] = useState([]);

   //ComponentDidMount 
   useEffect(() => {
        updateQuestionsOfEvent()
   }, [])

   //Get Questions List
   const updateQuestionsOfEvent = () => {
      axios.post('http://localhost:8080/evento/pregunta/list', { 
         headers: {
             'Content-Type': 'application/json', 
             "Access-Control-Allow-Origin": "*"
         },
         idEvento: eventID
     })
     .then(res => {
       setQuestions(res.data);
     })
   }

   //Header of Table
   const renderTableHeader = () => {
       let header = Object.keys(questions[0])
       let value = header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
       value.push(<th key={100}>ACCIONES</th>)
       return value
    }
 
    //Elements of table
   const renderTableData = () => {
       return questions.map((question, index) => {
          const { id, contenido, fecha } = question //destructuring
          return (
             <tr key={id}>
                <td>{id}</td>
                <td>{contenido}</td>
                <td>{fecha}</td>
            </tr>
         )
      })
   }

    if (questions.length === 0){
        return (            
            <h1 id='title'>Lista de Preguntas del evento: {eventName}</h1>
        )
    }else{
        return (
            <div>
                <h1 id='title'>Lista de Preguntas del evento: {eventName}</h1>
                {/* {renderCreateEventButton()} */}
                {/* {renderCreateRegisterToEventButton()} */}
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