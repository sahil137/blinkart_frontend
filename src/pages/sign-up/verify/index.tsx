import CustomerLayout from '@/components/layout/customer';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import { auth } from '@/config/firebase';
import { toast } from 'react-toastify';
import PasswordInput from '@/components/ui/password-input';
import YupPassword from 'yup-password';
YupPassword(yup);
const verifyAccount = yup.object({
  password: yup
    .string()
    .required('No Password Entered')
    .min(8, 'Password is too short should be min 8 characters')
    .minUppercase(1, 'Password must contain atleast 1 uppercase Letter'),
});
type FormValues = {
  password: string;
};
const SignUpComplete = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(verifyAccount),
  });
  useEffect(() => {
    if (typeof window !== undefined) {
      setEmail(window.localStorage.getItem('emailForRegistration') || '');
    }
  }, []);
  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const data = await auth.signInWithEmailLink(email, window.location.href);
      if (data?.user?.emailVerified) {
        // remove email from local storage
        window.localStorage.removeItem('emailForRegistartion');

        const user = auth.currentUser;

        // update user password
        await user?.updatePassword(values.password);
        // get the token for this user
        const idTokenResult = await user?.getIdTokenResult();
        // dispatch(
        //   loginUser({
        //     email: user?.email,
        //     token: idTokenResult?.token,
        //     name: user?.displayName,
        //   })
        // );
        setLoading(false);
        // router.push("/");
      }
      console.log('result', data);
    } catch (error: any) {
      console.log('Error', error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="h-[80vh] flex flex-col space-y-10 justify-center items-center bg-white">
      <h1 className="text-center text-3xl">Welcome To Blinkart</h1>
      <Card className="p-5 xs:w-5/6 lg:w-2/5 min-w-[320px] shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl mb-10 text-center text-dark">Sign Up</h2>
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <Input
            value={email}
            readOnly
            label="Email"
            className="mx-5"
            variant="outline"
          />
          <PasswordInput
            placeholder="Min 8 characters and 1 Uppercase character"
            {...register('password')}
            error={errors?.password?.message}
            variant="outline"
            label="Enter Password"
            className="mx-5"
          />
          <div className="flex justify-center text-white">
            <Button loading={loading} type="submit">
              Complete Registration
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
};
SignUpComplete.Layout = CustomerLayout;
export default SignUpComplete;
