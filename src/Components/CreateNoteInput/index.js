import React, {Component} from 'react';
import classes from './styles.css';


export class CreateNoteInput extends Component{
  constructor(props){
    super(props);
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
    let spaceInput = {};
    let isActive = {
      display: 'none'
    };
    let displayIcons = {
      display: 'none'
    };
    if (this.state.inputActive === true) {
      isActive.display = 'flex';
      isActive.marginBottom = '2rem';
      displayIcons.display = 'flex';
      spaceInput.marginBottom = '1rem';
    };
    return (
      <div className={classes.Container}>
        <input
          placeholder='Title'
          className={classes.Container__Font_Bold + " " + classes.Container__Input}
          style={ isActive }
          name='title'
          value={this.state.title}
          onChange={this.handleState}
        />
        <div className={classes.Container__InputContainer} >
          <input
            placeholder='Take a note...'
            className={classes.Container__Input}
            name='content'
            value={this.state.content}
            onChange={this.handleState}
            onClick={() => {this.setState({inputActive: true})}}
            style={spaceInput}
          />
        </div>
        <div className={classes.Container__IconsContainer} style={displayIcons}>
          <button className={classes.Container__ImgButton}>
            <i className={`fas fa-file-image ${classes.Container__ImageIcon}`}></i>
          </button>
          <button className={classes.Container__ImgButton + " " + classes.Container__Margin_Right }>
            <i className="fas fa-paint-brush"></i>
          </button>
          <div className={classes.Container__ActionButtonContainer}>
            <button className={classes.Container__ActionButton} onClick={() => {
              this.props.handleSubmit(this.state.title, this.state.content);
              this.setState({inputActive: false, title: '', content: ''});
            }}>Send</button>
            <button className={classes.Container__ActionButton} onClick={() => this.setState({inputActive: false, title: '', content: ''})}>Close</button>
          </div>
        </div>
      </div>
    )
  }
}
