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
import firebase from 'firebase/compat/app';
import { useAppDispatch, useAppSelector } from '@/utils/redux-hooks';
import { logoutUser } from '@/features/user/user-slice';
import { useRouter } from 'next/router';

const TopNavbar: React.FC = () => {
  const { Item, SubMenu } = Menu;
  const dispatch = useAppDispatch();
  const { name, token } = useAppSelector((store) => store?.user);
  const router = useRouter();
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    dispatch(logoutUser());
    router.push('/login');
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
      {!!token ? (
        <>
          <SubMenu
            key="username"
            icon={<SettingOutlined />}
            title={name ? name : 'User'}
          >
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
              onClick={handleLogout}
            >
              Logout
            </Item>
          </SubMenu>
        </>
      ) : (
        <></>
      )}
      {!token ? (
        <>
          <Item key="signup" icon={<UserAddOutlined />}>
            <Link href="/sign-up">Sign Up</Link>
          </Item>

          <Item key="login" icon={<UserOutlined />}>
            <Link href="/login">Login</Link>
          </Item>
        </>
      ) : (
        <></>
      )}
    </Menu>
  );
};

export default TopNavbar;
