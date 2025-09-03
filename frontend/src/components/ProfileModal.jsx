// import React, { useEffect } from "react";
// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
//   const URL = import.meta.env.VITE_API_URL;
// const ProfileModal = ({ isOpen, onClose, user, setUser }) => {
//   // Validation Schema with Yup
//   const validationSchema = Yup.object({
//     fullName: Yup.string()
//       .max(25, "Full Name must be less than 25 characters")
//       .required("Full Name is required")
//       .matches(/^[A-Za-z\s]+$/, "Full Name must only contain letters"),
//     mobile: Yup.string()
//       .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
//       .required("Mobile number is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     dateOfBirth: Yup.date().required("Date of Birth is required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//     gender: Yup.string().required("Please specify your gender"),
//   });

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       fullName: "",
//       phone: "",
//       email: "",
//       dateOfBirth: "",
//       password: "",
//       confirmPassword: "",
//       gender: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const updatedData = {
//           fullName: values.fullName,
//           email: values.email,
//           dateOfBirth: values.dob,
//           gender: values.gender,
//           phone: values.mobile,
//         };

//         const res = await axios.patch(`${URL}/profile`, updatedData);

//         setUser({
//           name: res.data.user.fullName,
//           email: res.data.user.email,
//           dateOfBirth: res.data.user.dateOfBirth,
//           gender: res.data.user.gender,
//           phone: res.data.user.phone,
//         });

//         onClose();
//       } catch (err) {
//         console.error("Error updating profile", err);
//         alert(err.response?.data?.message || "Failed to update profile");
//       }
//     },
//   });

//   // Prefill form values when modal opens
//   useEffect(() => {
//     if (isOpen && user) {
//       formik.setValues({
//         fullName: user.name || "New User",
//         phone: user.phone || "",
//         email: user.email || "",
//         dateOfBirth: user.dateOfBirth || "",
//         password: "",
//         confirmPassword: "",
//         gender: user.gender || "",
//       });
//     }
//   }, [isOpen, user]);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Background Blur */}
//       <div className="absolute inset-0 w-full h-[95vh] bg-white/30 backdrop-blur-sm"></div>

//       <div
//         className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
//           isOpen
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//         }`}
//         style={{ background: isOpen ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0)" }}
//       >
//         <div
//           className={`relative bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 z-10 ml-40 transform transition-all duration-300 ${
//             isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
//           }`}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <img
//                 src="profilePhoto.jpg"
//                 alt="Profile"
//                 className="w-16 h-16 rounded-full"
//               />
//               <div>
//                 <p className="font-semibold">{formik.values.fullName}</p>
//                 <p className="text-gray-500 text-sm">{formik.values.phone}</p>
//               </div>
//             </div>
//             <button className="px-4 py-2 border rounded-lg font-bold text-blue-600 hover:bg-blue-50 hover:cursor-pointer">
//               Change Photo
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={formik.handleSubmit} className="space-y-4">
//             {/* Full Name */}
//             <div>
//               <label className="block text-gray-700 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 maxLength={25}
//                 name="fullName"
//                 onKeyDown={(e) => {
//                   // Allow control keys
//                   if (
//                     [
//                       "Backspace",
//                       "Delete",
//                       "ArrowLeft",
//                       "ArrowRight",
//                       "Tab",
//                     ].includes(e.key)
//                   ) {
//                     return;
//                   }

//                   // Allow only letters and spaces
//                   if (!/^[A-Za-z\s]$/.test(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.fullName}
//                 placeholder="Enter your name"
//                 className="w-full border text-gray-500 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
//               />

//               {formik.touched.fullName && formik.errors.fullName && (
//                 <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
//               )}
//             </div>

