import CustomerLayout from '@/components/layout/customer';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import Button from '@/components/ui/button';
import Link from 'next/link';
import * as yup from 'yup';
import * as api from '../api/index';
import { yupResolver } from '@hookform/resolvers/yup';

import { GoogleOutlined } from '@ant-design/icons';
import Loader from '@/components/loader/loader';
import { useEffect, useState } from 'react';
import { auth, googleAuthProvider } from '@/config/firebase';
import { useAppDispatch, useAppSelector } from '@/utils/redux-hooks';
import { loginUser } from '@/features/user/user-slice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { setAuthCredentials } from '@/utils/auth-utils';
const login = yup.object({
  email: yup.string().email('Enter a valid email').required('Email Required'),
  password: yup.string().required('No Password Entered'),
});
type FormValues = {
  email: string;
  password: string;
};

export default function Home() {
  const [loadingEmailPassword, setLoadingEmailPassword] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store?.user);
  const router = useRouter();
  useEffect(() => {
    if (user && user?.token) router.replace('/');
  }, [user, router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(login),
  });
  const onSubmit = async (values: FormValues) => {
    setLoadingEmailPassword(true);
    const { email, password } = values;
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const idTokenResult = await user?.getIdTokenResult();
      setAuthCredentials(idTokenResult?.token, 'Customer');
      dispatch(
        loginUser({
          email: user?.email,
          token: idTokenResult?.token,
          name: user?.displayName,
        })
      );
      await api.createUpdateUser();
      toast.success('Signed in Successfully');
      router.push('/');
    } catch (error: any) {
      setLoadingEmailPassword(false);
      toast.error(error.message);
      console.log(error);
    }
  };
  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      const { user } = await auth.signInWithPopup(googleAuthProvider);
      const idTokenResult = await user?.getIdTokenResult();
      // createUser(idTokenResult?.token);

      dispatch(
        loginUser({
          email: user?.email,
          token: idTokenResult?.token,
          name: user?.displayName,
        })
      );
      setLoadingGoogle(false);
      router.push('/');
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      setLoadingGoogle(false);
    }
  };
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    <div className="h-[80vh] flex flex-col space-y-10 justify-center items-center">
      <h1 className="text-center text-3xl">Welcome Back To Blinkart</h1>
      <div className="xs:w-5/6 lg:w-2/5 min-w-[350px] shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl my-5 text-center text-dark">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            variant="outline"
            {...register('email')}
            error={errors.email?.message}
            label="Email"
            className="mx-5 my-3"
          />

          <PasswordInput
            variant="outline"
            {...register('password')}
            error={errors.password?.message}
            label="Password"
            className="mx-5 my-3"
          />

          <div className="flex justify-center mt-5">
            <Button
              loading={loadingEmailPassword}
              type="submit"
              className="mx-auto px-16 rounded-lg"
            >
              Login
            </Button>
          </div>
        </form>
        <div className="flex justify-center mt-5">
          <Button
            className="bg-customYellow1 rounded-lg hover:bg-customBlue1 hover:text-white transition-all ease-in-out xs:px-10 md:px-5 py-2 mb-5 flex items-center space-x-5"
            variant="custom"
            onClick={handleGoogleLogin}
          >
            <GoogleOutlined />
            <span className="mx-1">Google Login</span>
            {loadingGoogle && <Loader />}
          </Button>
        </div>
        <div>
          <Link href="/forgot-password">
            <div className="flex justify-center mb-3">
              <span className="text-sm cursor-pointer text-dark text-center">
                Forgot Password
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
Home.Layout = CustomerLayout;
