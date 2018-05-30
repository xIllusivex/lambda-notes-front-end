import React, {Component} from 'react';
import classes from './styles.css';

export class CreateNoteInput extends Component{
  constructor(){
    super();
    this.state = {
      title: '',
      content: '',
      inputActive: false,
    };
  }
  handleState = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  render(){
    let isActive = {
      display: 'none'
    }
    let dspImg = {
      display: 'inline'
    }
    let displayIcons = {
      display: 'none'
    }
    if (this.state.inputActive === true) {
      isActive.display = 'inline';
      dspImg.display = 'none';
      displayIcons.display = 'flex'
    }
    return (
      <div className={classes.Container}>
        <input
          placeholder='title'
          className={classes.Container__Font_Bold + " " + classes.Container__Input}
          style={isActive}
          name='title'
          value={this.state.title}
          onChange={this.handleState}
        />
        <div className={classes.Container__InputContainer} onClick={() => {this.setState({inputActive: true})}} >
          <input
            placeholder='Take a note...'
            className={classes.Container__Input}
            name='content'
            value={this.state.content}
            onChange={this.handleState}
          />
          <button className={classes.Container__ImgButton} style={dspImg}>
            <i className={`fas fa-file-image ${classes.Container__ImageIcon}`}></i>
          </button>
        </div>
        <div className={classes.Container__IconsContainer} style={displayIcons}>
          <button className={classes.Container__ImgButton}>
            <i className={`fas fa-file-image ${classes.Container__ImageIcon}`}></i>
          </button>
          <button className={classes.Container__ImgButton + " " + classes.Container__Margin_Right }>
            <i className="fas fa-paint-brush"></i>
          </button>
          <div className={classes.Container__ActionButtonContainer}>
            <button className={classes.Container__ActionButton}>Send</button>
            <button className={classes.Container__ActionButton} onClick={() => this.setState({inputActive: false, title: '', content: ''})}>Exit</button>
          </div>
        </div>
      </div>
    )
  }
}
