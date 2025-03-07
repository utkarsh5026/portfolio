import { memo } from "react";

export const GitHubPortfolios = memo(() => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 font-sans bg-[#0d1117] text-white">
      {/* Enhanced header section */}
      <div className="mb-12 border-b border-[#30363d] pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg
              className="w-10 h-10 mr-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <div>
              <h1 className="text-3xl font-bold text-white">
                GitHub Portfolios
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Discover leading developer portfolio templates
              </p>
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            <div className="px-3 py-2 rounded-md bg-[#161b22] border border-[#30363d] flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-400 text-sm">Back to Dashboard</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="px-3 py-1 rounded-full bg-[#2d2e32] text-green-400 mr-4 text-xs font-medium">
              REPOSITORIES
            </span>
            <span className="text-gray-300">portfolio-template</span>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-gray-400">120 results</span>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-md text-gray-300 text-sm hover:bg-[#1c2129] flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Sort
            </button>
            <button className="px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-md text-gray-300 text-sm hover:bg-[#1c2129] flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced search input */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Find a repository template..."
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-12 pr-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute left-4 top-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <div className="absolute right-4 top-3 flex items-center space-x-2">
          <div className="h-5 border-r border-[#30363d]"></div>
          <span className="text-xs text-gray-500">Press / to search</span>
        </div>
      </div>

      {/* Enhanced repository cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[1, 2, 3, 4].map((repo) => (
          <div
            key={repo}
            className="border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117] hover:bg-[#161b22] transition-colors group"
          >
            <div className="h-32 bg-gradient-to-r from-[#0d1117] to-[#161b22] relative overflow-hidden border-b border-[#30363d]">
              <div className="absolute inset-0 opacity-30 bg-[url('https://placehold.co/600x400/232a34/161b22?text=Preview')]"></div>
              <div className="absolute top-3 right-3 bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 text-xs text-gray-400">
                {repo === 1
                  ? "React"
                  : repo === 2
                  ? "Next.js"
                  : repo === 3
                  ? "Vue"
                  : "Svelte"}
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-[#238636] mr-2 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.5 2.5 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                  </svg>
                  <div>
                    <a
                      href="#"
                      className="text-blue-400 font-medium hover:underline group-hover:text-blue-300 transition-colors"
                    >
                      dev-name/portfolio-template-{repo}
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Updated {Math.floor(Math.random() * 30) + 1} days ago
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className="p-1.5 bg-transparent hover:bg-[#30363d] rounded-md transition-colors"
                    title="Star"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  <button
                    className="p-1.5 bg-transparent hover:bg-[#30363d] rounded-md transition-colors"
                    title="Fork"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-gray-300 mb-4 text-sm">
                A modern, responsive portfolio template for developers built
                with{" "}
                <span className="font-medium text-blue-400">
                  {repo === 1
                    ? "React"
                    : repo === 2
                    ? "Next.js"
                    : repo === 3
                    ? "Vue"
                    : "Svelte"}
                </span>{" "}
                and Tailwind CSS. Featuring dark mode, responsive design, and
                optimized performance.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-[#161b22] text-xs rounded-md text-gray-300">
                  responsive
                </span>
                <span className="px-2 py-1 bg-[#161b22] text-xs rounded-md text-gray-300">
                  dark-mode
                </span>
                <span className="px-2 py-1 bg-[#161b22] text-xs rounded-md text-gray-300">
                  portfolio
                </span>
              </div>

              <div className="flex items-center text-xs text-gray-400 pt-3 border-t border-[#30363d]">
                <div className="flex items-center mr-4">
                  <span className="w-3 h-3 rounded-full bg-yellow-300 mr-1.5"></span>
                  <span>JavaScript</span>
                </div>
                <div className="flex items-center mr-4">
                  <svg
                    className="w-4 h-4 mr-1.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                    />
                  </svg>
                  <span>{Math.floor(Math.random() * 2000) + 500}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    />
                  </svg>
                  <span>{Math.floor(Math.random() * 500) + 100}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Improved pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px overflow-hidden">
          <a
            href="#"
            className="relative inline-flex items-center px-3 py-2 bg-[#0d1117] border border-[#30363d] text-sm font-medium text-gray-400 hover:bg-[#161b22] rounded-l-md"
            title="Previous"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 bg-[#0d1117] border border-[#30363d] text-sm font-medium text-gray-400 hover:bg-[#161b22]"
          >
            1
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 bg-[#238636] border border-[#238636] text-sm font-medium text-white"
          >
            2
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 bg-[#0d1117] border border-[#30363d] text-sm font-medium text-gray-400 hover:bg-[#161b22]"
          >
            3
          </a>
          <span className="relative inline-flex items-center px-4 py-2 bg-[#0d1117] border border-[#30363d] text-sm font-medium text-gray-500">
            ...
          </span>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 bg-[#0d1117] border border-[#30363d] text-sm font-medium text-gray-400 hover:bg-[#161b22]"
          >
            12
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-3 py-2 bg-[#0d1117] border border-[#30363d] text-sm font-medium text-gray-400 hover:bg-[#161b22] rounded-r-md"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Next</span>
          </a>
        </nav>
      </div>

      {/* Added summary section */}
      <div className="mt-12 mb-8 border-t border-[#30363d] pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="flex items-center text-white text-lg font-medium mb-3">
              <svg
                className="w-5 h-5 mr-2 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Popular Templates
            </h3>
            <p className="text-gray-400 text-sm">
              Discover the most starred and forked portfolio templates from our
              community.
            </p>
          </div>

          <div className="p-5 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="flex items-center text-white text-lg font-medium mb-3">
              <svg
                className="w-5 h-5 mr-2 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              Framework Variety
            </h3>
            <p className="text-gray-400 text-sm">
              Choose from React, Next.js, Vue, Svelte and more for your perfect
              portfolio setup.
            </p>
          </div>

          <div className="p-5 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <h3 className="flex items-center text-white text-lg font-medium mb-3">
              <svg
                className="w-5 h-5 mr-2 text-purple-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Customizable Code
            </h3>
            <p className="text-gray-400 text-sm">
              All templates include clean, well-documented code that's easy to
              customize.
            </p>
          </div>
        </div>
      </div>

      {/* Footer with additional info */}
      <div className="mt-12 pt-6 border-t border-[#30363d] text-center">
        <p className="text-sm text-gray-400">
          Looking for something specific? Try our{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            advanced search
          </a>{" "}
          or{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            get in touch
          </a>{" "}
          for custom templates.
        </p>
      </div>
    </div>
  );
});
