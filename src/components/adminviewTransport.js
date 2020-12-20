import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../componentcss/viewusers.css';
import '../componentcss/transport.css';

export default class viewusers extends Component {
  state = {
    users: [],
    upers: [],
  };
  componentDidMount() {
    axios.get(`http://localhost:3000/admin/viewtransport`).then((res) => {
      console.log(res);
      this.setState({ users: res.data });
    });
  }
  approvetransport = (userid) => {
    var check = window.confirm('Are you sure? you want to this user details');
    if (check) {
      const object = {
        userid: userid,
      };
      axios
        .put('http://localhost:3000/admin/approvetransport', object)
        .then((res) => {
          console.log(res.data);
          this.setState({
            users: this.state.users.filter(
              (approved) => approved === (false || true)
            ),
          });
        });
    }
  };
  disapprovetransport = (userid) => {
    var check = window.confirm('Are you sure? ');
    if (check) {
      const object = {
        userid: userid,
      };
      axios
        .put('http://localhost:3000/admin/disapprovetransport', object)
        .then((res) => {
          console.log(res.data);
          this.setState({
            users: this.state.users.filter(
              (approved) => approved === (true || false)
            ),
          });
        });
    }
  };

  deletuser = (userid) => {
    axios
      .delete(`http://localhost:3000/admin/deletetransport/` + userid)
      .then((response) => {
        var check = window.confirm(
          'Are you sure, you want to this user details'
        );
        if (check) {
          if (response.data != null) {
            this.setState({
              upers: this.state.upers.filter((user) => user.userid !== userid),
            });
          }
        }
      });
  };

  render() {
    var check = false;
    return (
      <div
        className="canvastransport"
        id="transportId"
        style={{ height: '700px' }}
      >
        <h3 style={{ fontFamily: 'Titillium Web', marginTop: '-100px' }}>
          View User Details
        </h3>
        <div class="Table-responsive">
          <Table
            striped
            bordered
            hover
            id="table"
            id="userdetailstable"
            style={{ marginTop: '150px', overflowY: 'scroll' }}
          >
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>ID's</th>
                <th>NIC No</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Email</th>
                <th>City</th>
                <th>Approve</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="udetails">
              {this.state.users.map((user) => (
                <tr>
                  <td>{user.userid}</td>
                  <td id="capital">{user.nicno}</td>
                  <td id="capital">{user.phone}</td>
                  <td id="capital">{user.address}</td>
                  <td style={{ color: 'darkblue' }}>{user.email}</td>
                  <td>{user.city}</td>
                  <td>
                    {user.approved ? (
                      <button
                        className="btn btn-success"
                        value="Approved"
                        onClick={this.disapprovetransport.bind(
                          this,
                          user.userid
                        )}
                      >
                        Approved
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        value="Approve"
                        onClick={this.approvetransport.bind(this, user.userid)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      value="Remove"
                      onClick={this.deletuser.bind(this, user.userid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