//             {/* Mobile + Email */}
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="block text-gray-700 mb-1">Mobile</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   maxLength={10}
//                   onInput={(e) => {
//                     e.target.value = e.target.value.replace(/[^0-9]/g, ""); // blocks letters/symbols
//                     formik.setFieldValue("phone", e.target.value);
//                   }}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.phone}
//                   readOnly // Phone number cannot be changed
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100 cursor-not-allowed"
//                 />
//                 {formik.touched.phone && formik.errors.phone && (
//                   <p className="text-red-500 text-sm">{formik.errors.phone}</p>
//                 )}
//               </div>
//               <div className="flex-1">
//                 <label className="block text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.email}
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <p className="text-red-500 text-sm">{formik.errors.email}</p>
//                 )}
//               </div>
//             </div>

//             {/* DOB */}
//             <div>
//               <label className="block text-gray-700 mb-1">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.dateOfBirth}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 hover:cursor-pointer"
//               />
//               {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
//                 <p className="text-red-500 text-sm">
//                   {formik.errors.dateOfBirth}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
// <div className="flex gap-4">
//   <div className="flex-1">
//     <label className="block text-gray-700 mb-1">Password</label>
//     <input
//       type="password"
//       name="password"
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       value={formik.values.password}
//       placeholder="Set Password"
//       disabled
//       className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
//     />
//   </div>
//   <div className="flex-1">
//     <label className="block text-gray-700 mb-1">
//       Confirm Password
//     </label>
//     <input
//       type="password"
//       name="confirmPassword"
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       value={formik.values.confirmPassword}
//       placeholder="Confirm Password"
//       disabled
//       className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
//     />
//   </div>
//             </div>

//             {/* Gender */}
//             <div>
//               <span className="text-gray-700">Gender</span>
//               <div className="flex items-center space-x-4 mt-1">
//                 {["male", "female", "others"].map((g) => (
//                   <label
//                     key={g}
//                     className={
//                       formik.values.gender === g
//                         ? "text-blue-600 font-semibold"
//                         : "text-gray-700"
//                     }
//                   >
//                     <input
//                       type="radio"
//                       name="gender"
//                       value={g}
//                       className="mr-1 hover:cursor-pointer"
//                       checked={formik.values.gender === g}
//                       onChange={formik.handleChange}
//                     />
//                     {g.charAt(0).toUpperCase() + g.slice(1)}
//                   </label>
//                 ))}
//               </div>
//               {formik.touched.gender && formik.errors.gender && (
//                 <p className="text-red-500 text-sm">{formik.errors.gender}</p>
//               )}
//             </div>

//             {/* Buttons */}
//             <div className="mt-6 flex justify-center gap-4">
//               <button
//                 type="button"
//                 className="bg-red-500 px-6 py-2 rounded-lg border border-gray-300 text-white hover:bg-red-700 hover:cursor-pointer"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfileModal;

import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const URL = import.meta.env.VITE_API_URL;

