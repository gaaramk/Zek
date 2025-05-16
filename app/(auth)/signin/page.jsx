import SignInForm from "../_components/SignInForm";

export const metadata = {
  title: "Signin",
  description: "Signin to your account",
};

const SigninPage = () => {
  return (
    <>
      <div>
        <SignInForm />
      </div>
    </>
  );
};

export default SigninPage;
