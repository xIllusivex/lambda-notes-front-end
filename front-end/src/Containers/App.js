import React, { Component } from 'react';
import classes from './App.css';
import {Nav} from '../Components/Nav';
import {Route, Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {SideBar} from '../Components/SideBar';
import {CreateNoteInput} from '../Components/CreateNoteInput';

class App extends Component {
  constructor() {
    super();
    this.state = {
      menu: false,
    };
  }
  handleState = () => {
    this.setState({menu: !this.state.menu});
  }
  render() {
    return (
      <div className={classes.Container}>
        <Nav handleState={this.handleState}/>
        <div className={classes.Container__ContentContainer}>
          {this.state.menu ? <SideBar/> : null}
          <div className={classes.Container__NotesContainer}>
            <CreateNoteInput/>
            <div className={`fa-3x ${classes.Container__SpinnerContainer}`}>
              <i className={`fas fa-cog fa-spin ${classes.Container__SpinnerIcon}`}></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
