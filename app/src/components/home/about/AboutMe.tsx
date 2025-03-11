import React from "react";
import Section from "@/components/section/Section";
import { motion } from "framer-motion";
import { FaLaptopCode, FaBook } from "react-icons/fa";
import Background from "./Background";
import Education from "./Education";

const AboutMe: React.FC = () => {
  return (
    <Section id="about" label="About Me" icon="class">
      <div className="max-w-4xl mx-auto">
        <div className="border border-[#313244] bg-[#181825] rounded-lg overflow-hidden shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#cba6f7]/5 to-transparent pointer-events-none"></div>

          <div className="bg-[#1e1e2e] px-4 py-3 border-b border-[#313244] flex items-center">
            <div className="text-[#cdd6f4] font-medium flex items-center">
              <span className="text-[#cba6f7] mr-2">~/portfolio/</span>
              <span>about_me.jsx</span>
            </div>
            <div className="ml-auto text-[#6c7086] text-xs">
              <span className="px-2 py-1 rounded bg-[#313244]/40">
                Utkarsh Priyadarshi
              </span>
            </div>
          </div>

          <div className="p-6 relative">
            {/* Decorative code line numbers */}
            <div className="absolute left-2 top-6 bottom-6 w-6 text-[#6c7086] text-xs flex flex-col items-end">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-6 opacity-50">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Content with increased left padding to accommodate line numbers */}
            <div className="space-y-8 pl-8">
              <Background />
              <Education />

              {/* Skills section with improved styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-gradient-to-r from-[#fab387] to-[#f9e2af] w-2 h-6 mr-3 rounded-sm"></div>
                  <h3 className="text-[#fab387] font-medium text-lg flex items-center">
                    <FaLaptopCode className="mr-2" /> Core Skills
                  </h3>
                </div>
                <div className="text-[#cdd6f4] ml-5 bg-[#1e1e2e]/30 p-4 rounded-md border-l-2 border-[#fab387]/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-[#313244]/30 rounded-md border border-[#313244]/50">
                      <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50">
                        Frontend
                      </div>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>React, Next.js, TypeScript</li>
                        <li>Tailwind CSS, Styled Components</li>
                        <li>Redux, React Query</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-[#313244]/30 rounded-md border border-[#313244]/50">
                      <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50">
                        Backend
                      </div>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>Node.js, Express, Python, Go</li>
                        <li>MongoDB, PostgreSQL, Redis, MySQL</li>
                        <li>GraphQL, REST API Design</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-[#313244]/30 rounded-md border border-[#313244]/50">
                      <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50">
                        DevOps & Cloud
                      </div>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>AWS, Google Cloud Platform</li>
                        <li>Docker, Kubernetes</li>
                        <li>CI/CD, GitHub Actions</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-[#313244]/30 rounded-md border border-[#313244]/50">
                      <div className="font-medium text-[#fab387] mb-2 pb-1 border-b border-[#313244]/50">
                        Tools & Others
                      </div>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>Git, GitHub</li>
                        <li>Agile Methodologies</li>
                        <li>Unit Testing, E2E Testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Philosophy section with elegant styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-gradient-to-r from-[#f38ba8] to-[#f5c2e7] w-2 h-6 mr-3 rounded-sm"></div>
                  <h3 className="text-[#f38ba8] font-medium text-lg flex items-center">
                    Philosophy
                  </h3>
                </div>
                <div className="text-[#cdd6f4] ml-5 leading-relaxed text-base bg-[#1e1e2e]/30 p-4 rounded-md border-l-2 border-[#f38ba8]/30">
                  <div className="relative">
                    <div className="absolute -left-8 top-0 text-[#f38ba8] opacity-40 text-2xl">
                      "
                    </div>
                    <p className="mb-3 pl-2">
                      I firmly believe in writing clean, maintainable code that
                      follows best practices and industry standards. My approach
                      to development is holistic — focusing not just on
                      functionality but also on performance, security, and
                      accessibility.
                    </p>
                    <p className="pl-2">
                      I value continuous learning and embrace challenges that
                      push me outside my comfort zone. I'm constantly exploring
                      new technologies and methodologies to stay at the
                      forefront of web development, and I enjoy sharing my
                      knowledge with the community through contributions to
                      open-source projects.
                    </p>
                    <div className="absolute -right-2 bottom-0 text-[#f38ba8] opacity-40 text-2xl">
                      "
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Interests section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-[#a6e3a1] w-2 h-6 mr-3"></div>
                  <h3 className="text-[#a6e3a1] font-medium text-lg flex items-center">
                    <FaBook className="mr-2" /> Interests & Hobbies
                  </h3>
                </div>
                <div className="text-[#cdd6f4] ml-5">
                  <p className="mb-3">
                    When I'm not coding, you can find me engaged in various
                    activities that keep me balanced and inspired:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium text-[#a6e3a1] mb-1">
                        Technical
                      </div>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>Contributing to open-source projects</li>
                        <li>Experimenting with new programming languages</li>
                        <li>Exploring AI/ML applications in web development</li>
                        <li>Reading technical blogs and papers</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-[#a6e3a1] mb-1">
                        Non-Technical
                      </div>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>Photography and digital art</li>
                        <li>Hiking and outdoor adventures</li>
                        <li>Chess and strategy games</li>
                        <li>Reading science fiction and philosophy</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-3 text-sm italic">
                    I'm always looking to connect with like-minded professionals
                    for collaborations and knowledge exchange. Feel free to
                    reach out!
                  </p>
                </div>
              </motion.div>

              {/* Current Focus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-[#f5c2e7] w-2 h-6 mr-3"></div>
                  <h3 className="text-[#f5c2e7] font-medium text-lg">
                    Current Focus
                  </h3>
                </div>
                <div className="text-[#cdd6f4] ml-5">
                  <p className="mb-2">
                    I'm currently focused on deepening my expertise in:
                  </p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      Advanced microservices architectures with Kubernetes
                    </li>
                    <li>Exploring LLM applications in web development</li>
                    <li>
                      Performance optimization techniques for modern web apps
                    </li>
                    <li>
                      Mastering database design and optimization strategies
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced footer with terminal-like status */}
          <div className="bg-[#1e1e2e] py-2 px-4 border-t border-[#313244] flex items-center text-xs text-[#6c7086]">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#a6e3a1] mr-1"></span>
              <span>active</span>
            </div>
            <div className="mx-auto">about_me.jsx - 152 lines</div>
            <div>utf-8</div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutMe;
