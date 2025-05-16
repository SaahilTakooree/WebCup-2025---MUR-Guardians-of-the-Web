// Import dependencies.
import { useEffect, useRef, useState } from 'react'; // Import React hooks.
import { Link } from 'react-router-dom'; // Import the link from the DOM.
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA component for Google reCAPTCHA integration.
import './Login-Signup.css' // Import the CSS file to style the component.


// Declares a functional React component named Login_Signup.
function Login_Signup() {

    // Creates a reference and initialised it to null.
    const containerRef = useRef(null);

    // State to store the reCAPTCHA token for sign-up form.
    const [signupCaptcha, setSignupCaptcha] = useState(null);
    // State to store the reCAPTCHA token for sign-in form.
    const [loginCaptcha, setLoginCaptcha] = useState(null);

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


    // React state to store the user's signup form data.
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // React state to store validation error messages for each signup field.
    const [signupErrors, setSignupErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    // React error state for captcha.
    const [signupCaptchaError, setSignupCaptchaError] = useState('');
    const [loginCaptchaError, setLoginCaptchaError] = useState('');

    // Function that handles changes in any input field.
    const handleSignupInputChange = (event) => {

        // Extract the field name and its value from the event.
        const { name, value } = event.target;

        // Update the corresponding field in the signupData state.
        setSignupData(prev => ({ ...prev, [name]: value }));

        // Clear any existing error for that specific field as the user types.
        setSignupErrors(prev => ({ ...prev, [name]: '' }));
    };

    // Function that runs when the Sign Up form is submitted.
    const handleSignUpSubmit = async (event) => {

        // Prevents the default form submission.
        event.preventDefault();

        // Destructure the current values from the signupData state.
        const { name, email, password } = signupData;

        // Initialise an empty errors object to store validation messages.
        let errors = { name: '', email: '', password: '' };

        // Flag to track if the form is valid.
        let isValid = true;

        // Name validation.
        if (!name.trim()) { // If there is no name.
            errors.name = 'Name is required.'; // Set error if name is empty.
            isValid = false; // Mark form as invalid.
        } else if (!/^[A-Z][a-z]*([ ][A-Z][a-z]*)*$/.test(name)) {
            errors.name  = "Must start with a capital letter. Must contain only letters."; // If the first name does not matches the correct format.
            isValid = false; // Mark form as invalid.
        };

        // Email validation.
        if (!email.trim()) { // If there is no email.
            errors.email = 'Email is required.'; // Set error if email is empty.
            isValid = false; // Mark form as invalid.
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // If the email does not matches the correct format.
            errors.email = "Please enter a valid email.";
            isValid = false; // Mark form as invalid.
        };

        // Password validation.
        if (!password) { // If there is no password.
            errors.password = 'Password is required.'; // Set error if  is password empty.
            isValid = false; // Mark form as invalid.
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(password)) { // If the password does not matches the correct format.
            errors.password = "Must be at least 8 characters long. Must contain at least one lowercase, uppercase and special character.";
            isValid = false; // Mark form as invalid.
        };

        // Update the state with any collected error messages.
        setSignupErrors(errors);

        // If validation failed, stop the function here.
        if (!isValid) return;

        
        try {
        const response = await fetch('https://backend.guardiansofth.maurice.webcup.hodi.host/register', {  // replace URL with your actual backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Sign up successful!');
            // Optionally reset form here

            if (!signupCaptcha) {
            setSignupCaptchaError('Please verify reCAPTCHA');
            return;
        }
        } else {
            alert(data.message || 'Signup failed');
        }
    } catch (error) {
        alert('Network error: ' + error.message);
    }
    };


    // React state to store the user's signin form data.
    const [signinData, setSigninData] = useState({
        loginEmail: '',
        loginPassword: ''
    });

    // React state to store validation error message signin field.
    const [signinError, setSigninError] = useState('');

    // Function that handles changes in any input field.
    const handleSigninInputChange = (event) => {

        // Extract the field name and its value from the event.
        const { name, value } = event.target;

        // Update the corresponding field in the signupData state.
        setSigninData(prev => ({ ...prev, [name]: value }));

        // Clear any existing error for that specific field as the user types.
        setSigninError('');
    };

    // Function that runs when the Sign In form is submitted.
    const handleSignInSubmit = async (event) => {

        // Prevents the default form submission.
        event.preventDefault();

        // Destructure the current values from the signupData state.
        const { loginEmail, loginPassword } = signinData;

        // Flag to track if the form is valid.
        let isValid = true;

        setSigninError('');

        // Name validation.
        if (!loginEmail.trim()) { // If there is no name.
            setSigninError('Email or Password is incorrect.');
            isValid = false; // Mark form as invalid.
        };

        // Password validation.
        if (!loginPassword) { // If there is no password.
            setSigninError('Email or Password is incorrect.');
            isValid = false; // Mark form as invalid.
        };

        // If validation failed, stop the function here.
        if (!isValid) return;

        
        try {
        const response = await fetch('https://backend.guardiansofth.maurice.webcup.hodi.host/login', {  // Your login endpoint here
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loginEmail, password: loginPassword })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Sign in successful!');

            if (!loginCaptcha) {
            setLoginCaptchaError('Please verify reCAPTCHA');
            return;
        }
            // Optionally redirect or save auth token here
        } else {
            setSigninError(data.message || 'Login failed');
        }
    } catch (error) {
        setSigninError('Network error: ' + error.message);
    }
    };


    // Return statement for the JSX that defines the component login and signup UI.
    return (
        // Render a div with a class and ID of "container" and attaches the containerRef to it.
        <div className="container" id="container" ref={containerRef}>

            <div className="form-container sign-up">

                <form onSubmit={handleSignUpSubmit}>

                    <h1 className ="heading">Create Account</h1>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={signupData.name}
                        onChange={handleSignupInputChange}
                    />
                    {signupErrors.name && <span className="error">{signupErrors.name}</span>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={signupData.email}
                        onChange={handleSignupInputChange}
                    />
                    {signupErrors.email && <span className="error">{signupErrors.email}</span>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signupData.password}
                        onChange={handleSignupInputChange}
                    />
                    {signupErrors.password && <span className="error">{signupErrors.password}</span>}

                    {/* reCAPTCHA for sign-up form */}
                    <ReCAPTCHA
                        sitekey="6LcrWDsrAAAAACZ92cp6Pee0BiYkUf8ZNfx9rgue"
                        onChange={setSignupCaptcha}
                    />
                    {signupCaptchaError && <span className="error">{signupCaptchaError}</span>}


                    <button type="submit">Sign Up</button>
                </form>

            </div>

            <div className="form-container sign-in">

                <form onSubmit={handleSignInSubmit}>
                    <h1 className ="heading">Sign In</h1>

                    <input 
                        type="email"
                        name="loginEmail"
                        placeholder="Email"
                        value={signinData.loginEmail}
                        onChange={handleSigninInputChange}
                    />

                    <input 
                        type="password" 
                        name="loginPassword"
                        placeholder="Password"
                        value={signinData.loginPassword}
                        onChange={handleSigninInputChange}
                    />

                    {signinError && <span className="error">{signinError}</span>}

                    {/* reCAPTCHA for sign-in form */}
                    <ReCAPTCHA
                        sitekey="6LcrWDsrAAAAACZ92cp6Pee0BiYkUf8ZNfx9rgue"
                        onChange={setLoginCaptcha}
                    />
                    {loginCaptchaError && <span className="error">{loginCaptchaError}</span>}

                    <Link to="/forgot-password">Forget Your Password?</Link>

                    <button type="submit">Sign In</button>
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