import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../componentcss/viewusers.css';

export default class viewusers extends Component {
  state={
    users: [],
    upers:[]
  }; 
  componentWillMount(){
    axios.get(`http://localhost:3000/admin/viewusers`)
    .then(res=> {
      console.log(res);
      this.setState({upers: res.data});
    });
  }

  deletuser = (userid) => {
     axios.delete(`http://localhost:3000/admin/deleteuser/` + userid).then(response => {
      var check = window.confirm("Are you sure, you want to delete User");
      if(check) { 
      if(response.data != null){
         this.setState( {
          upers : this.state.upers.filter(user => user._id !== userid)
         });

       }

      }
     }); 
  }  
  render() {
    var check=false;
    return (
      <div className="canvastransport" id="transportId" style={{height:'700px'}}>
      <h3 style={{ fontFamily: 'Titillium Web', marginTop: '-100px', position:'relative', marginLeft:'250px'  }}>View Users</h3>
          <div class="Table-responsive" >
              <Table striped bordered hover id="table" id="userdetailstable" style={{ marginTop: "170px", overflowY:'scroll'}}>
        <thead>
    <tr style={{textAlign:'center'}}>
      <th>ID's</th>
      <th>Username</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Deactivate</th>
      <th>Action</th>
    </tr>
  </thead>
        <tbody id="udetails"> 
          {this.state.upers.map(user=><tr>
            <td >
            {user._id}
            </td>
            <td id="capital">
            {user.username}
            </td>
            <td id="capital">
            {user.firstname}
            </td>
            <td id="capital">
            {user.lastname}
            </td>
            <td style={{color:'darkblue'}}>
            {user.email}
            </td>
            <td>
            {user.phone}
            </td>
            <td style={{textTransform:'capitalize'}}>
            {user.deleterequest.toString()}
            </td>
            <td>
            {!user.admin ? <button className="btn btn-danger" value="Remove" onClick={this.deletuser.bind(this, user._id, this, user.username)} >Remove</button> :   <button className="btn btn-primary" disabled >Admin</button>}
           
            </td>
            </tr>)}
        </tbody>
        </Table></div>
        </div>
    )
  }
}
