import React, { Component } from 'react';
import axios from 'axios';
import classes from './App.css';
import { Nav } from '../Components/Nav';
import { Note } from '../Components/Note';
// import {Route, Link, Redirect} from 'react-router-dom';
import { SideBar } from '../Components/SideBar';
import { CreateNoteInput } from '../Components/CreateNoteInput';
import Modal from '../Components/dragDrop/';



class App extends Component {
  constructor() {
    super();
    this.state = {
      image_Modal:false,
      menu: false,
      notes: [],
      note: null,
    };
  }
  toggleModal = (note) => {
    if (!this.state.image_Modal) {
      this.setState({image_Modal: !this.state.image_Modal, note: note});
    } else {
      this.setState({image_Modal: !this.state.image_Modal});
    }
  }
  submitFile = (image) => {
    const { notes } = this.state;
    notes.map((n) => {
      if (n === this.state.note) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          const base64data = reader.result;
          axios.put(`https://afternoon-citadel-23531.herokuapp.com/api/media/images/${n._id}`, { "image": base64data })
          .then(r => {
            n.image = {name: r.data.image.name};
            this.setState({ image_Modal: !this.state.image_Modal, notes: notes });
          })
          .catch(err => {
            console.log(err);
          })
        }
      }
    });
  }
  // GET's all notes from the server
  componentDidMount() {
    axios.get('https://afternoon-citadel-23531.herokuapp.com/api/notes')
      .then(response => {
        this.setState({ notes: response.data });
      })
  }
  filterNotes = (value) => {
    const regexp = new RegExp(value, 'i');
    const {notes} = this.state;
    notes.map((n) => {
      if (regexp.test(n.title)){
        n['display'] = true;
      } else n['display'] = false;
    })
    this.setState({ notes: notes });
  }
  // sends a put request to the server to update the values in a note.
  handleUpdate = (id, update) => {
    axios.put(`https://afternoon-citadel-23531.herokuapp.com/api/notes/${id}`, update)
      .then(r => {
        let { notes } = this.state;
        notes.map((note) => {
          if(note._id === r.data._id){
            note.title = r.data.title;
            note.content = r.data.content;
            note.background = r.data.background;
            return note
          }
          return note
        })
        this.setState( {notes: notes} );
      })
  }
  // sends a delete request on a note.
  handleDelete = (id) => {
    axios.delete(`https://afternoon-citadel-23531.herokuapp.com/api/notes/${id}`)
    .then(r => {
      this.setState({ notes: r.data });
    })
  }
  // submits a new note
  handleSubmit = (title, content) => {
    let newNote = {}
    if (title !== '') {
      newNote.title = title;
    }
    if (content !== '') {
      newNote.content = content;
    }
    if(newNote.title !== undefined && newNote.content !== undefined){
      axios.post('https://afternoon-citadel-23531.herokuapp.com/api/notes', newNote)
        .then(r => {
          const { notes } = this.state;
          notes.push(r.data);
          this.setState({ notes: notes });
        })
    } else { console.log('you need to either have a title or body filled out') };
  }
  // changes the value of the menu field. depending on wether they need it to be rendered or not
  handleState = () => {
    this.setState({menu: !this.state.menu});
  }

  render() {
    let modal = null;
    if (this.state.image_Modal) {
      modal = <Modal toggleModal={ this.toggleModal } submitFile={ this.submitFile }/>;
    }
    let notes = (
      <div key={'12345678090'} className={`fa-3x ${classes.Container__SpinnerContainer}`}>
        <i className={`fas fa-cog fa-spin ${classes.Container__SpinnerIcon}`}></i>
      </div>
    )
    if (this.state.notes.length > 0) {
      const columns = window.innerWidth >= 993  ? 4 : window.innerWidth <= 992 && window.innerWidth >= 769 ? 3 : window.innerWidth <= 768 && window.innerWidth > 500 ? 2 : window.innerWidth <= 500 ? 1 : 4;
      const notesLen = this.state.notes.length; // the length of the notes array.
      const avg = ~~(notesLen / columns); // the floored avg of the length of the notes arr divided by four.
      let r = (notesLen / columns) % 1 * columns; // remainder of the length of the notes array divided by four.
      let j = 0; // the iterator to properly slice the notes array.
      notes = (
        <div className={classes.Container__NotesContainer}>
          {
            [...Array(columns).keys()].map((i) => {
              let max = r > 0 ? avg + 1 + j : avg + j;
              if (r > 0) r--;
              return (
                <div key={`NotesCol${i}`} className={classes.Container__NotesCol}>
                  { this.state.notes.slice(j, max).map( (n, i) => {
                    j += 1;
                    return <Note key={ "note" + j } note={ n } handleUpdate={ this.handleUpdate } handleDelete={ this.handleDelete } toggleModal={ this.toggleModal }/>
                  })}
                </div>
              )
            })
          }
        </div>
      )
    }
    return (
      <div className={classes.Container}>
        { modal }
        <Nav handleState={this.handleState} filterNotes={ this.filterNotes }/>
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