const ProfileModal = ({ isOpen, onClose, user, setUser }) => {
	// Validation Schema with Yup (only required editable fields)
	const validationSchema = Yup.object({
		fullName: Yup.string()
			.max(25, "Full Name must be less than 25 characters")
			.required("Full Name is required")
			.matches(/^[A-Za-z\s]+$/, "Full Name must only contain letters"),
		email: Yup.string().email("Invalid email").required("Email is required"),
		// dateOfBirth: Yup.date().required("Date of Birth is required"),
		dateOfBirth: Yup.string()
			.required("Date of Birth is required")
			.matches(
				/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
				"Date of Birth must be in yyyy-mm-dd format"
			)
			.max(new Date(), "Date of Birth cannot be in the future")
			.test("not-in-future", "Date of Birth cannot be in the future", (val) => {
				if (!val) return false;
				const [y, m, d] = val.split("-").map(Number);
				const dob = new Date(y, m - 1, d);
				if (Number.isNaN(dob.getTime())) return false;
				const today = new Date();
				// Normalize time for a pure date compare
				dob.setHours(0, 0, 0, 0);
				today.setHours(0, 0, 0, 0);
				return dob <= today;
			}),
		gender: Yup.string().required("Please specify your gender"),
	});

	// Formik setup
	const formik = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			phone: "",
			dateOfBirth: "",
			gender: "",
			password: "", // not editable
			confirmPassword: "", // not editable
		},
		validationSchema,

		// onSubmit: async (values) => {
		// 	try {
		// 		if (!user?._id) {
		// 			alert("User not found, please try again");
		// 			return;
		// 		}

		// 		const updatedData = {
		// 			fullName: values.fullName,
		// 			email: values.email,
		// 			dateOfBirth: values.dateOfBirth,
		// 			gender: values.gender,
		// 			phone: values.phone, // read-only, sent as-is
		// 			apiKey: localStorage.getItem("apiKey"),
		// 		};
		// 		const key = localStorage.setItem("uuidApiKey",res.data.uuidApiKey);

		// 	console.log("updatedData: ", updatedData);
		// 		console.log("uuidfrom profile", key);
		// 		// const res = await axios.patch(`${URL}/user/profile`, updatedData, {
		// 		// 	headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		// 		// });

		// 		// store API key in localStorage

		// 		// const res = await axios.patch(
		// 		// 	`${URL}/user/profile`,
		// 		// 	{ ...updatedData, apiKey }, // include apiKey if required in body
		// 		// 	{
		// 		// 		headers: {
		// 		// 			Authorization: `Bearer ${localStorage.getItem("token")}`,
		// 		// 			"Content-Type": "application/json",
		// 		// 		},
		// 		// 	}
		// 		// );

		// 		const res = await axios.patch(`${URL}/user/profile`, updatedData, {
		// 			headers: {
		// 				"x-api-key": localStorage.getItem("updatedData.apiKey") || "",
		// 				"Content-Type": "application/json",
		// 			},
		// 		});

		// 		setUser(res.data.user); // update local state
		// 		onClose();
		// 	} catch (err) {
		// 		console.error("Error updating profile", err);
		// 		alert(err.response?.data?.message || "Failed to update profile");
		// 	}
		// },
		onSubmit: async (values) => {
			console.log("Submitting data:", values);
			try {
				if (!user?._id) {
					alert("User not found, please try again");
					return;
				}

				// format yyyy-mm-dd → dd-mm-yyyy
				const formatDate = (dateStr) => {
					if (!dateStr) return "";
					const [year, month, day] = dateStr.split("-");
					return `${day}-${month}-${year}`;
				};

				const updatedData = {
					fullName: values.fullName,
					email: values.email,
					dateOfBirth: formatDate(values.dateOfBirth),
					gender: values.gender,
					// phone: values.phone, // read-only
				};

				// get API key
				const uuidApiKey = localStorage.getItem("uuidApiKey");
				if (!uuidApiKey) {
					console.error("API key missing. Cannot update profile.");
					alert("Session expired. Please log in again.");
					return;
				}

				console.log("PATCH Body:", updatedData);
				console.log("PATCH Headers:", {
					"x-api-key": uuidApiKey,
					"Content-Type": "application/json",
				});

				// send request
				const res = await axios.patch(`${URL}/user/profile`, updatedData, {
					headers: {
						"x-api-key": uuidApiKey,
						"Content-Type": "application/json",
					},
				});

				// update local user state
				setUser(res.data.user);

				// update apiKey if backend sends a fresh one
				if (res.data.uuidApiKey) {
					localStorage.setItem("uuidApiKey", res.data.uuidApiKey);
				}

				onClose();
			} catch (err) {
				console.error("Error updating profile", err);
				alert(err.response?.data?.message || "Failed to update profile");
			}
		},
	});

	// Prefill form values when modal opens
	useEffect(() => {
		if (isOpen && user) {
			formik.setValues({
				fullName: user.fullName || "",
				phone: user.phone || "",
				email: user.email || "",
				dateOfBirth: user.dateOfBirth || "",
				gender: user.gender || "",
				password: "",
				confirmPassword: "",
			});
		}
	}, [isOpen, user]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300">
			{/* Background Overlay */}
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm"
				onClick={onClose}
			></div>

			{/* Modal Content */}
			<div className="relative bg-white w-full h-full sm:h-auto sm:max-w-lg rounded-none sm:rounded-2xl shadow-lg p-6 z-10 transform transition-all duration-300">
				{/* Close Button */}
				<button
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
					onClick={onClose}
				>
					✕
				</button>

				{/* Header */}
				<div className="flex items-center justify-between mb-6 mt-4">
					<div className="flex items-center space-x-4">
						<img
							src="profilePhoto.jpg"
							alt="Profile"
							className="w-16 h-16 rounded-full"
						/>
						<div>
							<p className="font-semibold">{formik.values.fullName}</p>
							<p className="text-gray-500 text-sm">{formik.values.phone}</p>
						</div>
					</div>
					<button className="px-4 py-2 border rounded-lg font-bold text-blue-600 hover:bg-blue-50 hover:cursor-pointer">
						Change Photo
					</button>
				</div>

				{/* Form */}
				<form
					onSubmit={formik.handleSubmit}
					className="space-y-4 overflow-y-auto max-h-[80vh] sm:max-h-none"
				>
					{/* Full Name */}
					<div>
						<label className="block text-gray-700 mb-1">Full Name</label>
						<input
							type="text"
							name="fullName"
							maxLength={25}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.fullName}
							placeholder="Enter your name"
							className="w-full border text-gray-500 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
						/>
						{formik.touched.fullName && formik.errors.fullName && (
							<p className="text-red-500 text-sm">{formik.errors.fullName}</p>
						)}
					</div>

					{/* Mobile + Email */}
					<div className="flex gap-4">
						<div className="flex-1">
							<label className="block text-gray-700 mb-1">Mobile</label>
							<input
								type="number"
								name="phone"
								value={formik.values.phone}
								readOnly
								className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
							/> 

						</div>
						<div className="flex-1">
							<label className="block text-gray-700 mb-1">Email</label>
							<input
								type="email"
								name="email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
								className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
							/>
							{formik.touched.email && formik.errors.email && (
								<p className="text-red-500 text-sm">{formik.errors.email}</p>
							)}
						</div>
					</div>

					{/* DOB */}
					<div>
						<label className="block text-gray-700 mb-1">Date of Birth</label>
						{/* <input
							type="date"
							name="dateOfBirth"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.dateOfBirth}
							className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
						/> */}
						<input
							type="date"
							name="dateOfBirth"
							placeholder="dd-mm-yyyy"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.dateOfBirth}
							className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
						/>
						{formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
							<p className="text-red-500 text-sm">
								{formik.errors.dateOfBirth}
							</p>
						)}
					</div>

					{/* <div className="flex gap-4"> */}
					<div className="flex-1">
						<label className="block text-gray-700 mb-1">Password</label>
						<input
							type="password"
							name="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							placeholder="Set Password"
							disabled
							className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
						/>
					</div>
					<div className="flex-1">
						<label className="block text-gray-700 mb-1">Confirm Password</label>
						<input
							type="password"
							name="confirmPassword"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.confirmPassword}
							placeholder="Confirm Password"
							disabled
							className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
						/>
					</div>

					{/* Gender */}
					<div>
						<span className="text-gray-700">Gender</span>
						<div className="flex items-center space-x-4 mt-1">
							{["male", "female", "others"].map((g) => (
								<label
									key={g}
									className={
										formik.values.gender === g
											? "text-blue-600 font-semibold"
											: "text-gray-700"
									}
								>
									<input
										type="radio"
										name="gender"
										value={g}
										checked={formik.values.gender === g}
										onChange={formik.handleChange}
										className="mr-1 hover:cursor-pointer"
									/>
									{g.charAt(0).toUpperCase() + g.slice(1)}
								</label>
							))}
						</div>
						{formik.touched.gender && formik.errors.gender && (
							<p className="text-red-500 text-sm">{formik.errors.gender}</p>
						)}
					</div>

					{/* Buttons */}
					<div className="mt-6 flex justify-center gap-4">
						<button
							type="button"
							onClick={onClose}
							className="bg-red-500 px-6 py-2 rounded-lg text-white hover:bg-red-700"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-600 px-6 py-2 rounded-lg text-white hover:bg-blue-700"
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileModal;
