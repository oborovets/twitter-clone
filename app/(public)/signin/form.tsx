"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Form() {
  const router = useRouter();
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/feed");
    } else {
      // TODO: Provide a better error message
      alert("Log In Failed");
    }
  }

  return (
    <form
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="text-center">
        <h3 className="font-semibold">Sign In</h3>
      </div>
      <div className="my-3">
        <hr />
      </div>
      <div className="flex flex-col gap-2">
        <label>Username</label>
        <input
          className="text-black p-3 border border-slate-700 rounded-lg"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Password</label>
        <input
          className="text-black p-3 border border-slate-700 rounded-lg"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className="mt-4 bg-slate-900 text-white p-3 rounded-lg"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
}

export default Form;
