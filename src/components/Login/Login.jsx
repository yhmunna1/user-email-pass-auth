import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setRegisterSuccess("User logged in successfully");
        } else {
          alert("Please verify your email");
        }
        // console.log(registerSuccess, "User logged in successfully");
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please provide an email", emailRef.current.value);
      return;
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Need valid valid email");
      return;
    }

    // send validation
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your email");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
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
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            {registerError && <p className="text-red-600">{registerError}</p>}
            {registerSuccess && (
              <p className="text-green-600">{registerSuccess}</p>
            )}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p className="pt-5">
              New here? <Link to="/register">Please Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
