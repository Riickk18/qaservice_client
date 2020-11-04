import React, { Component } from 'react';

export class EventList extends React.Component {
    constructor(props) {
       super(props)
       this.state = {
          events: [
             { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
             { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
             { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
             { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
          ]
       }
    }
 
    renderTableHeader() {
       let header = Object.keys(this.state.events[0])
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
 
    renderTableData() {
       return this.state.events.map((student, index) => {
          const { id, name, age, email } = student //destructuring
          return (
             <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{email}</td>
             </tr>
          )
       })
    }
 
    render() {
       return (
          <div>
             <h1 id='title'>Lista de Eventos</h1>
             <table id='events'>
                <tbody>
                   <tr>{this.renderTableHeader()}</tr>
                   {this.renderTableData()}
                </tbody>
             </table>
          </div>
       )
    }
 }