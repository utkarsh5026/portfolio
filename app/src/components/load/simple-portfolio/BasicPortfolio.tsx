import React from "react";

interface BasicPortfolioProps {
  layoutBroken: boolean;
}

const BasicPortfolio: React.FC<BasicPortfolioProps> = ({ layoutBroken }) => {
  return (
    <div
      className={`relative z-10 max-w-4xl mx-auto transition-transform duration-300 ${
        layoutBroken ? "layout-broken" : ""
      }`}
    >
      <img
        src="personal.jpg"
        alt="Utkarsh Priyadarshi"
        className="w-20 h-20 rounded-lg mb-5"
      />
      <h1 className="text-2xl font-serif">Utkarsh Priyadarshi</h1>
      <p className="text-base font-serif">Web Developer & Devops Engineer</p>

      <hr className="my-4" />

      <h2 className="text-xl font-serif mt-5 font-bold">About Me</h2>
      <p className="text-base font-serif mb-3">
        Hello, I am a web developer with experience in HTML, CSS, and
        JavaScript.
      </p>

      <h2 className="text-xl font-serif mt-5 font-bold">Skills</h2>
      <ul className="list-disc ml-6 mb-3">
        <li className="mb-1">HTML</li>
        <li className="mb-1">CSS</li>
        <li className="mb-1">JavaScript</li>
        <li className="mb-1">React</li>
      </ul>

      <h2 className="text-xl font-serif mt-5 font-bold">Projects</h2>

      {/* Broken images section */}
      <div className="project-section">
        <h3 className="text-lg font-serif mt-4 font-bold">Project 1</h3>
        <p className="text-base font-serif mb-2">
          An analysis tool for Skoda Auto India.
        </p>

        <h3 className="text-lg font-serif mt-4 font-bold">Project 2</h3>
        <p className="text-base font-serif mb-2">An e-commerce platform.</p>

        <h3 className="text-lg font-serif mt-4 font-bold">Project 3</h3>
        <p className="text-base font-serif mb-2">A portfolio website.</p>
      </div>

      <h2 className="text-xl font-serif mt-5 font-bold">Contact</h2>
      <p className="text-base font-serif mb-1">
        Email: utkarshpriyadarshi5026@gmail.com
      </p>
      <p className="text-base font-serif mb-3">Phone: +91 9876543210</p>

      <button className="mt-4 px-3 py-1 bg-gray-200 border border-gray-400 text-gray-800 rounded cursor-pointer hover:bg-gray-300">
        Contact Me
      </button>
    </div>
  );
};

export default BasicPortfolio;
