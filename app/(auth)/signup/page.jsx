import SignupForm from "../_components/SignupForm";

export const metadata = {
  title: "Signup",
  description: "Signup to your account",
};

const SignupPage = () => {
  return (
    <>
      <div>
        <SignupForm />
      </div>
    </>
  );
};

export default SignupPage;
