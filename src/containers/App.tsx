import * as React from 'react';
import { Layout, Breadcrumb } from 'antd';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

import './App.css';

const { Content } = Layout;

interface AppProps {
  children: React.ReactNode;
}

class App extends React.Component<AppProps> {
  render() {
    const { children } = this.props;
    return (
      <Layout className="layout">
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            {/* <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{children}</div>
          <Footer />
        </Content>
      </Layout>
    );
  }
}

export default App;
