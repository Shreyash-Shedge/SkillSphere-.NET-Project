import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { registerCreator } from "../api/auth";

function CreatorSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !bio) {
      setError("All fields are required.");
      return;
    }
    if (name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }
    if (password[0] !== password[0].toUpperCase()) {
      setError("Password must start with an uppercase letter.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    try {
      await registerCreator({ name, email, password, bio });
      navigate("/"); // Redirect to the creator dashboard after successful registration
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed. Please check your inputs and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-lg py-16 sm:py-24 lg:py-32">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Sign up
              </h2>
            </div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-medium text-gray-700 text-left"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="E.g: John"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700 text-left"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="someone@example.com"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-700 text-left"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="************"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-base font-medium text-gray-700 text-left"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                >
                  Sign up
                </button>
              </div>
              <div className="text-center text-base text-gray-500">or</div>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="bg-white group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  Sign up using Google
                </button>
                <button
                  type="button"
                  className="bg-white group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  Sign up using Microsoft
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorSignUp;
