import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
// import useOverlayers from "../hooks/UseOverlayers.jsx";
import { useIsLogin } from "../../hooks/useIsLogin.js";
import DeleteAccountModal from "./DeleteAccountModal.jsx";
import ResetPassword from "./ResetPassword.jsx";

const URL = import.meta.env.VITE_API_URL;

const ProfileModal = ({ isOpen, onClose }) => {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { userDetails, setUserDetails } = useIsLogin();
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowResetPassword(false);
    }
  }, [isOpen]);
  console.log("ProfileModal - userDetails from context:", userDetails);
  console.log("ProfileModal - localStorage uuidApiKey:", localStorage.getItem("uuidApiKey"));
  
  // helper: convert dd-mm-yyyy → yyyy-mm-dd
  const toInputDate = (dobStr) => {
    if (!dobStr) return "";
    const [day, month, year] = dobStr.split("-");
    return `${year}-${month}-${day}`;
  };

  // helper: convert yyyy-mm-dd → dd-mm-yyyy
  const toApiDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (userDetails) {
      const d = userDetails;
      console.log("Setting form values from userDetails:", d);
      formik.setValues({
        firstName: d.firstName || "",
        lastName: d.lastName || "",
        email: d.email || "",
        phone: d.mobile || "",
        dateOfBirth: toInputDate(d.dob) || "",
        gender: d.gender || "",
        profilePhoto: d["profile-photo"] || "profilePhoto.jpg",
        password: d.passwordSet ? "********" : "",
        confirmPassword: d.passwordSet ? "********" : "",
      });
      console.log("Form values after setting:", formik.values);
    }
  }, [userDetails]);

  // Validation Schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(25, "First Name must be less than 25 characters")
      .required("First Name is required")
      .matches(/^[A-Za-z\s]+$/, "First Name must only contain letters"),
    lastName: Yup.string()
      .max(25, "Last Name must be less than 25 characters")
      .required("Last Name is required")
      .matches(/^[A-Za-z\s]+$/, "Last Name must only contain letters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: Yup.string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be in yyyy-mm-dd format"
      ),
    gender: Yup.string().required("Please specify your gender"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
      email: userDetails?.email || "",
      phone: userDetails?.mobile || "",
      dateOfBirth: userDetails?.dob ? toInputDate(userDetails.dob) : "",
      gender: userDetails?.gender || "",
      profilePhoto: userDetails?.["profile-photo"] || "profilePhoto.jpg",
      password: userDetails?.passwordSet ? "" : "",
      confirmPassword: userDetails?.passwordSet ? "" : "",
    },
    validationSchema,
    enableReinitialize: true, 
		onSubmit: async (values) => {
			console.log("Submitting form with values:", values);
			console.log("Form validation errors:", formik.errors);
			console.log("Form touched fields:", formik.touched);
  try {
    if (!userDetails?.["user-id"]) {
      alert("User not found, please try again");
      return;
    }

    // Prepare payload for API (using the working Test API logic)
    const updatedData = {
      "user-id": userDetails["user-id"],
      "profile-photo": values.profilePhoto || userDetails["profile-photo"],
      lastName: values.lastName,
      dob: toApiDate(values.dateOfBirth)
		// "user-id": "044eaae262eb",
    // "firstName": "Supratik",
    // "lastName": "Jana",
    // "dob": "25-09-1991",
    };
		console.log("Payload:", updatedData); 

    // Get API key from localStorage with fallback
    const uuidApiKey = localStorage.getItem("uuidApiKey");
    console.log("API Key from localStorage:", uuidApiKey);

    
    const res = await axios.put(`/auth/user`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": uuidApiKey || "test-development-key",
      },
    });

    console.log("API response:", res);

    const updatedUser = res.data.data || res.data.user;

    setUserDetails(updatedUser);

    formik.setValues({
      firstName: updatedUser.firstName || "",
      lastName: updatedUser.lastName || "",
      email: updatedUser.email || "",
      phone: updatedUser.mobile || "",
      dateOfBirth: toInputDate(updatedUser.dob),
      gender: updatedUser.gender || "",
      profilePhoto: updatedUser["profile-photo"] || "profilePhoto.jpg",
      password: updatedUser.passwordSet ? "********" : "",
      confirmPassword: updatedUser.passwordSet ? "********" : "",
    });

    onClose();
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update user. Please try again.");
  }
},  });

