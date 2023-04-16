import CustomerLayout from '@/components/layout/customer';
import React from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
const emailSchema = object({
  email: string()
    .email('Enter a valid email')
    .required('Please Enter your email'),
});
type FormValues = {
  email: string;
};
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(emailSchema),
  });
  const onSubmit = () => {};
  return (
    <main className="h-[80vh] flex flex-col space-y-10 justify-center items-center">
      <h1 className="text-center text-3xl">Welcome To Blinkart</h1>
      <Card className="p-5 xs:w-5/6 lg:w-2/5 min-w-[320px] shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl mb-10 text-center text-customDark">Sign Up</h2>
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email')}
            error={errors.email?.message}
            label="Email"
            className="mx-5"
          />

          <div className="flex justify-center text-white">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </Card>
    </main>
  );
};
SignUp.Layout = CustomerLayout;
export default SignUp;
