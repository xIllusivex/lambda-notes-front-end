import React, { Component } from 'react';
import classes from './styles.css';

class ColorWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return(
      <div
        className={classes.Container}
        onClick={ this.props.handleColorWheel }
      >
        <div className={classes.Container__ColorWheel}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}>

          <span className={classes.Container__HeaderText}>Color Wheel</span>

          <div className={classes.Container__InnerContainer}>

            <div className={classes.Container__ColorContainer}><span className={`${classes.color} ${classes.cdb9b5e}`} onClick={() => {this.props.handleColorWheel('#fff'); this.props.handleUpdate(this.props.id, {background:'#fff'})}}></span></div>
            <div className={classes.Container__ColorContainer}><span className={`${classes.color} ${classes.cc8b148}`} onClick={() => {this.props.handleColorWheel('#FFB365'); this.props.handleUpdate(this.props.id, {background:'#FFB365'})}}></span></div>
            <div className={classes.Container__ColorContainer}><span className={`${classes.color} ${classes.c8ab34b}`} onClick={() => {this.props.handleColorWheel('#94E1A5'); this.props.handleUpdate(this.props.id, {background:'#94E1A5'})}}></span></div>
            <div className={classes.Container__ColorContainer}><span className={`${classes.color} ${classes.c51b5a3}`} onClick={() => {this.props.handleColorWheel('#5BAFA6'); this.props.handleUpdate(this.props.id, {background:'#5BAFA6'})}}></span></div>
            <div className={classes.Container__ColorContainer}><span className={`${classes.color} ${classes.c4e7d8d}`} onClick={() => {this.props.handleColorWheel('#8CC2D1'); this.props.handleUpdate(this.props.id, {background:'#8CC2D1'})}}></span></div>
            <div className={classes.Container__ColorContainer}><span className={`${classes.color} ${classes.c5c6182}`} onClick={() => {this.props.handleColorWheel('#7094CC'); this.props.handleUpdate(this.props.id, {background:'#7094CC'})}}></span></div>
            <div className={classes.Container__ColorContainer}><span className={`${classes.color} ${classes.c926174}`} onClick={() => {this.props.handleColorWheel('#AC96D8'); this.props.handleUpdate(this.props.id, {background:'#AC96D8'})}}></span></div>
            <div className={classes.Container__ColorContainer}><span className={`${classes.color} ${classes.cc44646}`} onClick={() => {this.props.handleColorWheel('#FE8689'); this.props.handleUpdate(this.props.id, {background:'#FE8689'})}}></span></div>

          </div>

        </div>
      </div>
    )
  }
}

export default ColorWheel;
