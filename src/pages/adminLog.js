import React, { Component } from 'react';
import AdminLog from '../components/adminlogin';

class adminLog extends Component {
  render() {
    return (
      <div>
        <AdminLog admin={this.props.admin} setAdmin={this.props.setAdmin} />
      </div>
    );
  }
}
export default adminLog;
