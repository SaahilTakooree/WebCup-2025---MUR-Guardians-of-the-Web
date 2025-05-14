// Import dependencies.
import { useEffect, useRef } from 'react'; // Import two React hooks.
import './Login-Signup.css' // Import the CSS file to style the component.


// Declares a functional React component named Login_Signup.
function Login_Signup() {

    // Creates a reference and initialised it to null.
    const containerRef = useRef(null);

    // Starts a useEffect hook to handle side effects after the component mounts.
    useEffect(() => {

        // Assigns the actual DOM element referenced by containerRef to container.
        const container = containerRef.current;

        // Select the DOM elements for the register and login buttons using their IDs.
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        // Defines a function to add the active class to the container when the "Sign Up" button is clicked.
        const handleRegisterClick = () => {
            container.classList.add('active');
        };

        // Defines a function to remove the active class from the container when the "Sign In" button is clicked.
        const handleLoginClick = () => {
            container.classList.remove('active');
        };

        // Add click event listeners to both buttons to toggle the form view.
        registerBtn.addEventListener('click', handleRegisterClick);
        loginBtn.addEventListener('click', handleLoginClick);

        // Start the cleanup function that runs when the component unmounts or dependencies change.
        return () => {
            // Removes the click event listeners to avoid memory leaks.
            registerBtn.removeEventListener('click', handleRegisterClick);
            loginBtn.removeEventListener('click', handleLoginClick);
        };
    }, []);


    // Return statement for the JSX that defines the component login and signup UI.
    return (
        // Render a div with a class and ID of "container" and attaches the containerRef to it.
        <div className="container" id="container" ref={containerRef}>
            <div className="form-container sign-up">
                <form>
                    <h1 className ="heading">Create Account</h1>
                    <span>Use your email for registeration</span>
                    <input type="text" placeholder="Name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1 className ="heading">Sign In</h1>
                    <span>Use your email password</span>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <a href="#">Forget Your Password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="hidden" id="login">Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="hidden" id="register">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


// Exports the component so it can be imported and used in other files.
export default Login_Signup;