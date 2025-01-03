import React from "react";

const AboutMe: React.FC = () => {
  return (
    <section id="about" className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-white">About Me</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info Column */}
        <div className="space-y-4">
          <p className="text-slate-300">
            Hi there! I'm Utkarsh Priyadarshi, a DevOps Engineer passionate
            about building scalable infrastructure and automation solutions. I
            specialize in cloud technologies, containerization, and developing
            efficient CI/CD pipelines.
          </p>

          <p className="text-slate-300">
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, and working on personal
            projects to enhance my skills in database internals and programming
            language design.
          </p>

          {/* Quick Facts */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              Quick Facts
            </h3>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>🎓 Education: Computer Science Engineering</li>
              <li>📍 Based in India</li>
              <li>
                💼 Currently working at IDeaS - Revenue Management Software &
                Solutions
              </li>
              <li>🌱 Learning Database Internals and Compiler Design</li>
              <li>💬 Ask me about DevOps, Golang, Python, and System Design</li>
            </ul>
          </div>
        </div>

        {/* Image/Stats Column */}
        <div className="flex flex-col gap-4">
          {/* Profile image */}
          <img
            src="./personal.jpg"
            alt="Utkarsh Priyadarshi"
            className="rounded-lg w-full max-w-md mx-auto"
          />

          {/* Stats highlights */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-800 p-4 rounded-lg">
              <h4 className="text-white font-semibold">Tech Stack</h4>
              <p className="text-slate-300">
                Linux, Docker, Golang, Python, React
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <h4 className="text-white font-semibold">Focus Areas</h4>
              <p className="text-slate-300">
                DevOps, Automation, System Design
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
