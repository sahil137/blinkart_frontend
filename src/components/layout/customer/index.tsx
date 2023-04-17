import React, { useEffect } from 'react';
import { Layout, Space } from 'antd';
import TopNavbar from '../navigation/top-navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '@/utils/redux-hooks';
import { auth } from '@/config/firebase';
import { loginUser } from '@/features/user/user-slice';

const { Content } = Layout;

const CustomerLayout: React.FC = ({ children }: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!!user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch(
          loginUser({
            email: user.email,
            token: idTokenResult.token,
            name: user.displayName,
          })
        );
      }
    });

    // cleanup
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      {/* <Space direction="vertical" style={{ width: '100%' }}> */}
      {/* <Layout className="max-w-screen-2xl bg-white m-0"> */}
      <TopNavbar />
      <ToastContainer theme="colored" autoClose={3000} />
      <Content>
        <div className=" h-full">{children}</div>
      </Content>
      {/* </Layout> */}
      {/* </Space> */}
    </>
  );
};

export default CustomerLayout;
