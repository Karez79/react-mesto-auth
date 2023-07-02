import Signup from "./Signup";

function Register({isSignup, onSubmit}) {
    return (
        <Signup isSignup={isSignup} onSubmit={onSubmit}/>
    );
}

export default Register;
