import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../componentcss/viewcontactus.css';

export default class viewGuideRequests extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    axios.get(`http://localhost:3000/admin/viewguiderequests`).then((res) => {
      console.log(res);
      this.setState({ list: res.data });
    });
  }
  approveGuide = (userid) => {
    axios
      .post(`http://localhost:3000/admin/approveGuide/` + userid)
      .then((response) => {
        var check = window.confirm(
          'Are you sure, you want to approve this member as a guide?'
        );
        if (check) {
          if (response.data != null) {
            this.setState({
              list: this.state.list.filter((thread) => thread._id !== userid),
            });
          }
        }
      });
  };
  render() {
    var check = false;
    return (
      <div className="canvastransport" id="transportId" style={{height:'700px'}}>
      <h3 style={{ fontFamily: 'Titillium Web', marginTop: '-100px'  }}>View Guide Request</h3>
          <div class="Table-responsive" >
              <Table striped bordered hover id="table" id="userdetailstable" style={{ marginTop: "150px", overflowY:'scroll'}}>
            <thead>
              <tr style={{textAlign:'center'}}>
                <th>ID's</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>NIC No.</th>
                <th>Address</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="udetails">
              {this.state.list.map((user) => (
                <tr>
                  <td>{user._id}</td>
                  <td id="capital">{user.fullname}</td>
                  <td style={{ color: 'darkblue' }}>{user.email}</td>
                  <td>{user.phone}</td>
                  <td id="capital">{user.nicno}</td>
                  <td id="capital">{user.address}</td>

                  <td style={{ textTransform: 'capitalize' }}>{user.city}</td>
                  <td>
                    {!user.admin ? (
                      <button
                        className="btn btn-danger"
                        value="Remove"
                        onClick={this.approveGuide.bind(this, user._id)}
                      >
                        Approve
                      </button>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        Admin
                      </button>
                    )}
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
