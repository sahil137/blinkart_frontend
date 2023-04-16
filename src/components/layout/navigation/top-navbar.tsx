import React, { useState } from 'react';
import {
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

const TopNavbar: React.FC = () => {
  const { Item, SubMenu } = Menu;
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    // <Menu
    //   onClick={onClick}
    //   selectedKeys={[current]}
    //   mode="horizontal"
    //   items={items}
    // />
    <Menu onClick={onClick} defaultSelectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link href="/">Home</Link>
      </Item>
      <SubMenu key="username" icon={<SettingOutlined />} title="User Name">
        <Item
          key="setting:1"
          // icon={<LogoutOutlined />}
          // onClick={handleLogout}
        >
          Option 1
        </Item>
        <Item
          key="setting:2"
          icon={<LogoutOutlined />}
          // onClick={handleLogout}
        >
          Logout
        </Item>
      </SubMenu>
      <Item key="signup" icon={<UserAddOutlined />}>
        <Link href="/sign-up">Sign Up</Link>
      </Item>

      <Item key="login" icon={<UserOutlined />}>
        <Link href="/login">Login</Link>
      </Item>
    </Menu>
  );
};

export default TopNavbar;
