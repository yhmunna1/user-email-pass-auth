import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import auth from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    // console.log("Success");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);

    // Validations checkup and return
    if (password > 6) {
      setRegisterError("Password should be at least 6 characters or Longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password should have one Uppercase letter");
      return;
    }

    // reset message
    setRegisterError("");
    setRegisterSuccess("");

    // Create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setRegisterSuccess("User created successfully");

        // Update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => console.log("Profile Updated"))
          .catch((error) => {
            console.log(error);
          });

        // Send Email Verification
        sendEmailVerification(result.user).than(() => {
          alert("Please check your email and verify");
        });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="card w-2/4 mx-auto bg-base-200 p-6">
      <h2 className="text-3xl">Please Register</h2>
      <form className="card-body" onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="input input-bordered"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="input input-bordered"
          required
        />
        <div className="flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered w-full"
            required
          />
          <input
            onClick={() => setShowPassword(!showPassword)}
            type="checkbox"
            className="toggle toggle-xs -ms-9"
            defaultChecked
          />
        </div>
        <div className="my-2">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms" className="ms-2">
            Accept our <a href="">Terms and Condition</a>
          </label>
        </div>
        {registerError && <p className="text-red-600">{registerError}</p>}
        {registerSuccess && <p className="text-green-600">{registerSuccess}</p>}
        <input type="submit" value="Register" className="btn btn-primary" />
        <p className="pt-5">
          Already have an account? <Link to="/login">Please Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
