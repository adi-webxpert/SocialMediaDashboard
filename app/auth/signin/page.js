"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        return console.log("Invalid Credentials");
      }
      console.log("Login successfully");
      router.replace("/tests");
    } catch (error) {
      // errorMsg(error);
      console.log("error", error);
    }
  };

  return (
    <div
      className="login-modal"
      style={{
        height: "auto",
        width: "300px",
      }}
    >
      <h2>Login </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ alignItems: "center" }}>
          <label htmlFor="email" style={{ color: "darkblack" }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {email == "" ? (
            <span style={{ color: "red" }}>Email is required</span>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {password == "" ? (
            <span style={{ color: "red" }}>Password is required</span>
          ) : null}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;