"use client";
import React, { useState, useEffect } from "react";
import { LoginCredentials } from "@/types/auth";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  loginUser,
  clearError,
  logoutUser,
  restoreAuth,
} from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const [username , setUserName] = useState("")
  const [password, setPassword] = useState("");
  const router = useRouter()


  const handleSubmit = () => {
    console.log(username , password)
    if (!username || !password) {
      return;
    }
    dispatch(loginUser({username , password}));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (isAuthenticated) {
   router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Tizimga kirish
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                UserName
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                disabled={isLoading}
                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition duration-150 ease-in-out"
                placeholder="Username kiriting"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition duration-150 ease-in-out"
                placeholder="Parol kiriting"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Tizimga kirish"
                )}
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default LoginForm;
