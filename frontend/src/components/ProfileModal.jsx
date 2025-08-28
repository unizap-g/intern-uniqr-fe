import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProfileModal = ({ isOpen, onClose }) => {
	const [gender, setGender] = useState("");

	// Validation Schema with Yup
	const validationSchema = Yup.object({
		fullName: Yup.string()
			.max(50, "Full Name must be less than 50 characters")
			.required("Full Name is required")
			.matches(/^[A-Za-z\s]+$/, "Full Name must only contain letters"),
		mobile: Yup.string()
			// .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
			.matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
			.required("Mobile number is required"),
		email: Yup.string().email("Invalid email").required("Email is required"),
		dob: Yup.date().required("Date of Birth is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm Password is required"),
		gender: Yup.string().required("Please specify your gender"),
	});

	// Formik
	const formik = useFormik({
		initialValues: {
			fullName: "",
			mobile: "",
			email: "",
			dob: "",
			password: "",
			confirmPassword: "",
			gender: "",
		},
		validationSchema,
		onSubmit: (values) => {
			console.log("Form Submitted", { ...values, gender });
			onClose();
		},
	});
	return (
		<>
			{isOpen && (
				<div className="absolute inset-0 w-full h-[95vh] bg-white/30 backdrop-blur-sm"></div>
			)}

			<div
				className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
					isOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
				style={{ background: isOpen ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0)" }}
			>
				<div
					className={`relative bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 z-10 ml-40 transform transition-all duration-300 ${
						isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
					}`}
				>
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-4">
							<img
								src="profilePhoto.jpg"
								alt="Profile"
								className="w-16 h-16 rounded-full"
							/>
							<div>
								<p className="font-semibold">{formik.values.fullName}</p>
								<p className="text-gray-500 text-sm">{formik.values.mobile}</p>
							</div>
						</div>
						<button className="px-4 py-2 border rounded-lg font-bold text-blue-600 hover:bg-blue-50 hover:cursor-pointer">
							Change Photo
						</button>
					</div>

					{/* Form */}
					<form onSubmit={formik.handleSubmit} className="space-y-4">
						<div>
							<label className="block text-gray-700 mb-1">Full Name</label>
							<input
								type="text"
								name="fullName"
								onKeyDown={(e) => {
									if (!/^[A-Za-z\s]$/.test(e.key)) {
										e.preventDefault(); // blocks numbers & special characters
									}
								}}
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

						<div className="flex gap-4">
							<div className="flex-1">
								<label className="block text-gray-700 mb-1">Mobile</label>
								<input
									type="text"
									name="mobile"
									maxLength={10}
									onInput={(e) => {
										e.target.value = e.target.value.replace(/[^0-9]/g, ""); // blocks letters/symbols
										formik.setFieldValue("mobile", e.target.value);
									}}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mobile}
									className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
								/>
								{formik.touched.mobile && formik.errors.mobile && (
									<p className="text-red-500 text-sm">{formik.errors.mobile}</p>
								)}
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

						<div>
							<label className="block text-gray-700 mb-1">Date of Birth</label>
							<input
								type="date"
								name="dob"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.dob}
								className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 hover:cursor-pointer"
							/>
							{formik.touched.dob && formik.errors.dob && (
								<p className="text-red-500 text-sm">{formik.errors.dob}</p>
							)}
						</div>

						<div className="flex gap-4">
							<div className="flex-1">
								<label className="block text-gray-700 mb-1">Password</label>
								<input
									type="password"
									name="password"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.password}
									placeholder="Set Password"
									className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
								/>
								{formik.touched.password && formik.errors.password && (
									<p className="text-red-500 text-sm">
										{formik.errors.password}
									</p>
								)}
							</div>
							<div className="flex-1">
								<label className="block text-gray-700 mb-1">
									Confirm Password
								</label>
								<input
									type="password"
									name="confirmPassword"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.confirmPassword}
									placeholder="Confirm Password"
									className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
								/>
								{formik.touched.confirmPassword &&
									formik.errors.confirmPassword && (
										<p className="text-red-500 text-sm">
											{formik.errors.confirmPassword}
										</p>
									)}
							</div>
						</div>

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
											className="mr-1 hover:cursor-pointer"
											checked={formik.values.gender === g}
											onChange={formik.handleChange}
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
								className="bg-red-500 px-6 py-2 rounded-lg border border-gray-300 text-white hover:bg-red-700 hover:cursor-pointer"
								onClick={() => onClose()}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
							>
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ProfileModal;
