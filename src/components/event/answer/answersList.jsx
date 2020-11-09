import React, {useState, useEffect} from 'react';
import axios from "axios";
import CreateAnswerToQuestion from "../createAnswerToQuestion";

export default function AnswersList({location}) {

    //Variables
    const username = location.state.username;
    const moderador = location.state.moderador;
    const eventID = location.state.eventID;
    const eventName = location.state.eventName;
    const questionID = location.state.questionID;
    const questionContenido = location.state.questionContenido;
    const [answerList, setAnswerList] = useState([])
    const [createAnswerToQuestion, setCreateAnswerToQuestion] = useState(false);
    
    //ComponentDidMount 
   useEffect(() => {
    updateAnswersOfQuestion()
    }, [])

    const updateAnswersOfQuestion = () => {
        axios.get('http://localhost:8080/evento/pregunta/respuesta/list?idPregunta='+ questionID, { 
            headers: {
                'Content-Type': 'application/json', 
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(res => {
          setAnswerList(res.data);
        })    
    }


       //Table's header
   const renderTableHeader = () => {
        let header = Object.keys(answerList[0])
        let value = header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
        })
        return value
    }

    //Table's Data
    const renderTableData = () => {
        return answerList.map((answer, index) => {
        const { id, contenido, fecha } = answer //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{contenido}</td>
                    <td>{fecha}</td>
                </tr>
            )
        })
    }

    //Create Event Button
    const renderCreateAnswerButton = () => {
        if (moderador === 1){
            return   <button type="button" className="btn" onClick={createAnswer}>
                        Crear nueva respuesta
                    </button>
        }else{
            return <div></div>
        }
    }

    const createAnswer = () => {
        setCreateAnswerToQuestion(true);
    }

    const cancelAction = () => {
        setCreateAnswerToQuestion(false);
    }

    const createAnswerSuccess = (type) => {
        cancelAction()
        updateAnswersOfQuestion()
        alert("Respuesta creada correctamente")
    }

    if (answerList.length === 0){
        return (    
            <div>
                <div className="navigationBar">
                    <button className="navButton navBackButton"><b>Atrás</b></button>
                </div>
                <h1 id='title'>Pregunta: {questionContenido}</h1>
            </div>
        )
    }else if (createAnswerToQuestion){
        return(
            <CreateAnswerToQuestion cancelAction={cancelAction} createSuccessAction={createAnswerSuccess} contenidoPregunta={questionContenido} eventID={eventID} preguntaID={questionID} eventName={eventName} username={username}/>
        )
    }
    else{
        return (
            <div>
                <div className="navigationBar">
                    <button className="navButton navBackButton"><b>Atrás</b></button>
                </div>
                <h1 id='title'>Pregunta: {questionContenido}</h1>
                {renderCreateAnswerButton()}
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