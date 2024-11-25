// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store/store";
// import { loginUser, registerUser } from "../slices/authSlice";
// import "./AuthPage.css"; 

// const AuthPage: React.FC = () => {
//   const [isRegister, setIsRegister] = useState(false); 
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const dispatch = useDispatch();
//   const authState = useSelector((state: RootState) => state.auth);
//   const { error } = authState;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isRegister) {
//       if (formData.password !== confirmPassword) {
//         alert("הסיסמאות אינן תואמות");
//         return;
//       }
//       await dispatch(registerUser(formData) as any); 
//     } else {
//       await dispatch(loginUser(formData) as any); 
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isRegister ? "הרשמה" : "התחברות"}</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">שם משתמש:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">סיסמה:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {isRegister && (
//           <div>
//             <label htmlFor="confirmPassword">אימות סיסמה:</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//         )}
//         <button type="submit">{isRegister ? "הרשמה" : "התחברות"}</button>
//       </form>
//       <p>
//         {isRegister ? "כבר יש לך חשבון?" : "אין לך חשבון?"}{" "}
//         <button
//           type="button"
//           onClick={() => setIsRegister((prev) => !prev)}
//           className="toggle-btn"
//         >
//           {isRegister ? "התחברות" : "הרשמה"}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default AuthPage;
