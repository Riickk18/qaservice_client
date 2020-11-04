import './App.scss';
import React from "react";
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from "./components/login/login";
import { Register } from "./components/login/index";
import {EventList} from "./components/event/index";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLogginActive: true,
      login: false
    }
    // this.handleOnClick.bind(this);
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

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

  handleOnClick(){
    console.log("imprimiendo en el padre")
    this.setState(prevState => ({login: !prevState.login}))
    // return <Redirect from="/" to="/eventList"></Redirect>
  }

  render(){
    const {isLogginActive} = this.state;
    const current = isLogginActive ? "Registro" : "Iniciar Sesión";
    // const currentActive = isLogginActive ? "login" : "register";
    if (this.state.login){
      return <Redirect to='/eventList'/>
    }else{
      return (
        <div className="App">
          <div className="login">
            <div className="container">
              {isLogginActive && <Login containerRef = {(ref) => this.current = ref} onClick = {this.handleOnClick.bind(this)}/>}
              {!isLogginActive && <Register containerRef = {(ref) => this.current = ref}/>}
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
