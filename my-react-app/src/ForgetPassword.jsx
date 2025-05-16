// Import dependencies.
import './ForgetPassword.css' // Import the CSS file to style the component.
import { useState } from 'react'; // Import React hooks.
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA component for Google reCAPTCHA integration.
import { Link } from 'react-router-dom'; // Import the link from the DOM.


// Declares a functional React component named ForgetPassword.
function ForgetPassword() {

    // React state to store the user's forget password form data.
    const [forgetPasswordData, setForgetPasswordData] = useState({
        email: '',
        password: ''
    });

    // React state to store validation error messages for each signup field.
    const [forgetPasswordErrors, setForgetPasswordErrors] = useState({
        email: '',
        password: ''
    });

    // React state to store the reCAPTCHA token for forget password form.
    const [forgetPasswordCaptcha, setForgetPasswordCaptcha] = useState(null);

    const [forgetPasswordCaptchaError, setForgetPasswordCaptchaError] = useState('');


    // Function that handles changes in any input field.
    const handleInputForgetPasswordChange = (event) => {

        // Extract the field name and its value from the event.
        const { name, value } = event.target;

        // Update the corresponding field in the signupData state.
        setForgetPasswordData(prev => ({ ...prev, [name]: value }));

        // Clear any existing error for that specific field as the user types.
        setForgetPasswordErrors(prev => ({ ...prev, [name]: '' }));
    };

    // Function that runs when the Sign Up form is submitted.
    const handleSubmit = async (event) => {

        // Prevents the default form submission.
        event.preventDefault();

        // Destructure the current values from the forgetPasswordData state.
        const { email, password } = forgetPasswordData;

        // Initialise an empty errors object to store validation messages.
        let errors = { email: '', password: '' };

        // Flag to track if the form is valid.
        let isValid = true;

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

        // Check if the forget password captcha is valid.
        if (!forgetPasswordCaptcha) {
            setForgetPasswordCaptchaError('Please verify reCAPTCHA');
            isValid = false; // Mark form as invalid.
        }

        // Update the state with any collected error messages.
        setForgetPasswordErrors(errors);

        // If validation failed, stop the function here.
        if (!isValid) return;

        try {
            const response = await fetch('https://backend.guardiansofth.maurice.webcup.hodi.host/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {

                setForgetPasswordCaptcha('');

                alert('Password changed successfully!');
                // Optionally reset the form
                setForgetPasswordData({ email: '', password: '' });
            } else {
                alert(data.message || 'Password change failed');
            }
        } catch (error) {
            alert('Network error: ' + error.message);
        }
    };

    
    // Return statement for the JSX that defines the component forget password UI.
    return (
        <div className="ChangePassword_Form">
            <form className="Form" onSubmit={handleSubmit}>

                <h1>Change Password</h1>

                <div className="Forget_Password_Field">

                    <div className="Input_Row">
                        <div className="Input_Col">
                            <input
                                type="email"
                                className="Input_Field"
                                name="email"
                                placeholder="Email"
                                value={forgetPasswordData.email}
                                onChange={handleInputForgetPasswordChange}
                            />
                            {forgetPasswordErrors.email && <span className="Error_Message">{forgetPasswordErrors.email}</span>}
                        </div>
                    </div>
                    <div className="Input_Row">
                        <div className="Input_Col">
                            <input
                                type="password"
                                className="Input_Field"
                                name="password"
                                placeholder="New Password"
                                value={forgetPasswordData.password}
                                onChange={handleInputForgetPasswordChange}
                            />
                            {forgetPasswordErrors.password && <span className="Error_Message">{forgetPasswordErrors.password}</span>}
                        </div>
                    </div>

                </div>

                <div className="Input_Row">
                    <ReCAPTCHA
                        sitekey="6LcrWDsrAAAAACZ92cp6Pee0BiYkUf8ZNfx9rgue" 
                        onChange={setForgetPasswordCaptcha}
                        onExpired={() => setSignupCaptcha(null)}
                    />
                </div>
                {forgetPasswordCaptchaError && <span className="error">{forgetPasswordCaptchaError}</span>}


                <div className="Submit_Box">
                    <button type="submit" className="Submit_Field">Submit</button>
                </div>

                <div className="Input_Row">

                    <div className="Input_Col"></div>
                    <div className="Input_Col"></div>

                    <div className="Input_Col">
                        <Link to="/">Go Back</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

// Exports the component so it can be imported and used in other files.
export default ForgetPassword;
