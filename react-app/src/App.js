import React, { Component } from "react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seletedFile: null,
      key : "",
      keys : [],
      isUploaded : false
    };
  }

  // Handling Validation
  // Here are situations where this application can crash:

  // 1:)Too many images to upload
  // 2:)Uploading an image with the wrong file extension
  // 3:)Sending an image file that is too large
  maxSelectFile = (event) => {
    let files = event.target.files; // create file object
    if (files.length > 1) {
      const msg = "Only one imagep can be uploaded at a time";
      event.target.value = null; // discard selected file
      console.log(msg);
      toast.error(msg);
      return false;
    }
    return true;
  };

  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 2000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };

  checkMimeType = (event) => {
    let files = event.target.files;
    let err = []; // create empty array
    const types = ["image/png", "image/jpeg", "image/gif"];
    for (let x = 0; x < files.length; x++) {
      if (types.every((type) => files[x].type !== type)) {
        err[x] = files[x].type + " is not a supported format\n";
        // assign message to array
      }
    }
    for (var z = 0; z < err.length; z++) {
      // loop create toast massage
      event.target.value = null;
      toast.error(err[z]);
    }
    return true;
  };

  onClickHandler = () => {
    const data = new FormData();
    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append("file", this.state.selectedFile[x]);
    }

    axios
      .post("http://localhost:8080/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        toast.success("upload success");    
        console.log(res.data);
        this.setState({isUploaded:true,key:this.state.keys.push(res.data)})
        // this.state({isUploaded:true , ...this.state})
      })
      .catch((err) => {
        toast.error("upload fail");
      });
  };

  onChangeHandler = (event) => {
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkMimeType(event)
    ) {
      console.log(event.target.files);
      this.setState({
        selectedFile: event.target.files,
      });
    }
  };

  onDownload = (event)=> {
    console.log("hello there");
    
    axios
    .get(`http://localhost:8080/download/${this.state.key}`, {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      console.log(response)
      toast.success("download success");
      console.log("This also working");
      window.open(response.config.url);
        // const type = response.headers['content-type']
        // const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
        // const link = document.createElement('a')
        // link.href = window.URL.createObjectURL(blob)
        // link.download = "download";
        // link.click();
  })
    .catch((err) => {
      console.log(err);
      toast.error("download fail");
    });
  }

  onKeyChange = (event) => {  
    console.log(event.target.value);
    this.setState({
      key : event.target.value
    });
    
  }

  render() {
    

    return (
      <div>
      <nav class="navbar navbar-light bg-light">
        <h1 class="navbar-brand" href="#">
          File_Share
        </h1>
      </nav>
      
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form method="post" action="#" id="#">
                <div className="form-group files">
                  <div className="form-group">
                    <ToastContainer />
                  </div>
                  <label>Upload files. get a key. share :) </label>
                  <input type="file" name="file" className="form-control" multiple onChange={this.onChangeHandler}/>
                  <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                  <div name="form-group">
                    <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>
                  </div>
                  <hr/>
                  <div>
                    <ul>
                      {this.state.keys.map(item => <li key={item}> key : {item} </li>)}
                    </ul>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-md-6 pt-5">
                <div className="form-group color">
                  <div></div>
                  <label>Enter the key : </label>
                  <input type="text" name="key" onChange={this.onKeyChange} />
                  <button className="btn btn-success btn-block" onClick = {this.onDownload}> Download </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