{deleteModalOpen && (
  <DeleteAccountModal
    isOpen={deleteModalOpen}
    onClose={() => setDeleteModalOpen(false)}
  />
)}

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full h-full sm:h-auto sm:max-w-lg rounded-none sm:rounded-2xl shadow-lg p-6 z-10">
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 mt-4">
          <div className="flex items-center space-x-4">
            <img src={formik.values.profilePhoto} alt="Profile" className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-semibold">
                {formik.values.firstName} {formik.values.lastName}
              </p>
              <p className="text-gray-500 text-sm">{formik.values.phone}</p>
            </div>
          </div>
          <button className="px-4 py-2 border rounded-lg font-bold text-blue-600 hover:bg-blue-50 hover:cursor-pointer">
            Change Photo
          </button>
        </div>

        {showResetPassword ? (
          <ResetPassword
            mode="mobile"
            mobileOrEmail={formik.values.phone}
            onSuccess={(data) => {
              alert(data.data.message);
              setShowResetPassword(false);
            }}
            onBack={() => setShowResetPassword(false)}
          />
        ) : (
          <form
          onSubmit={(e) => {
            console.log("Form submit event triggered");
            console.log("Form is valid:", formik.isValid);
            console.log("Form errors:", formik.errors);
            formik.handleSubmit(e);
          }}
          className="space-y-4 max-h-[80vh] overflow-y-auto"
        >
          {/* First Name */}
          <div>
            <label className="block text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="w-full border rounded-lg px-3 py-2"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="w-full border rounded-lg px-3 py-2"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
            )}
          </div>

          {/* Mobile + Email */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Mobile</label>
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                readOnly
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
              {userDetails?.mobile && (
                <span className="text-green-500 ml-2">✅</span>
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
                className="w-full border rounded-lg px-3 py-2"
              />
              {userDetails?.["email-verified"] && (
                <span className="text-green-500 ml-2">✅</span>
              )}
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth}
              className="w-full border rounded-lg px-3 py-2"
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {formik.errors.dateOfBirth}
              </p>
            )}
          </div>

          {/* Password fields (read-only info) */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Gender */}
          <div>
            <span className="text-gray-700">Gender</span>
            <div className="flex items-center space-x-4 mt-1">
              {["Male", "Female", "Others"].map((g) => (
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
                    className="mr-1"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <button
       type="button"
       onClick={() => setShowResetPassword(true)}
       className="w-full bg-indigo-500 px-4 py-2 rounded-lg text-white hover:bg-indigo-600"
      >
       Change Password
      </button>

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
            <button type="button" className="bg-gray-600 px-6 py-2 rounded-lg text-white hover:bg-gray-800" onClick={() => setDeleteModalOpen(true)}>
              Delete Account
            </button>
          </div>
        </form>
      )}

      {deleteModalOpen && (
        <DeleteAccountModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
    onConfirm={async () => {
      try {
        const uuidApiKey = localStorage.getItem("uuidApiKey");
        // if (!uuidApiKey) {
        //   alert("Session expired. Please log in again.");
        //   return;
        // }

        // ✅ Call delete API without user-id
        const res = await axios.delete(`${URL}/auth/user`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": uuidApiKey,
          },
        });

        console.log("Delete API response:", res.data);

        // Clear session
        localStorage.removeItem("uuidApiKey");
        setUserDetails(null);

        alert("Your account has been deleted successfully.");
        onClose(); // close ProfileModal
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete account. Please try again.");
      }
    }}
  />
)}



      </div>
    </div>
  );
};

export default ProfileModal;
