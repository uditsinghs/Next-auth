"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/signup", input);
      console.log(data);
      setInput({
        username: "",
        email: "",
        password: ""
      })
    router.push("/login");
  } catch (error: any) {
    console.log(error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  setButtonDisabled(
    !(input.username.length > 0 && input.email.length > 0 && input.password.length > 0)
  );
}, [input]);

return (
  <div className="h-screen w-screen flex justify-center items-center">
    <form onSubmit={onSignup} className="flex justify-center items-center flex-col">
      <p className="mb-4 text-sm">Signup to get access to some benefits.</p>
      <input
        type="text"
        name="username"
        value={input.username}
        onChange={handleChange}
        placeholder="Enter username"
        className="py-2 mb-2 text-xl rounded-lg outline-none"
      />
      <input
        type="email"
        name="email"
        value={input.email}
        onChange={handleChange}
        placeholder="Enter email"
        className="py-2 mb-2 text-xl rounded-lg outline-none"
      />
      <input
        type="password"
        name="password"
        value={input.password}
        onChange={handleChange}
        placeholder="Enter password"
        className="py-2 mb-2 text-xl rounded-lg outline-none"
      />

      <button
        type="submit"
        disabled={buttonDisabled}
        className={`py-2 px-3 bg-black text-white rounded-md w-full hover:bg-slate-700 duration-300 ${buttonDisabled ? 'opacity-50' : ''}`}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>
      <p className="my-2 text-sm">If register..?<Link href={'/login'} className="underline text-blue-600">login</Link></p>
    </form>
  </div>
);
};

export default SignupPage;
