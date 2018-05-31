import React, { Component } from 'react';
import axios from 'axios';
import classes from './App.css';
import {Nav} from '../Components/Nav';
import {Note} from '../Components/Note';
import {Route, Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {SideBar} from '../Components/SideBar';
import {CreateNoteInput} from '../Components/CreateNoteInput';

class App extends Component {
  constructor() {
    super();
    this.state = {
      menu: false,
      notes: [],
    };
  }
  componentDidMount() {
    // https://afternoon-citadel-23531.herokuapp.com/api/notes
    axios.get('http://localhost:5000/api/notes')
      .then(response => {
        this.setState({notes: response.data});
      })
  }
  handleUpdate = (id, update) => {
    axios.put(`http://localhost:5000/api/notes/${id}`, update)
      .then(r => {
        let {notes} = this.state;
        notes.map((note) => {
          if(note._id === r.data._id){
            note.title = r.data.title;
            note.content = r.data.content;
            return note
          }
          return note
        })
        this.setState({notes: notes});
      })
  }
  handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
    .then(r => {
      this.setState({notes: r.data});
    })
  }
  handleSubmit = (title, content) => {
    let newNote = {}
    if (title !== '') {
      newNote.title = title;
    }
    if (content !== '') {
      newNote.content = content;
    }
    if(newNote.title !== undefined && newNote.content !== undefined){
      axios.post('http://localhost:5000/api/notes', newNote)
        .then(r => {
          const {notes} = this.state;
          notes.push(r.data);
          this.setState({notes: notes});
        })
    } else {console.log('you need to either have a title or body filled out')};
  }
  handleState = () => {
    this.setState({menu: !this.state.menu});
  }
  render() {
    let notes = (
      <div key={'12345678090'} className={`fa-3x ${classes.Container__SpinnerContainer}`}>
        <i className={`fas fa-cog fa-spin ${classes.Container__SpinnerIcon}`}></i>
      </div>
    )
    if (this.state.notes.length > 0) {
      notes = (
        <div className={classes.Container__NotesContainer}>
          {this.state.notes.map((n, i) => <Note key={n + i} note={n} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete}/>)}
        </div>
      )
    }
    return (
      <div className={classes.Container}>
        <Nav handleState={this.handleState}/>
        <div className={classes.Container__ContentContainer}>
          {this.state.menu ? <SideBar/> : null}
          <div className={classes.Container__InputContainer}>
            <CreateNoteInput handleSubmit={this.handleSubmit}/>
            {notes}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
