import React, {Component} from 'react';
import classes from './styles.css';

export class Note extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      showIcons: false,
      showColorTool: false,
      enterTool: false,
      title: this.props.note.title,
      content: this.props.note.content,
      backgroundColor: this.props.note.background,
    };
  }
  changeVal = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  render(){
    let icons = null;
    let styles = {
      visibility: 'visible',
      background: this.state.backgroundColor,
    }
    let toolTip = null;
    let modal = null;
    if (this.state.modal === true) {
      styles.visibility = 'hidden';
      modal = (
        <div className={classes.Container__Modal}>
          <div className={classes.Container__ContentContainer}>
            <input
              name='title'
              placeholder='Title'
              value={this.state.title}
              className={classes.Container__ModalInput + " " + classes.Container__Font_Bold }
              onChange={this.changeVal}
            />
            <textarea
              name='content'
              placeholder='Take a note...'
              value={ this.state.content }
              className={ classes.Container__ModalInput }
              onChange={ this.changeVal }
            />
            <div className={classes.Container__ModalButtonContainer}>
              <div className={classes.Container__ModalIconContainer + " " + classes.Container__Margin_Right} onClick={() => {
                this.props.handleDelete(this.props.note._id);
                this.setState({modal: false});
              }}>
                <i className={"fas fa-trash-alt " + classes.Container__ModalIcon}></i>
              </div>
              <button className={classes.Container__ModalButton} onClick={() => {
                if (this.state.title !== this.props.note.title || this.state.content !== this.props.note.content) {
                  const update = {title: this.state.title, content: this.state.content};
                  this.props.handleUpdate(this.props.note._id, update);
                }
                this.setState({modal: false})
              }}>Close</button>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.showIcons === true) {
      icons = (
        <div className={classes.Container__IconsContainer}>
          <div className={classes.Container__IconContainer} onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }} onMouseOver={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            this.setState({showColorTool: true});
            setTimeout(() => {
              if (this.state.enterTool !== true) {
                this.setState({showColorTool: false});
              }
              }, 1000)
          }}>
            <i className={"fas fa-paint-brush " + classes.Container__NoteIcon}></i>
          </div>
          <div className={classes.Container__IconContainer} onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            console.log("click");
          }}>
            <i className={"fas fa-image " + classes.Container__NoteIcon}></i>
          </div>
        </div>
      )
    }
    if (this.state.showColorTool === true) {
      toolTip = (
        <div className={classes.Container__ToolTip} onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }} onMouseEnter = {() => {
          this.setState({enterTool: true})
        }} onMouseLeave={() => {
          this.setState({showColorTool: false, enterTool: false})
        }}>
          <button className={classes.Container__ToolTip_Color + " " + classes.Container__ToolTip_Blue} onClick={() => {
            this.setState({backgroundColor: 'rgb(161, 202, 202)'});
            this.props.handleUpdate(this.props.note._id, {background: 'rgb(161, 202, 202)'});
          }} ></button>
          <button className={classes.Container__ToolTip_Color + " " + classes.Container__ToolTip_Red} onClick={() => {
            this.setState({backgroundColor: 'rgb(255, 166, 166)'});
            this.props.handleUpdate(this.props.note._id, {background: 'rgb(255, 166, 166)'});
          }}></button>
          <button className={classes.Container__ToolTip_Color + " " + classes.Container__ToolTip_White} onClick={() => {
            this.setState({backgroundColor: 'white'});
            this.props.handleUpdate(this.props.note._id, {background: 'white'});
          }}></button>
          <button className={classes.Container__ToolTip_Color + " " + classes.Container__ToolTip_Green} onClick={() => {
            this.setState({backgroundColor: 'rgb(135, 207, 135)'});
            this.props.handleUpdate(this.props.note._id, {background: 'rgb(135, 207, 135)'});
          }}></button>
        </div>
      )
    }
    return (
      <React.Fragment>
        <div className={classes.Container} style={styles} onClick={() => {
            this.setState({modal: true});
        }} onMouseOver={() => {
          this.setState({showIcons: true});
        }} onMouseLeave={() => {
          this.setState({showIcons:false});
        }}>
          {this.props.note.title.length > 0 ? <h3 className={classes.Container__Header}>{this.props.note.title.length > 19 ? `${this.props.note.title.slice(0, 20).trim()}...`: this.props.note.title}</h3> : null}
          {this.props.note.content.length > 0 ? <p className={classes.Container__Text}>{this.props.note.content.length > 61 ? `${this.props.note.content.slice(0, 62).trim()}...` : this.props.note.content }</p> : null}
          {icons}
          {toolTip}
        </div>
        {modal}
      </React.Fragment>
    )
  }
}
