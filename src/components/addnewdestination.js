/*global google*/
import React from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../componentcss/addnewdestinations.css';
export default class Adddestination extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      location: '',
      description: '',
      image: [],
      loaded: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  maxSelectFile = (event) => {
    let files = event.target.files; // create file object
    if (files.length > 6) {
      const msg = 'Only 6 images can be uploaded at a time';
      event.target.value = null; // discard selected file
      console.log(msg);
      return false;
    }
    return true;
  };
  checkMimeType = (event) => {
    let files = event.target.files;
    let err = []; // create empty array
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    for (var x = 0; x < files.length; x++) {
      if (types.every((type) => files[x].type !== type)) {
        err[x] = files[x].type + ' is not a supported format\n';
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

  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 2000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + 'is too large, please pick a smaller file\n';
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };

  onChangeHandler = (event) => {
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkMimeType(event)
    ) 
    { 
      this.setState({ image: event.target.files }, () =>
        console.log(this.state.image)
      );
    }
  };
  componentDidMount() {
    var options = {
      componentRestrictions: { country: 'pk' },
    };
    var location = document.getElementById('location');
    var placeName = document.getElementById('placename');
    var autoComplete = new google.maps.places.Autocomplete(placeName, options);
    var autoComplete = new google.maps.places.Autocomplete(location, options);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    var locname = document.getElementById('placename').value.split(',')[0];
    var locname = locname.split('-')[0];
    this.state.name=locname;
    this.state.location=document.getElementById('location').value;
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('location', this.state.location);
    data.append('description', this.state.description);
    for (var i = 0; i < this.state.image.length; i++) {
      data.append('image', this.state.image[i]);
    }

    axios
      .post('http://localhost:3000/admin/addplaces', data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
          console.log("Zee"+ data);
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success('New destination is added Sucessfully.');
        
      })
      .catch((err) => {
        console.log(err);
        toast.error('Destination cannot be added.');
      });
  };
  render() {
    return (
      <div
        className="addnewdestination"
        style={{ overflow: 'hidden', marginTop: '-80px', height: '950px' }}
      >
        <div className="addnewform" id="addnewForm">
          <form onSubmit={this.onSubmit}>
            <h2 className="text-center" style={{fontFamily: 'Titillium Web, sans-serif', fontWeight:'bold' }}>Add New Destination</h2>
            <label className="addnewlabels">Place Name:</label>
            <input
              type="placename"
              name="placename"
              id="placename"
              placeholder="Enter Place Name"
              autoComplete="true"
              autoCorrect="true"
              required="required"
              className="form-control"
              style={{ width: '400px' }}
            />
            <br />
            <label className="addnewlabels">Location:</label>
            <input
              type="location"
              name="location"
              id="location"
              placeholder="Enter Location"
              autoComplete="true"
              autoCorrect="true"
              required="required"
              className="form-control"
              style={{ width: '400px' }}
            />
            <br />
            <label className="addnewlabels">Details:</label>
            <textarea
              type="text"
              name="detail"
              id="message"
              maxLength="200"
              placeholder="Write here!"
              onChange={(e) => this.setState({ description: e.target.value })}
              required="required" 
              className="form-control"  
              style={{ resize: 'none' }}  
            />
            <br />
            <label className="addnewlabels">Picture Upload:</label>
            <input
              type="file"
              name="image"
              id="image"
              required="required"
              className="form-control"
              accept="image/*"
              multiple  
              onChange={this.onChangeHandler}
            />
            <div
              className="btns"
              style={{ marginTop: '10px', textAlign: 'right' }}
            >
              <button
                type="submit"
                id="addnewbtn"
                style={{ marginRight: '10px' }}
              >
                Submit
              </button>
              <button type="reset" id="addnewcancel">
                Cancel
              </button>
            </div>
            <div className="loader" >
              <Progress max="100" color='success'  value={this.state.loaded}>
                {Math.round(this.state.loaded, 2)}%
              </Progress>
            </div>
          </form>
        </div>
        <div className="form-group">
          <ToastContainer />
        </div>
      </div>
    );
  }
}
