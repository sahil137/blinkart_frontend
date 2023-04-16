import React from 'react';
import { Layout, Space } from 'antd';
import TopNavbar from '../navigation/top-navbar';

const { Content } = Layout;

const CustomerLayout: React.FC = ({ children }: any) => (
  <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout className="max-w-screen-2xl">
      <TopNavbar />
      <Content>{children}</Content>
    </Layout>
  </Space>
);

export default CustomerLayout;
