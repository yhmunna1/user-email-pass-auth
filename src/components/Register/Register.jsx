import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import auth from "../../firebase/firebase.config";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    // console.log("Success");
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

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
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="card w-80 mx-auto bg-base-200 p-6">
      <h2 className="text-3xl">Please Register</h2>
      <form className="card-body" onSubmit={handleRegister}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="input input-bordered"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="input input-bordered"
          required
        />
        {registerError && <p className="text-red-600">{registerError}</p>}
        {registerSuccess && <p className="text-green-600">{registerSuccess}</p>}
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Register;
