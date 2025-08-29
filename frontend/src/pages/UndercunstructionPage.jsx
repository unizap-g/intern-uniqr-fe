import React from 'react'


const UnderConstructionPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <svg className="w-20 h-20 text-purple-500 mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Website Under Development</h1>
        <p className="text-lg text-gray-600 mb-6 text-center max-w-md">We're working hard to bring you a better experience. Please check back soon!</p>
        <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium">All routes (*)</span>
      </div>
    </div>
  );
}

export default UnderConstructionPage;