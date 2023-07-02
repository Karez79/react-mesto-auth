import Signup from "./Signup";

function Login({isSignup, onSubmit}) {
    return (
        <Signup isSignup={isSignup} onSubmit={onSubmit}/>
    );
}

export default Login;
