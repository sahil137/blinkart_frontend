import CustomerLayout from '@/components/layout/customer';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { auth } from '@/config/firebase';
import { useAppSelector } from '@/utils/redux-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormType = {
  email: string;
};

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = useAppSelector((store) => store?.user);

  useEffect(() => {
    if (user && user?.token) router.replace('/');
  }, [user, router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit = async (values: FormType) => {
    setLoading(true);

    await auth
      .sendPasswordResetEmail(values.email, {
        url: process.env.NEXT_PUBLIC_FORGOT_PASSWORD_REDIRECT || '',
        handleCodeInApp: true,
      })
      .then(() => {
        setLoading(false);
        toast.success('Email sent please check your mail to continue');
      })
      .catch((error) => {
        setLoading(false);

        toast.error(error.message);
      });
  };
  return (
    <>
      <main className="h-[80vh] flex flex-col space-y-10 justify-center items-center">
        <div className="p-5 xs:w-5/6 lg:w-2/5 min-w-[320px] shadow-lg rounded-xl border border-gray-200">
          <h2 className="text-3xl mb-10 text-center text-customDark">
            Forgot Password
          </h2>
          <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <Input
              variant="outline"
              {...register('email')}
              error={errors.email?.message}
              label="Email"
              className="mx-5 my-3"
              placeholder="Enter registered Email ID"
            />

            <div className="flex justify-center">
              <Button
                loading={loading}
                type="submit"
                className="mx-auto px-16 rounded-lg"
              >
                Get Link
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
ForgotPassword.Layout = CustomerLayout;
export default ForgotPassword;
