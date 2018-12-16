import React, { Component } from "react";
import classes from "./DragDrop.css";
import Boxing from "./Assets/Boxing.svg";
import Weight from "./Assets/Weight.svg";

class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      droppedSuccess: false,
      picture: null
    };
  }

  isAdvancedUpload = () => {
    const div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  };

  triggerUpload = () => {
    const UPLOAD = document.getElementById("button");
    UPLOAD.click();
  };
  handleFiles = () => {
    const INPUT = document.getElementById("button");
    const FILES = INPUT.files;
    for (let i = 0; i < FILES.length; i++) {
      if (FILES[i].type.match(/^image\/(?:jpeg|png|gif)$/)) {
        if (FILES[i].size < 8000000) {
          this.props.submitFile(FILES[i]);
        } else {
          console.log("file is too large");
        }
      } else {
        console.log("file is of wrong type");
      }
    }
  }
  dragOver = e => {
    e.preventDefault();
    e.target.style.background = "white";
  };

  dragLeave = e => {
    e.target.style.background = "";
  };

  garbageCollect = e => {
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      e.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      e.dataTransfer.clearData();
    }
  };

  // possibly modify name of file(s) before sending to server.
  // valid file types jpeg/png
  // file size limit 8000000 bytes
  drop = e => {
    e.preventDefault();
    e.target.style.background = "";
    const FILES = e.dataTransfer.items;
    for (let i = 0; i < FILES.length; i++) {
      if (FILES[i].type.match(/^image\/(?:jpeg|png|gif)$/)) {
        if (FILES[i].getAsFile().size < 8000000) {
          this.props.submitFile(FILES[i].getAsFile());
        } else {
          console.log("file is too large");
        }
      } else {
        console.log("file is of wrong type");
      }
    }
    this.garbageCollect(e);
  };

  render() {
    let isSupported;
    if (this.isAdvancedUpload()) {
      isSupported = (
        <React.Fragment>
          <div
            className={ classes.DragDropContainer__DropArea }
            onClick={e => {
              e.stopPropagation();
            }}
            onDrop={e => this.drop(e)}
            onDragOver={e => {
              this.dragOver(e);
            }}
            onDragLeave={e => {
              this.dragLeave(e);
            }}>
            <div className={ classes.DragDropContainer__InnerContainer }>
              <div className={ classes.DragDropContainer__ImgContainer }>
                <img
                  src={Boxing}
                  alt="a box with an arrow pointing in."
                  className= { classes.DragDropContainer__Img }
                />
              </div>
              <p
                className={ classes.DragDropContainer__TextContainer }
                onDrop={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onDragOver={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <button
                  className={ classes.DragDropContainer__Button }
                  onClick={ this.triggerUpload }
                >
                  Choose a file
                </button>
                <span className= { classes.DragDropContainer__Text }>
                  &nbsp; or drag it here.
                </span>
                <input
                  type="file"
                  id="button"
                  className={ classes.DragDropContainer__UploadButton }
                  name="file1"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  onChange={() => this.handleFiles()}
                />
              </p>
            </div>
          </div>
          <p className={ classes.DragDropContainer__WeightLimit }>
            <img src={Weight} alt="Size Limit" />
            <span className={ classes.DragDropContainer__WeightLimit_Text }> 8Mb </span>
          </p>
        </React.Fragment>
      );
    } else
      isSupported = (
        <React.Fragment>
          <p>This browser does not support HTML5 file uploading.</p>
          <input type="file" />
        </React.Fragment>
      );
    return (
      <div className={ classes.DragDropContainer } onClick={() => { this.props.toggleModal(); }}>
        {isSupported}
      </div>
    );
  }
}

export default DragDrop;
