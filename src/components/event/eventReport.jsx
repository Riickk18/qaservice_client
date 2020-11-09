import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';

export default function EventReport({location}) {

    //Variables
    let history = useHistory();
    var acceptedPerc = 0;
    var deniedPerc = 0;
    var waitingPerc = 0; 
    const username = location.state.username;
    const moderador = location.state.moderador;
    const eventID = location.state.eventID;
    const eventName = location.state.eventName;
    const [questionList, setQuestionList] = useState([])
    const [valuesPie, setValuesPie] = useState({})
    
    //ComponentDidMount 
   useEffect(() => {
    updateAnswersOfQuestion()
    }, [])

    const updateAnswersOfQuestion = () => {
        axios.get('http://localhost:8080/evento/report?idEvento='+ eventID, { 
            headers: {
                'Content-Type': 'application/json', 
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(res => {
            setValuesPie(res.data.values)
            setQuestionList(res.data.preguntas);
        })    
    }


    const updateValues = () => {
        var sum = valuesPie.aceptadas + valuesPie.denegadas + valuesPie.nulas
        acceptedPerc = (valuesPie.aceptadas * 100) / sum
        deniedPerc = (valuesPie.denegadas * 100) / sum
        waitingPerc = (valuesPie.nulas * 100) / sum
        return [acceptedPerc, deniedPerc, waitingPerc]
    }
       //Table's header
   const renderTableHeader = () => {
        let header = Object.keys(questionList[0])
        let value = header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
        })
        return value
    }

    //Table's Data
    const renderTableData = () => {
        return questionList.map((question, index) => {
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

    const backAction = () =>{
        history.goBack()
       }

    if (questionList.length === 0){
        return (    
            <div>
                <div className="navigationBar">
                    <button className="navButton navBackButton" onClick={backAction}><b>Atrás</b></button>
                </div>
                <h1 id='title'>Reporte de evento: {eventName}</h1>
            </div>
        )
    }else{
        const values = updateValues()
        return (
            <div>
                <div className="navigationBar">
                    <button className="navButton navBackButton" onClick={backAction}><b>Atrás</b></button>
                </div>
                <h1 id='title'>Reporte de evento: {eventName}</h1>
                <div className="pieContainer">
                <PieChart className="pieElement"   animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            center={[50, 50]}
                            lengthAngle={360}
                            lineWidth={60}
                            paddingAngle={0}
                            startAngle={0}
                            viewBoxSize={[100, 100]}
                            label={(data) => data.dataEntry.title}
                            labelPosition={65}
                            labelStyle={{
                                fontSize: "3px",
                                fontColor: "FFFFFA",
                                fontWeight: "800",
                            }}
                            data={[
                                { title: "Aceptada "+values[0].toFixed(2)+"%", value: values[0], color: '#32a86d' },
                                { title: "Denegada "+values[1].toFixed(2)+"%", value: values[1], color: '#a6000e' },
                                { title: "En Espera "+values[2].toFixed(2)+"%", value: values[2], color: '#ababab' },
                            ]}
                />
                </div>
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