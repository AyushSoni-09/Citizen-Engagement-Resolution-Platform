import React from "react";
import Navbar from "../Components/Nav";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/background----.jpg')] bg-cover bg-center scale-105" />

      {/* Gradient + Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-screen items-center px-6 md:px-20">
        <div className="max-w-3xl text-white">

          {/* Tagline */}
          <span className="inline-block mb-4 rounded-full bg-white/10 px-4 py-1 text-sm tracking-wide backdrop-blur">
            Smart Governance • Smart Cities
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Smart Complaint <br />
            <span className="text-blue-400">
              Management System
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
            A unified digital platform enabling citizens and city authorities
            to <span className="text-white font-medium">report</span>,{" "}
            <span className="text-white font-medium">track</span> and{" "}
            <span className="text-white font-medium">resolve</span> civic issues
            efficiently — from potholes and sanitation to street lighting —
            all in real time.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold shadow-lg transition hover:bg-blue-700 hover:scale-105">
              Register Complaint
            </button>

            <button className="rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-base font-semibold backdrop-blur transition hover:bg-white/20 hover:scale-105">
              Track Status
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-2xl font-bold">24×7</h3>
              <p className="text-sm text-gray-300">Service Access</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Fast</h3>
              <p className="text-sm text-gray-300">Issue Resolution</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Transparent</h3>
              <p className="text-sm text-gray-300">Process</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
