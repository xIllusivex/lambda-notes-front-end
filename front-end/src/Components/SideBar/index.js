import classes from './styles.css';
import React from 'react';

export const SideBar = () => {
  return (
    <div className={classes.Container}>
      <h2 className={classes.Container__Header}>Lambda Notes</h2>
      <div className={classes.Container__ButtonContainer}>
        <button className={classes.Container__Button}>Notes</button>
      </div>
      <hr className={classes.Container__Menu_LineBreak}/>
      <h3 className={classes.Container__Header}>Labels</h3>
      <div className={classes.Container__ButtonContainer}>
        <button className={classes.Container__Button}>Create new label</button>
      </div>
      <hr className={classes.Container__Menu_LineBreak}/>
    </div>
  )
}
