// Import dependencies.
import { useEffect, useRef, useState } from "react"; // Import React hooks.
import { Link } from "react-router-dom"; // Import the link from the DOM.
import "./Login-Signup.css"; // Import the CSS file to style the component.
import { supabase } from "./supabaseClient";

// Declares a functional React component named Login_Signup.
function Login_Signup() {
  // Creates a reference and initialised it to null.
  const containerRef = useRef(null);

  // Starts a useEffect hook to handle side effects after the component mounts.
  useEffect(() => {
    // Assigns the actual DOM element referenced by containerRef to container.
    const container = containerRef.current;

    // Select the DOM elements for the register and login buttons using their IDs.
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    // Defines a function to add the active class to the container when the "Sign Up" button is clicked.
    const handleRegisterClick = () => {
      container.classList.add("active");
    };

    // Defines a function to remove the active class from the container when the "Sign In" button is clicked.
    const handleLoginClick = () => {
      container.classList.remove("active");
    };

    // Add click event listeners to both buttons to toggle the form view.
    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    // Start the cleanup function that runs when the component unmounts or dependencies change.
    return () => {
      // Removes the click event listeners to avoid memory leaks.
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, []);

  // React state to store the user's signup form data.
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // React state to store validation error messages for each signup field.
  const [signupErrors, setSignupErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Function that handles changes in any input field.
  const handleSignupInputChange = (event) => {
    // Extract the field name and its value from the event.
    const { name, value } = event.target;

    // Update the corresponding field in the signupData state.
    setSignupData((prev) => ({ ...prev, [name]: value }));

    // Clear any existing error for that specific field as the user types.
    setSignupErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = signupData;

    let errors = { name: "", email: "", password: "" };
    let isValid = true;

    if (!name.trim()) {
      errors.name = "Name is required.";
      isValid = false;
    } else if (!/^[A-Z][a-z]*([ ][A-Z][a-z]*)*$/.test(name)) {
      errors.name =
        "Must start with a capital letter. Must contain only letters.";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
        password,
      )
    ) {
      errors.password =
        "Must be at least 8 characters long. Must contain at least one lowercase, uppercase and special character.";
      isValid = false;
    }

    setSignupErrors(errors);

    if (!isValid) return;

    try {
      const { data, error } = await supabase.from("users").insert([
        {
          name: name.trim(),
          email: email.trim(),
          password: password,
        },
      ]);

      if (error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Sign up successful!");
      }
    } catch (err) {
      alert("Unexpected error: " + err.message);
    }
  };

  // React state to store the user's signin form data.
  const [signinData, setSigninData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  // React state to store validation error message signin field.
  const [signinError, setSigninError] = useState("");

  // Function that handles changes in any input field.
  const handleSigninInputChange = (event) => {
    // Extract the field name and its value from the event.
    const { name, value } = event.target;

    // Update the corresponding field in the signupData state.
    setSigninData((prev) => ({ ...prev, [name]: value }));

    // Clear any existing error for that specific field as the user types.
    setSigninError("");
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    const { loginEmail, loginPassword } = signinData;

    let isValid = true;
    setSigninError("");

    if (!loginEmail.trim() || !loginPassword) {
      setSigninError("Email or Password is incorrect.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      // Fetch user by email from Supabase table "users"
      let { data: users, error } = await supabase
        .from("users")
        .select("id, email, password") // assuming password is hashed and stored in "password" column
        .eq("email", loginEmail)
        .single();

      if (error || !users) {
        setSigninError("Invalid email or password.");
        return;
      }

      // Compare entered password with hashed password from DB
      const passwordMatch = loginPassword === users.password;

      if (!passwordMatch) {
        setSigninError("Invalid email or password.");
        return;
      }

      alert("Sign in successful!");
      console.log("User data:", users);
      // Proceed with login session setup
    } catch (err) {
      setSigninError("Unexpected error: " + err.message);
    }
  };

  // Return statement for the JSX that defines the component login and signup UI.
  return (
    // Render a div with a class and ID of "container" and attaches the containerRef to it.
    <div className="container" id="container" ref={containerRef}>
      <div className="form-container sign-up">
        <form onSubmit={handleSignUpSubmit}>
          <h1 className="heading">Create Account</h1>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={signupData.name}
            onChange={handleSignupInputChange}
          />
          {signupErrors.name && (
            <span className="error">{signupErrors.name}</span>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignupInputChange}
          />
          {signupErrors.email && (
            <span className="error">{signupErrors.email}</span>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupInputChange}
          />
          {signupErrors.password && (
            <span className="error">{signupErrors.password}</span>
          )}

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleSignInSubmit}>
          <h1 className="heading">Sign In</h1>

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

          <Link to="/forgot-password">Forget Your Password?</Link>

          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login">
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button className="hidden" id="register">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exports the component so it can be imported and used in other files.
export default Login_Signup;