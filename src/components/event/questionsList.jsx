import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./style.scss";
import CreateQuestionToEvent from "./createQuestionToAnswer";
import CreateAnswerToQuestion from "./createAnswerToQuestion";
import { Redirect, useHistory } from 'react-router-dom';

export default function QuestionsList({location}) {
    //Variables
    let history = useHistory();
   const username = location.state.username;
   const moderador = location.state.moderador;
   const eventName = location.state.eventName;
   const eventID = location.state.eventID;
   const [createQuestion, setCreateQuestion] = useState(false);
   const [createAnswerToQuestion, setCreateAnswerToQuestion] = useState(false);
   const [quetionSelected, setQuestionSelected] = useState(0);
   const [questionSelectedText, setQuestionSelectedText] = useState("");
   const [questions, setQuestions] = useState([]);
   const [showAnswers, setShowAnswers] = useState(false);

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
         idEvento: eventID,
         moderador: moderador
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
          const { id, contenido, fecha, estatus } = question
          var estatusValue = estatus === null ? "En espera" : (estatus === 0 ? "Denegada" : "Aprobada");
          return (
             <tr key={id}>
                <td>{id}</td>
                <td>{contenido}</td>
                <td>{fecha}</td>
                <td><i>{estatusValue}</i></td>
                <td>
                    {actionsButtons(estatus, contenido, id)}
                </td>
            </tr>
         )
      })
   }

    //Create Event Button
    const renderCreateQuestionButton = () => {
        if (moderador === 0){
           return   <button type="button" className="btn btn-Space" onClick={createQuestionClick}>
                       Crear Pregunta
                    </button>
        }else{
           return <div></div>
        }
    }

   const actionsButtons = (estatusValue, contenido, idQuestion) => {
    if (estatusValue === null){
        return(
            <div>
                <button type="button" className="btn btn-Space" onClick={() => acceptQuestionAction(idQuestion)}>
                     Aceptar
                 </button>
                 <button type="button" className="btn btn-Cancel btn-Space" onClick={() => deniedQuestionAction(idQuestion)}>
                     Denegar
                 </button>
            </div>
        )
    }else if (estatusValue){
        return(
            <button type="button" className="btn btn-Accept" onClick={() => showAnswersOfQuestion(idQuestion, contenido)}>
                Respuestas
            </button>
        )
    }else{
        return(
            <div>
            </div>
        )
    }
   }

   const createQuestionClick = () => {
        setCreateQuestion(true);
    }

    const cancelAction = () => {
        setCreateQuestion(false);
        setShowAnswers(false);
        setCreateAnswerToQuestion(false);
        setQuestionSelectedText("");
        setQuestionSelected(0);
    }

    const createQuestionSuccess = (type) => {
        cancelAction()
        updateQuestionsOfEvent()
        if (type === "answer"){
            alert("Respuesta creada correctamente")
        }else if (type === "question"){
            alert("Su pregunta ha sido creada de forma exitosa y se encuentra en revisión. Cuando la misma sea aprobada, aparecerá en esta lista.")
        }
    }

   const acceptQuestionAction = (id) => {
       var element = questions.find(element => element.id === id)
        setQuestionSelected(id);
        setQuestionSelectedText(element.contenido)
        setCreateAnswerToQuestion(true);
   }

   const deniedQuestionAction = (id) => {
    axios.post('http://localhost:8080/evento/pregunta/list/denied', { 
        headers: {
            'Content-Type': 'application/json', 
            "Access-Control-Allow-Origin": "*"
        },
        idPregunta: id
    }).then(res => {
        updateQuestionsOfEvent()
    })
   }

   const showAnswersOfQuestion = (id, contenido) => {
    console.log(id)
    setQuestionSelected(id);
    setQuestionSelectedText(contenido)
    setShowAnswers(true);
   }

   const backAction = () =>{
    history.goBack()
   }

    if (showAnswers){
        return (<Redirect push to={{
            pathname: '/event/answer/answersList',
            state: { username: username, moderador: moderador, eventID: eventID, eventName: eventName, questionID: quetionSelected, questionContenido: questionSelectedText }
            }} />)
    }else if (createQuestion){
        return (
            <CreateQuestionToEvent cancelAction={cancelAction} createSuccessAction={createQuestionSuccess} eventID={eventID} eventName={eventName} username={username}/>
        )
    }else if (createAnswerToQuestion){
        return(
            <CreateAnswerToQuestion cancelAction={cancelAction} createSuccessAction={createQuestionSuccess} contenidoPregunta={questionSelectedText} eventID={eventID} preguntaID={quetionSelected} eventName={eventName} username={username}/>
        )
    }else if (questions.length === 0){
        return (  
            <div>
                <div className="navigationBar">
                    <button className="navButton navBackButton" onClick={backAction}><b>Atrás</b></button>
                </div>
                <h1 id='title'>Lista de Preguntas del evento: {eventName}</h1>
                {renderCreateQuestionButton()}
            </div>          
        )
    }else{
        return (
            <div>
                <div className="navigationBar">
                    <button className="navButton navBackButton" onClick={backAction}><b>Atrás</b></button>
                </div>
                <h1 id='title'>Lista de Preguntas del evento: {eventName}</h1>
                {renderCreateQuestionButton()}
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