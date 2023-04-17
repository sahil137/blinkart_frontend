import CustomerLayout from '@/components/layout/customer';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import { auth } from '@/config/firebase';
import { toast } from 'react-toastify';
const emailSchema = object({
  email: string()
    .email('Enter a valid email')
    .required('Please Enter your email'),
});
type FormValues = {
  email: string;
};
const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(emailSchema),
  });
  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      console.log(values);
      await auth.sendSignInLinkToEmail(values.email, {
        url: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL || '',
        handleCodeInApp: true,
      });
      toast.success(`Email sent to ${values.email}`);
      window.localStorage.setItem('emailForRegistration', values.email);
      setLoading(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error('Error in sending email, please try again later');
      setLoading(false);
    }
  };
  return (
    <main className="h-[80vh] flex flex-col space-y-10 justify-center items-center bg-white">
      <h1 className="text-center text-3xl">Welcome To Blinkart</h1>
      <Card className="p-5 xs:w-5/6 lg:w-2/5 min-w-[320px] shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl mb-10 text-center text-customDark">Sign Up</h2>
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <Input
            variant="outline"
            {...register('email')}
            error={errors.email?.message}
            label="Email"
            className="mx-5"
          />

          <div className="flex justify-center text-white">
            <Button loading={loading} type="submit">
              Get Link
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
};
SignUp.Layout = CustomerLayout;
export default SignUp;
