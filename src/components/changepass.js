import React, { Component } from 'react';
import '../componentcss/changepass.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';

export default class changepass extends Component {
  constructor(props) {
    super(props);
    this.onChangeConfirmnewpassword = this.onChangeConfirmnewpassword.bind(
      this
    );
    this.onChangeOldpassword = this.onChangeOldpassword.bind(this);
    this.onChangeNewpassword = this.onChangeNewpassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      oldpassword: '',
      newpassword: '',
      confirmnewpassword: '',
      hiddenold: false,
      hiddennew: false,
      hiddencon: false,
    };
  }

  togglepass = () => {
    const { hiddenold } = this.state;
    this.setState({ hiddenold: !hiddenold });
  };
  togglenewpass = () => {
    const { hiddennew } = this.state;
    this.setState({ hiddennew: !hiddennew });
  };

  togglecon = () => {
    const { hiddencon } = this.state;
    this.setState({ hiddencon: !hiddencon });
  };

  onChangeOldpassword(e) {
    this.setState({ oldpassword: e.target.value });
  }

  onChangeNewpassword(e) {
    this.setState({ newpassword: e.target.value });
  }
  onChangeConfirmnewpassword(e) {
    this.setState({ confirmnewpassword: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.newpassword !== this.state.confirmnewpassword) {
      toast.error('Entered passwords donot match');
    } else {
      const changepassObject = {
        oldpassword: this.state.oldpassword,
        newpassword: this.state.newpassword,
        confirmnewpassword: this.state.confirmnewpassword,
      };
      axios
        .post('http://localhost:3000/users/changepass', changepassObject)
        .then((res) => {
          console.log(res.data);
          toast.success('Password has been changed sucessfully');
        })
        .catch((err) => {
          toast.error(err);
          toast.error('Incorrect old password');
        });

      this.setState({
        oldpassword: '',
        newpassword: '',
        confirmnewpassword: '',
      });
    }
  }

  render() {
    const { hiddenold } = this.state;
    const { hiddennew } = this.state;
    const { hiddencon } = this.state;
    return (
      <div className="canvaschangepass">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="changepassform">
          <form onSubmit={this.onSubmit}>
            <div className="iconkey">
              <svg
                width="80px"
                style={{ marginLeft: '120px', color: '#001529' }}
                height="80px"
                viewBox="0 0 16 16"
                class="bi bi-key-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                />
              </svg>
            </div>
            <h2
              className="text-center"
              id="logtext"
              style={{
                textTransform: 'capitalize',
                color: '#001529',
                fontSize: '33px',
                marginTop: '0px',
                fontFamily: 'Titillium Web, sans-serif',
                fontWeight: 'bold',
              }}
            >
              Change Password
            </h2>
            <div className="form-group">
              <input
                type={hiddenold ? 'text' : 'password'}
                className="form-control"
                value={this.state.oldpassword}
                placeholder="Current Password"
                onChange={this.onChangeOldpassword}
                required="required"
                id="oldpassword"
                style={{ float: 'left' }}
              />
              <i
                id="passicon"
                style={{ marginLeft: '5px' }}
                onClick={this.togglepass}
              >
                <VisibilityIcon />
              </i>
            </div>
            <br />
            <div className="form-group">
              <input
                type={hiddennew ? 'text' : 'password'}
                value={this.state.newpassword}
                className="form-control"
                placeholder="New Password"
                onChange={this.onChangeNewpassword}
                required="required"
                minlength="8"
                style={{ float: 'left' }}
                id="newpassword"
              />
              <i
                id="passicon"
                style={{ marginLeft: '5px' }}
                onClick={this.togglenewpass}
              >
                <VisibilityIcon />
              </i>
            </div>
            <br />
            <div className="form-group">
              <input
                type={hiddencon ? 'text' : 'password'}
                value={this.state.confirmnewpassword}
                className="form-control"
                onChange={this.onChangeConfirmnewpassword}
                placeholder="Confirm new password"
                required="required"
                minlength="8"
                id="confirmpassword"
                style={{ float: 'left' }}
              />
              <i
                id="passicon"
                style={{ marginLeft: '5px' }}
                onClick={this.togglecon}
              >
                <VisibilityIcon />
              </i>
            </div>
            <br />
            <div className="form-group">
              <button type="submit" className="resetpass">
                Reset
              </button>
              <button type="reset" className="cancelpass">
                Cancel
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    );
  }
}
