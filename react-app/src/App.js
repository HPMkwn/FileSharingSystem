import React, { Component } from 'react'
import axios from 'axios';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      seletedFile: null
    }
  }
  onClickHandler = () => {
    const data = new FormData() 
    data.append('file', this.state.selectedFile);
    axios.post("http://localhost:8000/upload", data, { /* receive two parameter endpoint url ,form data*/})
    .then(res => { // then print response status
      console.log(res.statusText)
    });
  };

  onChangeHandler=event=>{
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form method="post" action="#" id="#">
                <div className="form-group files">
                  <label> Upload Your files</label>
                  <input type="file" name="file" className="form-control" onChange={this.onChangeHandler}/>
                  <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
                </div>
              </form>
            </div>

            <div className="col-md-6">
              <form method="post" action="#" id="#">
                <div className="form-group files color">
                  <label >Upload Your file</label>
                  <input type="file" className="form-control" multiple=""/>
                </div>
              </form>

            </div>


          </div>
        </div>
      </div>
    )
  }
}

export default App;
