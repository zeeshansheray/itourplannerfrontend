import React, { Component } from 'react';
import '../componentcss/contact.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  DownSquareOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterCircleFilled,
} from '@ant-design/icons';


export default class contact extends Component {
  constructor(props) {
    super(props);

    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      text: '',
      email: '',
      subject: '',
    };
  }

  onChangeSubject(e) {
    this.setState({ subject: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangeText(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const contactObject = {
      email: this.state.email,
      subject: this.state.subject,
      text: this.state.text,
    };
    axios
      .post('http://localhost:3000/users/contactus', contactObject)
      .then((res) => {
        console.log(res.data);
        toast.success("Thanks for contacting, we 'll surely get to you.");
      })
      .catch((error) => {
        toast.error('Cannot Proceed your request. Try a later.');
      });

    this.setState({ text: '', email: '', subject: '' });
  }

  render() {
    return (
      <div className="contactbox">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div id="contact">
          <div className="infor con-box">
            <div className="con" id="con1">
              <h2>Contact Us</h2>
              <ul>
                <li>
                  <span>
                    <EnvironmentOutlined />
                  </span>{' '}
                  &nbsp; &nbsp; COMSATS University, Islamabad
                </li>
                <li>
                  <span>
                    <MailOutlined />
                  </span>{' '}
                  &nbsp; &nbsp; itourcompanion@gmail.com
                </li>
                <li>
                  <span>
                    <PhoneOutlined />
                  </span>{' '}
                  &nbsp; &nbsp; +92-3333376949
                </li>
                <li>
                  <span>
                    <DownSquareOutlined />
                  </span>{' '}
                  &nbsp; &nbsp; To know more connect us socially,
                </li>
              </ul>
              <div className="social-media">
                <ul style={{ textAlign: 'center' }}>
                  <li>
                    <a href="https://web.facebook.com/Itourcompanion">
                      <FacebookFilled id="soc" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/i_tourcompanion/">
                      <InstagramFilled id="soc" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/itourcompanion">
                      <span>
                        <TwitterCircleFilled id="soc" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="con-form con-box" id="box2">
            <div className="con">
              <h2 id="div2heading" style={{ marginTop: '30px' }}>
                Get in touch
              </h2>
              <form className="form" onSubmit={this.onSubmit}>
                <input
                  type="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  placeholder="Enter your email"
                  maxlength="40"
                />
                <input
                  type="text"
                  required
                  value={this.state.subject}
                  onChange={this.onChangeSubject}
                  placeholder="Subject"
                  maxlength="30"
                />
                <textarea
                  type="text"
                  required
                  value={this.state.text}
                  onChange={this.onChangeText}
                  placeholder="Enter your text here......"
                  maxlength="300"
                  id="message"
                  defaultValue={''}
                />
                <button type="submit" id="sbmt-btn" >Submit</button>
                <button type="reset" id="cancel-btn">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
