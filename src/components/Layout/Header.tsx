import * as React from 'react';
import { Layout, Menu } from 'antd';
import './Header.css';

const { Header } = Layout;

function HeaderLayout() {
  return (
    <Header>
      <div className="logo">Souka</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        {/* <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
      </Menu>
    </Header>
  );
}

export default HeaderLayout;
