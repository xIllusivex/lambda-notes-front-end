import React from 'react';
import classes from './styles.css';


export const Nav = (props) => {
  return (
    <div className={classes.Container}>
      <button className={classes.Container__MenuButton} onClick={props.handleState}>
        <i className={`fas fa-bars ${classes.Container__MenuIcon}`}></i>
      </button>
      <h2 className={classes.Container__Header} onMouseDown={(e) => e.target.childNodes[1].classList.add('Container__Text_Underline')} onMouseUp={(e) => {e.target.childNodes[1].classList.remove('Container__Text_Underline')}}>Lambda <span className={classes.Container__Pointer_None}>Notes</span></h2>
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
        e.target.value='';
      }}>
        <i className={`fas fa-search ${classes.Container__SearchIcon}`}></i>
        <input
          className={classes.Container__SearchInput}
          placeholder='search'
        />
      </div>
      <div className={classes.Container__IconsContainer}>

      </div>
    </div>
  )
}
