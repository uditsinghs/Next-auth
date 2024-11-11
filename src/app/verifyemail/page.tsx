"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VerifyPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);


  const verifyUserEmail = async () => {
    try {
      const { data } = await axios.post("/api/users/verifyemail", { token });
      if (data.success) {
        setIsVerified(true);
        setError(false)

      }
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || '')
    // const { query } = router;
    // const urlToken = query.token;
    // setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    if (isVerified) {
      router.push('/login')
    }
  }, [isVerified, router])
  return (
    <div className="flex w-screen h-screen justify-center items-center flex-col">
      <p className="text-xl text-black font-semibold text-center">Verify Email</p>
      {isVerified && (
        <p className="text-green-500 text-sm mt-4">Your email has been successfully verified!</p>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-4">There was an error verifying your email.</p>
      )}
      {token ? `${token}` : <p className=" py-2 px-4 bg-yellow-600 ">No Token</p>}
    </div>
  );
};

export default VerifyPage;
