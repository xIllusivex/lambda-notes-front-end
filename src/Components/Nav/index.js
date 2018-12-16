import React, { Component } from 'react';
import classes from './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh } from '@fortawesome/fontawesome-free-solid';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideHeader: false,
    };
  }
  handleScroll = () => {
    if (window.scrollY === 0) {
      this.setState({ hideHeader: false });
    } else {
      if (!this.state.hideHeader) {
        this.setState({ hideHeader: true });
      }
    }
  }
  componentDidMount() {
    if (window.innerWidth <= 500) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }
  render(){
    return (
      <div className={`${classes.Container} ${this.state.hideHeader ? 'Hide' : ''}`}>
        { window.innerWidth > 500 ?
          <button className={classes.Container__MenuButton} onClick={this.props.handleState}>
            <i className={`fas fa-bars ${classes.Container__MenuIcon}`}></i>
          </button>
         : null}
        <h2 className={classes.Container__Header} onMouseDown={(e) => e.target.childNodes[1].classList.add('Container__Text_Underline')} onMouseUp={(e) => {e.target.childNodes[1].classList.remove('Container__Text_Underline')}}>
          Lambda&nbsp;
          <span className={classes.Container__Pointer_None}>Notes</span>
        </h2>
        <div className={classes.Container__InputContainer} onFocus={(e) => {
          if (e.target.nodeName === 'INPUT') {
            e.target.parentNode.classList.add('Container__Focus_White', 'Container__Color_Black');
            e.target.classList.add('Container__Color_Black');
          }
          else {
            e.target.classList.add('Container__Focus_White');
          }
        }} onBlur={(e) => {
          e.target.classList.remove('Container__Color_Black');
          e.target.parentNode.classList.remove('Container__Focus_White', 'Container__Color_Black');
        }}>
          <i className={`fas fa-search ${classes.Container__SearchIcon}`}></i>
          <input
            className={classes.Container__SearchInput}
            placeholder='Search'
            onChange={(e) => this.props.filterNotes(e.target.value)}
          />
        </div>
        { window.innerWidth > 500 ? <div className={classes.Container__IconsContainer}>
          <div className={classes.Container__IconContainer}
              onClick={() => {
                this.props.handleToggleList();
            }}>
              <FontAwesomeIcon icon={ this.props.listView ? faTh : faList } className={ classes.Container__Icon }/>
            </div>
        </div>: null }
      </div>
    )
  }
}
export default Nav;
