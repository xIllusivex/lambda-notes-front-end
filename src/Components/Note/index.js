import React, {Component} from 'react';
import classes from './styles.css';
import ColorWheel from '../ColorWheel/';

export class Note extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      showIcons: false,
      colorWheel: false,
      title: this.props.note.title,
      content: this.props.note.content,
      backgroundColor: this.props.note.background,
      image: this.props.note.image,
    };
  }
  handleColorWheel = (color) => {
    if (color !== undefined) {
      this.setState({ backgroundColor: color, colorWheel: !this.state.colorWheel });
    } else {
      this.setState({ colorWheel: !this.state.colorWheel });
    }
  }
  changeVal = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  parseMarkDown = (e) => {
    let str = e.split('');

    for (let i=0; i < str.length; i++) {
      if (str[i] === '#') {
        const subStr = str.slice(i, str.indexOf('\n', i) !== -1 ? str.indexOf('\n', i) : str.length).join('');
        str.splice(i, subStr.length, subStr.replace(/(\#+)([\w\W]+)/i, (match, p1, p2, offset, string) => {
          return `<h${p1.length <=6 ? p1.length : 6}>${p2}</h${p1.length <=6 ? p1.length : 6}>`;
        }));
        i = str.indexOf('\n', i) !== -1 ? str.indexOf('\n', i) : str.length;
      }
      else if (str[i] === '>') {
        const subStr = str.slice(i, str.indexOf('\n', i) !== -1 ? str.indexOf('\n', i) : str.length).join('');

        str.splice(i, subStr.length, subStr.replace(/\>([\w\W]+)/i, (match, p1, offset, string) => {
          return `<p class='Container__Blockquote'>${p1}</p>`;
        }));

        i = str.indexOf('\n', i) !== -1 ? str.indexOf('\n', i) : str.length;
      }
      // i need to treat inline code differently. this method does not work.
      else if (str[i] === '[') {
        const subStr = str.slice(i, str.indexOf('\n', i) !== -1 ? str.indexOf('\n', i) : str.length).join('');

        str.splice(i, subStr.length, subStr.replace(/\[([\w\W]+)\]\(([\w\W]+)\)/i, (match, p1, p2, offset, string) => {
          return `<a href='${p2}' class='pointer' target='_blank'>${p1}</a>`;
        }));
        i = str.indexOf('\n', i) !== -1 ? str.indexOf('\n', i) - 1 : str.length;
      }
      // check for a code block.
      else if (str[i] === '`') {
        const subStr = str.slice(i, str.indexOf('`', i + 3) !== -1 ? str.indexOf('`', i + 3) + 3: str.length).join('');
        str.splice(i, subStr.length + 1, subStr.replace(/^(```)([\w\W]+)(```)$/i, (match, p1, p2, p3, offset, string) => {
          p2 = p2.replace(/\</g, '&lt;');
          p2 = p2.replace(/\>/g, '&gt;');
          p2 = p2[0] !== '\n' ? p2.replace(/\n/g, '<br/>') : p2.slice(1,).replace(/\n/g, '<br/>');
          if (p1.length === 3) {
            return `<p class='Container__Codeblock'>${p2}</p>`;
          } else {
            // call a function that will parse the back tick as an inline element.
          }
        }));
      }
      else if (str[i] === '!') {
        const subStr = str.slice(i, str.indexOf(')', i) !== -1 ? str.indexOf(')', i) + 1: str.length).join('');
        str.splice(i, subStr.length, subStr.replace(/\!\[([\w\W]+)\]\((https:\/\/[\w\/\.\-]+\.(?:png|jpe?g|svg))\)/i, (match, p1, p2, p3, offset, string) => {
          return `<img src='${p2}' alt='${p1 !== undefined ? p1 : ''}'/>`;
        }));
        i = str.indexOf('\n', i) !== -1 ? str.indexOf('\n', i) - 1 : str.length;
      }
      else if (str[i] === '\n') {
        str[i] = '<br/>';
      }
      else {
        const subStr = str.slice(i, str.indexOf('\n', i) !== -1 ? str.indexOf('\n', i) : str.length).join('');
        str.splice(i, subStr.length, subStr.replace(/([\w\W]+)/i, (match, p1, offset, string) => {
          return `<p>${p1}</p>`;
        }));
        i = str.indexOf('\n', i) !== -1 ? str.indexOf('\n', i) : str.length;
      }
    }
    return str.join('');
  }
  render(){
    let icons = null;
    let styles = {
      visibility: 'visible',
      background: this.state.backgroundColor,
    }
    if (this.props.note.display !== undefined &&!this.props.note.display) {
      styles['display'] = 'none';
    }
    const image = this.props.note.image !== undefined || this.props.note.image !== '' ? this.props.note.image.name : null;
    let imgStyles = {
      height: this.props.listView && !this.state.modal ? 'auto' : '20rem',
      width: this.props.listView && !this.state.modal ? '24rem' : 'auto',
      backgroundColor: this.state.backgroundColor,
      backgroundImage: `url(https://afternoon-citadel-23531.herokuapp.com/api/media/images/${image})`,
      backgroundSize: this.state.modal ? 'auto' : 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
    let modalStyles = { border: this.state.backgroundColor === '#fff' || this.props.note.image !== '' ? '0px' : `2px solid ${this.state.backgroundColor}`, }
    let modal = null;
    if (this.state.modal === true) {
      styles.visibility = 'hidden';
      modal = (
        <div className={ classes.Container__Modal }>
          <div style={ modalStyles } className={ classes.Container__ContentContainer }>
            { this.props.note.image === '' ? null : (
              <div style={ imgStyles }>
                <div className={classes.Container__ModalButtonContainer}>
                  <div className={classes.Container__ModalIconContainer + " " + classes.Container__Margin_Right}
                    onClick={() => {
                      this.props.handleImageDelete(this.props.note._id);
                      this.setState({ modal: false }, () => {
                        this.forceUpdate();
                      });
                  }}>
                    <i className={"fas fa-minus " + classes.Container__ModalIcon}></i>
                  </div>
                </div>
              </div>
            )}
            {this.props.note.image === '' ? <div className={classes.Container__ModalButtonContainer}>
              <div className={classes.Container__ModalIconContainer + " " + classes.Container__Margin_Right}
                onClick={() => {
                  this.setState({ modal: false });
                  this.props.toggleModal(this.props.note);
              }}>
                <i className={"fas fa-plus " + classes.Container__ModalIcon}></i>
              </div>
            </div> : null }
            <input
              name='title'
              placeholder='Title'
              value={ this.state.title }
              className={ classes.Container__ModalInput + " " + classes.Container__Font_Bold }
              onChange={ this.changeVal }
            />
            <textarea
              name='content'
              placeholder='Take a note...'
              value={ this.state.content }
              className={ classes.Container__ModalInput }
              onChange={ this.changeVal }
            />
            <div className={classes.Container__ModalButtonContainer}>
              <div className={classes.Container__ModalIconContainer + " " + classes.Container__Margin_Right + " " + classes.Container__Border} onClick={() => {
                this.props.handleDelete(this.props.note._id);
                this.setState({ modal: false });
              }}>
                <i className={`fas fa-trash-alt ${classes.Container__ModalIcon}`}></i>
              </div>
              <button className={classes.Container__ModalButton} onClick={() => {
                if (this.state.title !== this.props.note.title || this.state.content !== this.props.note.content) {
                  const update = {title: this.state.title, content: this.state.content};
                  this.props.handleUpdate(this.props.note._id, update);
                }
                this.setState({ modal: false })
              }}>Close</button>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.showIcons === true) {
      icons = (
        <div className={classes.Container__IconsContainer} onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}>
          <div
            className={classes.Container__IconContainer}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              this.handleColorWheel();
          }}>
            <i className={"fas fa-paint-brush " + classes.Container__NoteIcon}></i>
          </div>
          <div
            className={classes.Container__IconContainer}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              this.props.toggleModal(this.props.note);
          }}>
            <i className={"fas fa-image " + classes.Container__NoteIcon}></i>
          </div>
        </div>
      )
    }
    let noteContent = null;
    if (!this.props.listView) {
      noteContent = (
        <React.Fragment>
          { this.props.note.image === '' ? null : <div style={ imgStyles }></div> }
          { this.props.note.title.length > 0 ? <h3 className={classes.Container__Header}>{this.props.note.title}</h3> : null }
          { this.props.note.content.length > 0 ? <div  dangerouslySetInnerHTML={{ __html: this.props.note.content.length > 100 ? this.parseMarkDown(this.props.note.content) : this.parseMarkDown(this.props.note.content)  }} className={classes.Container__Text}></div> : null }
          { icons }
        </React.Fragment>
      )
    } else {
      noteContent = (
        <React.Fragment>
          { this.props.note.image === '' ? null : <div style={ imgStyles }></div> }
          <div className={classes.ListViewContentContainer}>
            { this.props.note.title.length > 0 ? <h3 className={classes.Container__Header}>{this.props.note.title}</h3> : null }
            { this.props.note.content.length > 0 ? <div style={{ maxHeight: '130px' }} dangerouslySetInnerHTML={{ __html: this.props.note.content.length > 100 ? this.parseMarkDown(this.props.note.content) : this.parseMarkDown(this.props.note.content)  }} className={classes.Container__Text}></div> : null }
            { icons }
          </div>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <div className={ this.props.listView ? classes.ListContainer  : classes.Container } style={styles} onClick={(e) => {
            if (e.target.nodeName !== "A") {
              this.setState({modal: true});
            }
        }} onMouseOver={() => {
          this.setState({showIcons: true});
        }} onMouseLeave={() => {
          this.setState({showIcons:false});
        }}>
          { noteContent }
        </div>
        { this.state.colorWheel ? <ColorWheel id={ this.props.note._id } handleColorWheel={ this.handleColorWheel } handleUpdate={ this.props.handleUpdate }/> : null }
        { modal }
      </React.Fragment>
    )
  }
}
