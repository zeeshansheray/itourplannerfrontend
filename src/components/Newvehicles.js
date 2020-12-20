import React, { Component } from 'react';
import axios from 'axios';
import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const columns = [
  { title: 'Nic Number', dataIndex: 'nicno', key: 'Nic Number' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'City', dataIndex: 'city', key: 'city' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Approve',
    dataIndex: 'userid',
    key: 'userid',
    render: () => (
      <a onClick={window.alert('hi')} style={{ color: 'blue' }}>
        Approve
      </a>
    ),
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'userid',

    render: () => <a style={{ color: 'red' }}>Delete</a>,
  },
];

export default class Newvehicles extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      upers: [],
    };
    this.approvetransport = this.approvetransport.bind(this);
  }

  componentWillMount() {
    axios.get(`http://localhost:3000/admin/viewtransport`).then((res) => {
      console.log(res);
      this.setState({ upers: res.data });
    });
  }

  approvetransport = (userid) => {
    var check = window.confirm('Are you sure, you want to this user details');
    if (check) {
      const object = {
        userid: userid,
      };
      axios
        .post('http://localhost:3000/admin/approvetransport', object)
        .then((res) => {
          console.log(res.data);
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
    return (
      <div
        className="canvastransport"
        id="transportId"
        style={{ backgroundColor: 'white', overflowY: 'scroll' }}
      >
        <h3 style={{ fontFamily: 'Titillium Web', marginTop: '-100px' }}>
          Approve Transport
        </h3>

        <div style={{ marginTop: '150px' }}>
          <Table
            columns={columns}
            expandable={{
              defaultExpandAllRows: true,
              expandedRowRender: (record) => (
                <p>
                  <h4 style={{ fontWeight: 'bold' }}> • Vehicles:</h4>
                  <table class="styled-table">
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Model Name</th>
                        <th>Vehicle Reg no</th>
                        <th>Model Year</th>
                        <th>Color</th>
                        <th>Avalibility</th>
                        <th>Price</th>
                      </tr>{' '}
                    </thead>

                    <tbody>
                      {record.vehicles.map((vehicle) => (
                        <tr style={{ color: 'black' }}>
                          <td>{vehicle.companyname}</td>
                          <td>{vehicle.modelname}</td>
                          <td>{vehicle.vehiclereg}</td>
                          <td>{vehicle.modelyear}</td>
                          <td>{vehicle.color}</td>
                          <td>{vehicle.available.toString()}</td>
                          <td>{vehicle.price}Rs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </p>
              ),
            }}
            dataSource={this.state.upers}
          />
        </div>
      </div>
    );
  }
}
