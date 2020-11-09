import './App.scss';
import React from "react";
import { Redirect } from 'react-router-dom';
import Login from "./components/login/login";
import Register from "./components/login/register";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLogginActive: true,
      login: false,
      username: "",
      moderador: 0
    }
  }

  componentDidMount() {
    //Set right as default
    this.rightSide.classList.add("right");
  }

  //Change view between Login and Register
  changeState(){
    const {isLogginActive} = this.state;
    if(isLogginActive){
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    }else{
      this.rightSide.classList.add("right");
      this.rightSide.classList.remove("left");
    }

    this.setState(prevState => ({isLogginActive: !prevState.isLogginActive}))
  }

  //save username and type of user to send with Redirect
  handleOnClick(username, moderador){
    this.setState(prevState => ({login: !prevState.login, username: username, moderador: moderador}))
  }

  render(){
    const {isLogginActive} = this.state;
    const current = isLogginActive ? "Registro" : "Iniciar Sesión";
    if (this.state.login){
      return <Redirect to={{
              pathname: '/eventList',
              state: { username: this.state.username, moderador: this.state.moderador }
              }}/>
    }else{
      return (
        <div className="App">
          <div className="login">
            <div className="container">
              {isLogginActive && <Login containerRef = {(ref) => this.current = ref} onClick = {this.handleOnClick.bind(this)}/>}
              {!isLogginActive && <Register containerRef = {(ref) => this.current = ref} onClick = {this.handleOnClick.bind(this)}/>}
            </div>
            <RightSide current={current} 
                containerRef={ref => this.rightSide = ref} 
                onClick = {this.changeState.bind(this)}
              />
          </div>
        </div>
      );
    }
  }
}

const RightSide = props => {
  return <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
    <div className="inner-container">
      <div className="text">
          {props.current}
      </div>
    </div>
  </div>
}

export default App;
