import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const { Content } = Layout;

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return (
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          {/* <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div>{children}</div>
        <Footer />
      </Content>
    </Layout>
  );
};

export default App;
