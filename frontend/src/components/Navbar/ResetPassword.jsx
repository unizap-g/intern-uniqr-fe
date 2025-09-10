import React, { useState } from "react";
import { useFormik } from "formik";
import { ArrowBigLeft } from 'lucide-react';
import axios from "axios";
import { Lock } from "lucide-react";
import ProfileModal from "./ProfileModal";
const ResetPassword = ({ mode = "mobile", mobileOrEmail, otp, onSuccess, onBack }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  // Removed showProfile state
  const URL = import.meta.env.VITE_API_URL;
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const payload = {
          event: "reset",
          mode,
          otp,
          "new-password": values.password,
        };
        if (mode === "mobile") {
          payload.mobile = mobileOrEmail;
          payload["country-code"] = "91";
        } else {
          payload.mobile = mobileOrEmail; // API uses `mobile` field even for email
        }
        const res = await axios.put(`${URL}/auth/password`, payload);
        if (res.data.status === "success") {
          console.log(":white_tick: Password reset successfully");
          if (onSuccess) onSuccess(res.data);
        } else {
          setErrors({ confirmPassword: "Password reset failed. Try again." });
        }
      } catch (error) {
        console.error(error);
        setErrors({ confirmPassword: "Something went wrong. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <div className="mb-5" onClick={() => {
        if (typeof onBack === "function") onBack();
      }}>
        <ArrowBigLeft />
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        {/* Password */}
        <div>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="New Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {isPasswordVisible ? ":see_no_evil:" : ":eye:"}
            </button>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div>
          <div className="relative">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <button
              type="button"
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {isConfirmPasswordVisible ? ":see_no_evil:" : ":eye:"}
            </button>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>
        {/* Submit */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full mt-4 py-3 text-white font-bold rounded-lg bg-[#065AD8] hover:bg-[#065AD8]/80 active:scale-95 transition"
        >
          {formik.isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );
};
export default ResetPassword;