"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return <button onClick={() => signIn("naver")}>네이버</button>;
};

export default Login;
