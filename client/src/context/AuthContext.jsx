// import React, { createContext, useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [user, setUser] = useState(() => {
//     // Initialize state from localStorage if available
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Save user to localStorage on change
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);  const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     username:"",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "user",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       role: "user",
//     });
//     setMessage("");
//   };


//   const toggleSignup = () => {
//     const newSignupState = !isSignup;  // Store the new state before setting it
//     setIsSignup(newSignupState);       // Update the state
//     // Navigate to the correct route based on the newSignupState
//     navigate(newSignupState ? "/signup" : "/login");
//     setMessage(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isSignup,
//         user,
//         setIsSignup,
//         setUser,
//         form,
//         message,
//         handleChange,
//         setMessage,
//         resetForm,
//         toggleSignup,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.token) {
        localStorage.setItem("token", user.token);
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    });
    setMessage("");
  };

  const toggleSignup = () => {
    const newSignup = !isSignup;
    setIsSignup(newSignup);
    navigate(newSignup ? "/signup" : "/login");
    setMessage(null);
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Logout failed.");
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      navigate("/login");
    }
  };

  const updateUser = async (formData) => {
    try {
      const token =localStorage.getItem("token");

      const res = await axios.patch(
        "http://localhost:3000/api/v1/users/updateMe",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.data.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update user error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
    try {
      const token =localStorage.getItem("token");

      const res = await axios.patch(
        "http://localhost:3000/api/v1/users/updateMyPassword",
        {
          passwordCurrent,
          password,
          passwordConfirm,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.data.user);
      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Update password error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update password.");
    }
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        "http://localhost:3000/api/v1/users/deleteMe",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Account deleted successfully.");
      logout();
    } catch (error) {
      console.error("Delete user error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to delete account.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isSignup,
        setIsSignup,
        toggleSignup,
        user,
        setUser,
        form,
        message,
        handleChange,
        setMessage,
        resetForm,
        logout,
        updateUser,
        updatePassword,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
