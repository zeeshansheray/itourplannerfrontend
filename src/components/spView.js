import React from 'react';
import { Layout, Menu } from 'antd';
import ReactDOM from 'react-dom';
import Deleteaccount from './deleteaccount';
import Changepass from './changepass';

import BecomeGuide from './becomeGuide';
import AddTransport from './addTransport';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserVehicles from '../components/uservehicles';

import {
  HomeOutlined,
  SearchOutlined,
  SettingFilled,
  LoginOutlined,
  DeleteOutlined,
  KeyOutlined,
  CarOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
const { SubMenu } = Menu;
function changePass() {
  ReactDOM.render(<Changepass />, document.getElementById('content'));
}
function deleteAccount() {
  ReactDOM.render(<Deleteaccount />, document.getElementById('content'));
}
function addTransport() {
  ReactDOM.render(
    <AddTransport username={document.getElementById('user_id').innerHTML} />,
    document.getElementById('content')
  );
}
function viewVehicles() {
  ReactDOM.render(<UserVehicles />, document.getElementById('content'));
}
function addGuide() {
  ReactDOM.render(
    <BecomeGuide
      fullname={document.getElementById('full_name').innerHTML}
      email={document.getElementById('email_id').innerHTML}
      phone={document.getElementById('phone_no').innerHTML}
      username={document.getElementById('user_id').innerHTML}
    />,
    document.getElementById('content')
  );
}

class SpView extends React.Component {
  state = {
    collapsed: false,
    name: '',
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
    this.state.name = this.props.user.username;
    if (collapsed) {
      ReactDOM.render(<AccountCircleIcon />, document.getElementById('name'));
      document.getElementById('welcome').style.fontSize = '14px';
    } else {
      document.getElementById('welcome').style.visibility = 'visible';
      ReactDOM.render(this.state.name, document.getElementById('name'));
      document.getElementById('welcome').style.fontSize = '14px';
    }
  };
  async Logout(e) {
    localStorage.clear();
    window.location.reload();
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <h3
            id="welcome"
            style={{
              textAlign: 'center',
              marginTop: '20px',
              color: 'white',
              textTransform: 'capitalize',
            }}
          >
            Welcome
          </h3>
          <h3
            id="name"
            style={{
              textAlign: 'center',
              marginTop: '20px',
              color: 'white',
              fontSize: '16px',
            }}
          >
            {this.props.user.username.charAt(0).toUpperCase()}
            {this.props.user.username.slice(1)}
          </h3>

          <a id="user_id" style={{ visibility: 'hidden', fontSize: '1px' }}>
            {this.props.user._id}
          </a>
          <a id="full_name" style={{ visibility: 'hidden', fontSize: '1px' }}>
            {this.props.user.firstname.toUpperCase() +
              ' ' +
              this.props.user.lastname.toUpperCase()}
          </a>
          <a id="phone_no" style={{ visibility: 'hidden', fontSize: '1px' }}>
            {this.props.user.phone}
          </a>
          <a id="email_id" style={{ visibility: 'hidden', fontSize: '1px' }}>
            {this.props.user.email}
          </a>

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>

            <Menu.Item key="16" onClick={addTransport} icon={<CarOutlined />}>
              Add your Transport
            </Menu.Item>
            <Menu.Item key="21" icon={<CarOutlined />} onClick={viewVehicles}>
              My Vehicles
            </Menu.Item>
            <Menu.Item key="17" onClick={addGuide} icon={<SearchOutlined />}>
              Become Tour Guide
            </Menu.Item>

            <SubMenu key="7" icon={<SettingFilled />} title="Manage Account">
              <Menu.Item key="13" onClick={changePass} icon={<KeyOutlined />}>
                Password
              </Menu.Item>
              <Menu.Item
                key="14"
                onClick={deleteAccount}
                icon={<DeleteOutlined />}
              >
                Delete Account
              </Menu.Item>
            </SubMenu>
            <Menu.Item onClick={this.Logout} key="8" icon={<LoginOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <div id="content" style={{backgroundColor: 'white'}}></div>
        </Layout>
      </Layout>
    );
  }
}
export default SpView;
