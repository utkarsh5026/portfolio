import React, { useRef, useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  Award,
  Eye,
  User,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Search,
  Bell,
  ExternalLink,
  Code,
  Zap,
  Check,
  HelpCircle,
  ArrowUp,
  Filter,
  BarChart2,
} from "lucide-react";
import { redditData } from "./data";

// Define interfaces for our data structures
interface PortfolioTip {
  id: number;
  tip: string;
  details: string;
  icon?: React.ReactNode;
}

interface RelatedSubreddit {
  name: string;
  members: string;
}

interface Portfolio {
  tech: string[];
  features: string[];
  goal: string;
}

interface Comment {
  id: number;
  username: string;
  initial: string;
  color: string;
  timeAgo: string;
  content: string;
  upvotes: number;
  downvotes: number;
  replies: number;
  badge: string;
  portfolio: Portfolio;
}

interface RedditDataType {
  commentData: Comment[];
  portfolioTips: PortfolioTip[];
  relatedSubreddits: RelatedSubreddit[];
}

const RedditWebDev: React.FC = React.memo(() => {
  const [expandedComments, setExpandedComments] = useState<
    Record<number, boolean>
  >({});
  const [votes, setVotes] = useState<Record<string | number, number>>({});
  const [sortOrder, setSortOrder] = useState<string>("hot");
  const [joinedStatus, setJoinedStatus] = useState<boolean>(false);
  const [savedPosts, setSavedPosts] = useState<
    Record<string | number, boolean>
  >({});
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const redditRef = useRef<RedditDataType>(redditData);

  const { commentData, portfolioTips, relatedSubreddits } = redditRef.current;

  // Handler functions for interactivity
  const toggleComment = (id: number): void => {
    setExpandedComments({
      ...expandedComments,
      [id]: !expandedComments[id],
    });
  };

  const handleVote = (id: string | number, direction: "up" | "down"): void => {
    const currentVotes = votes[id] || 0;
    setVotes({
      ...votes,
      [id]:
        direction === "up"
          ? currentVotes === 1
            ? 0
            : 1
          : currentVotes === -1
          ? 0
          : -1,
    });
  };

  const toggleSavedPost = (id: string | number): void => {
    setSavedPosts({
      ...savedPosts,
      [id]: !savedPosts[id],
    });
  };

  // Function to calculate the adjusted vote count
  const getAdjustedVotes = (
    baseUpvotes: number,
    baseDownvotes: number,
    id: string | number
  ): number => {
    const userVote = votes[id] || 0;
    return baseUpvotes - baseDownvotes + userVote;
  };

  return (
    <div className="w-full mx-auto bg-[#0d1117] min-h-full font-sans">
      {/* Reddit header with search and actions */}
      <div className="bg-[#1a1b1c] border-b border-[#343536] py-2 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-[#ff4500] mr-2"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M16.69,12.35c-0.11-0.08-0.25-0.13-0.38-0.13c-0.14,0-0.28,0.05-0.39,0.13c-0.97,0.76-2.23,1.16-3.47,1.16c-1.24,0-2.5-0.4-3.47-1.16c-0.11-0.08-0.25-0.13-0.39-0.13c-0.13,0-0.27,0.05-0.38,0.13c-0.23,0.18-0.27,0.5-0.09,0.73c0.16,0.2,0.37,0.37,0.61,0.53c0.76,0.48,1.67,0.78,2.6,0.9c-0.71,0.32-1.2,1.04-1.2,1.87c0,1.13,0.92,2.05,2.05,2.05c1.13,0,2.05-0.92,2.05-2.05c0-0.84-0.5-1.55-1.21-1.87c0.92-0.12,1.84-0.42,2.59-0.9c0.24-0.16,0.45-0.33,0.61-0.53C16.95,12.85,16.91,12.53,16.69,12.35z M12.05,17.4c-0.56,0-1.02-0.46-1.02-1.02s0.46-1.02,1.02-1.02s1.02,0.46,1.02,1.02S12.61,17.4,12.05,17.4z" />
            <path d="M9.53,11.03c0.69,0.69,1.82,0.69,2.51,0c0.69-0.69,0.69-1.82,0-2.51c-0.69-0.69-1.82-0.69-2.51,0C8.84,9.21,8.84,10.34,9.53,11.03z" />
            <path d="M17.07,7.76c-0.23,0-0.45,0.09-0.62,0.23c-0.75-0.49-1.67-0.79-2.63-0.85l0.24-2.32c0.01-0.11,0.07-0.2,0.17-0.24l2.04-0.83c0.18,0.38,0.57,0.64,1.01,0.64c0.62,0,1.13-0.51,1.13-1.13S17.9,2.13,17.28,2.13c-0.48,0-0.88,0.3-1.05,0.72l-2.24,0.91c-0.32,0.13-0.54,0.42-0.57,0.75L11.07,7.1C9.5,7.08,8.07,7.47,6.95,8.2C6.77,8.08,6.56,8,6.33,8C5.7,8,5.2,8.5,5.2,9.13s0.5,1.13,1.13,1.13c0.29,0,0.55-0.11,0.75-0.29c0.22,0.25,0.42,0.53,0.59,0.83C7.05,11.37,6.64,12.33,6.64,13.38c0,2.49,3.53,4.51,7.87,4.51c4.34,0,7.87-2.02,7.87-4.51c0-1.06-0.42-2.03-1.06-2.61c0.17-0.29,0.37-0.57,0.59-0.83c0.2,0.18,0.46,0.29,0.75,0.29c0.63,0,1.13-0.5,1.13-1.13s-0.5-1.13-1.13-1.13c-0.23,0-0.44,0.08-0.62,0.2C20.93,7.47,19.5,7.08,17.93,7.1l-0.29-2.67c-0.03-0.33-0.25-0.62-0.57-0.75L14.82,2.8c-0.17-0.42-0.57-0.67-1.05-0.67c-0.62,0-1.13,0.51-1.13,1.13s0.5,1.13,1.13,1.13c0.44,0,0.83-0.26,1.01-0.64l2.04,0.83c0.1,0.04,0.16,0.13,0.17,0.24l0.24,2.32c-0.96,0.06-1.88,0.36-2.63,0.85c-0.17-0.14-0.39-0.23-0.62-0.23c-0.63,0-1.13,0.5-1.13,1.13s0.5,1.13,1.13,1.13c0.29,0,0.55-0.11,0.75-0.29c1.05,1.19,1.67,2.83,1.67,4.65c0,0.07,0,0.14-0.01,0.21c-0.74,0.33-1.55,0.51-2.4,0.51s-1.66-0.18-2.4-0.51c0-0.07-0.01-0.14-0.01-0.21c0-1.82,0.62-3.46,1.67-4.65c0.2,0.18,0.46,0.29,0.75,0.29c0.63,0,1.13-0.5,1.13-1.13s-0.5-1.13-1.13-1.13z" />
          </svg>
          <span className="text-white font-bold text-lg">reddit</span>
        </div>

        <div className="flex-1 mx-4 max-w-xl relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search r/webdev"
            className="w-full bg-[#272729] border border-[#343536] rounded-full pl-10 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-[#ff4500]"
          />
        </div>

        <div className="flex items-center space-x-3">
          <span className="p-1.5 rounded-full hover:bg-[#272729] text-gray-400 hidden md:block">
            <Bell size={20} />
          </span>
          <span className="bg-[#ff4500] hover:bg-[#ff5414] text-white px-4 py-1.5 rounded-full text-sm font-medium hidden md:block">
            Sign Up
          </span>
          <span className="p-1.5 rounded-full hover:bg-[#272729] text-gray-400 md:hidden">
            <Search size={20} />
          </span>
          <span className="p-1.5 rounded-full hover:bg-[#272729] text-gray-400">
            <MoreHorizontal size={20} />
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main content column */}
        <div className="md:col-span-2 space-y-4">
          {/* Subreddit header */}
          <div className="bg-[#1a1b1c] rounded-md overflow-hidden">
            <div className="h-12 bg-gradient-to-r from-[#ff4500] to-[#ff6a33]"></div>
            <div className="p-4 relative">
              <div className="flex items-start">
                <div className="absolute -top-6 w-16 h-16 rounded-full bg-[#ff4500] border-4 border-[#1a1b1c] flex items-center justify-center text-white">
                  <Code size={32} />
                </div>
                <div className="ml-20">
                  <div className="flex items-center">
                    <h1 className="text-xl font-bold text-white">r/webdev</h1>
                    <button
                      className={`ml-3 px-4 py-1 text-xs rounded-full ${
                        joinedStatus
                          ? "bg-[#1a1b1c] border border-white text-white"
                          : "bg-[#ff4500] text-white hover:bg-[#ff5414]"
                      }`}
                      onClick={() => setJoinedStatus(!joinedStatus)}
                    >
                      {joinedStatus ? "Joined" : "Join"}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    1.2M members • 2.3k online
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">
                A community dedicated to all things web development: front-end,
                back-end, design, workflow, best practices, and more
              </p>
            </div>
          </div>

          {/* Post sorting tabs */}
          <div className="flex bg-[#1a1b1c] rounded-md p-2">
            {["hot", "new", "top", "rising"].map((option) => (
              <button
                key={option}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  sortOrder === option
                    ? "bg-[#272729] text-white"
                    : "text-gray-400 hover:bg-[#272729]"
                }`}
                onClick={() => setSortOrder(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
            <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-400 hover:bg-[#272729] ml-auto flex items-center">
              <Filter size={16} className="mr-1.5" />
              Filter
            </button>
          </div>

          {/* Megathread post */}
          <div className="bg-[#1a1b1c] rounded-md">
            <div className="p-4">
              <div className="flex items-start">
                {/* Vote buttons */}
                <div className="flex flex-col items-center mr-2">
                  <button
                    className={`p-1 rounded-md hover:bg-[#272729] ${
                      votes["megathread"] === 1
                        ? "text-[#ff4500]"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleVote("megathread", "up")}
                  >
                    <ChevronUp size={20} />
                  </button>
                  <span
                    className={`text-sm font-medium my-1 ${
                      votes["megathread"] === 1
                        ? "text-[#ff4500]"
                        : votes["megathread"] === -1
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    {245 + (votes["megathread"] || 0)}
                  </span>
                  <button
                    className={`p-1 rounded-md hover:bg-[#272729] ${
                      votes["megathread"] === -1
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleVote("megathread", "down")}
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-[#3a9e46] flex items-center justify-center text-white font-bold mr-2">
                      M
                    </div>
                    <span className="text-gray-400 text-xs">
                      Posted by{" "}
                      <span className="text-blue-400">u/webdev_mod</span> 3 days
                      ago
                    </span>
                    <div className="ml-2 flex items-center gap-1">
                      <Award size={14} className="text-yellow-400" />
                      <span className="text-yellow-400 text-xs">2</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2">
                    Portfolio Feedback Megathread - February 2023
                  </h2>

                  <div className="flex items-center text-xs text-gray-400 mb-3 space-x-3">
                    <span className="flex items-center">
                      <MessageSquare size={14} className="mr-1" />
                      42 comments
                    </span>
                    <span className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      1.2k views
                    </span>
                    <span className="flex items-center">
                      <Award size={14} className="mr-1" />2 awards
                    </span>
                  </div>

                  <div className="bg-[#151516] p-4 rounded text-gray-300 mb-4">
                    <p className="mb-3">
                      Welcome to the r/webdev Portfolio Feedback Megathread!
                      This is the place to:
                    </p>
                    <ul className="list-disc ml-6 mb-3 space-y-1.5">
                      <li>Share your portfolio website</li>
                      <li>Get constructive feedback from fellow developers</li>
                      <li>Help others improve their online presence</li>
                      <li>Find inspiration for your own portfolio</li>
                    </ul>
                    <div className="bg-[#1f2023] border-l-4 border-yellow-500 p-3 rounded-r-md">
                      <p className="font-medium text-yellow-400 mb-1">
                        When sharing your portfolio, please include:
                      </p>
                      <ul className="list-disc ml-6 mt-1 space-y-1.5 text-gray-300">
                        <li>
                          Your target audience (recruiters, clients, etc.)
                        </li>
                        <li>Technologies used to build the site</li>
                        <li>Specific areas where you'd like feedback</li>
                        <li>How long you've been developing</li>
                      </ul>
                    </div>
                    <p className="mt-3 text-yellow-400 font-medium">
                      Remember to give feedback to others if you're asking for
                      it yourself!
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-gray-400 text-xs pt-2 border-t border-[#343536]">
                    <button className="p-1.5 rounded-md hover:bg-[#272729] flex items-center">
                      <MessageSquare size={16} className="mr-1.5" />
                      Comments
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-[#272729] flex items-center">
                      <Award size={16} className="mr-1.5" />
                      Award
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-[#272729] flex items-center">
                      <Share2 size={16} className="mr-1.5" />
                      Share
                    </button>
                    <button
                      className={`p-1.5 rounded-md hover:bg-[#272729] flex items-center ${
                        savedPosts["megathread"] ? "text-[#ff4500]" : ""
                      }`}
                      onClick={() => toggleSavedPost("megathread")}
                    >
                      <Bookmark size={16} className="mr-1.5" />
                      {savedPosts["megathread"] ? "Saved" : "Save"}
                    </button>
                    <span className="p-1.5 rounded-md hover:bg-[#272729]">
                      <MoreHorizontal size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment sorting */}
            <div className="px-4 py-2 border-t border-[#343536] flex items-center">
              <span className="text-sm text-gray-400 mr-2">Sort by:</span>
              <select
                className="bg-[#1a1b1c] text-white text-sm border-none focus:outline-none p-1"
                title="Sort by"
              >
                <option>Best</option>
                <option>Top</option>
                <option>New</option>
                <option>Controversial</option>
                <option>Old</option>
              </select>
            </div>

            {/* Comments section */}
            <div className="px-4 py-2 space-y-4">
              {commentData.map((comment) => (
                <div
                  key={comment.id}
                  className="border-t border-[#343536] pt-4"
                >
                  <div className="flex items-start">
                    {/* Vote buttons for comments */}
                    <div className="flex flex-col items-center mr-2">
                      <button
                        className={`p-1 rounded-md hover:bg-[#272729] ${
                          votes[`comment-${comment.id}`] === 1
                            ? "text-[#ff4500]"
                            : "text-gray-400"
                        }`}
                        onClick={() =>
                          handleVote(`comment-${comment.id}`, "up")
                        }
                      >
                        <ChevronUp size={16} />
                      </button>
                      <span
                        className={`text-xs font-medium my-1 ${
                          votes[`comment-${comment.id}`] === 1
                            ? "text-[#ff4500]"
                            : votes[`comment-${comment.id}`] === -1
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        {getAdjustedVotes(
                          comment.upvotes,
                          comment.downvotes,
                          `comment-${comment.id}`
                        )}
                      </span>
                      <button
                        className={`p-1 rounded-md hover:bg-[#272729] ${
                          votes[`comment-${comment.id}`] === -1
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                        onClick={() =>
                          handleVote(`comment-${comment.id}`, "down")
                        }
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2"
                          style={{ backgroundColor: comment.color }}
                        >
                          {comment.initial}
                        </div>
                        <div className="flex items-center flex-wrap">
                          <span className="text-gray-300 font-medium mr-2">
                            {comment.username}
                          </span>
                          <AuthorBadge type={comment.badge} />
                          <span className="text-gray-500 text-xs ml-2">
                            {comment.timeAgo} ago
                          </span>
                        </div>
                      </div>

                      <div className="text-gray-300 mt-2 whitespace-pre-line">
                        {comment.content}
                      </div>

                      {/* Portfolio details for each comment - expandable */}
                      <button
                        className="mt-2 py-1.5 px-3 rounded-md bg-[#232426] hover:bg-[#2a2b2d] text-xs text-gray-300 flex items-center transition-colors"
                        onClick={() => toggleComment(comment.id)}
                      >
                        {expandedComments[comment.id] ? (
                          <>
                            <ChevronUp size={14} className="mr-1.5" />
                            Hide portfolio details
                          </>
                        ) : (
                          <>
                            <ChevronDown size={14} className="mr-1.5" />
                            View portfolio details
                          </>
                        )}
                      </button>

                      {expandedComments[comment.id] && (
                        <div className="mt-3 bg-[#1f2023] p-3 rounded-md text-sm animate-fadeIn">
                          <div className="mb-2">
                            <div className="text-gray-400 mb-1 font-medium">
                              Technologies:
                            </div>
                            <div className="flex flex-wrap">
                              {comment.portfolio.tech.map((tech, i) => (
                                <TechBadge key={i} name={tech} />
                              ))}
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="text-gray-400 mb-1 font-medium">
                              Features:
                            </div>
                            <ul className="list-disc ml-5 text-gray-300">
                              {comment.portfolio.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center">
                            <div className="text-gray-400 mr-2 font-medium">
                              Target:
                            </div>
                            <div className="text-gray-300">
                              {comment.portfolio.goal}
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#343536] flex items-center">
                            <button className="px-3 py-1 bg-[#ff4500] text-white text-xs rounded-full hover:bg-[#ff5414] mr-2">
                              Visit Portfolio
                            </button>
                            <a
                              href="#"
                              className="text-blue-400 text-xs hover:underline"
                            >
                              View on GitHub
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <button className="flex items-center mr-4 hover:text-gray-300">
                          <MessageSquare size={14} className="mr-1" />
                          {comment.replies}{" "}
                          {comment.replies === 1 ? "reply" : "replies"}
                        </button>
                        <button className="flex items-center mr-4 hover:text-gray-300">
                          <Award size={14} className="mr-1" />
                          Award
                        </button>
                        <button className="mr-4 hover:text-gray-300">
                          Share
                        </button>
                        <button className="mr-4 hover:text-gray-300">
                          Report
                        </button>
                        <button
                          className={`hover:text-gray-300 flex items-center ${
                            savedPosts[`comment-${comment.id}`]
                              ? "text-[#ff4500]"
                              : ""
                          }`}
                          onClick={() =>
                            toggleSavedPost(`comment-${comment.id}`)
                          }
                        >
                          <Bookmark size={14} className="mr-1" />
                          {savedPosts[`comment-${comment.id}`]
                            ? "Saved"
                            : "Save"}
                        </button>
                      </div>

                      {/* Sample reply that shows up when clicking "View replies" would go here */}
                      {comment.id === 1 && (
                        <div className="mt-3 ml-8 pl-4 border-l-2 border-[#343536]">
                          <div className="flex items-center text-xs text-blue-400 font-medium mb-2">
                            <ArrowUp size={14} className="mr-1.5" />
                            Show replies (4)
                          </div>

                          <div className="bg-[#1f2023] rounded-md p-3">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-[#9a7ee3] flex items-center justify-center text-white font-bold mr-2">
                                R
                              </div>
                              <span className="text-gray-300 text-sm font-medium mr-1">
                                ReactPro
                              </span>
                              <span className="text-gray-500 text-xs">
                                8h ago
                              </span>
                            </div>
                            <div className="text-gray-300 text-sm mt-1.5">
                              Hey! I checked out your portfolio. The design is
                              clean but the mobile menu is a bit buggy on
                              iPhone. Try fixing the hamburger menu animation.
                              I'd also suggest adding more contrast to your text
                              for better accessibility.
                            </div>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <span className="flex items-center mr-3">
                                <ThumbsUp size={12} className="mr-1" />6
                              </span>
                              <button className="hover:text-gray-300 mr-3">
                                Reply
                              </button>
                              <button className="hover:text-gray-300">
                                Award
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-[#343536]">
                <div className="flex items-center justify-center py-2">
                  <button className="px-4 py-2 bg-[#272729] hover:bg-[#363638] transition-colors rounded-full text-gray-300 text-sm flex items-center">
                    <MessageSquare size={16} className="mr-2" />
                    Load more comments
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar columns */}
        <div className="space-y-4">
          {/* Portfolio tips card */}
          <div className="bg-[#1a1b1c] rounded-md p-4">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <BarChart2 size={18} className="text-[#ff4500] mr-2" />
              Portfolio Best Practices
            </h3>
            <div className="space-y-3">
              {portfolioTips.map((tip) => (
                <div key={tip.id} className="group">
                  <div
                    className="flex items-start cursor-pointer"
                    onClick={() =>
                      setExpandedTip(expandedTip === tip.id ? null : tip.id)
                    }
                  >
                    <div className="w-6 h-6 rounded-full bg-[#232426] flex items-center justify-center text-green-500 mr-3 mt-0.5 group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <Check size={12} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-gray-300 text-sm group-hover:text-white transition-colors flex items-center">
                          {tip.icon && (
                            <span className="text-[#ff4500] mr-1.5">
                              {tip.icon}
                            </span>
                          )}
                          {tip.tip}
                        </div>
                        <div className="text-gray-500">
                          {expandedTip === tip.id ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </div>
                      </div>

                      {expandedTip === tip.id && (
                        <div className="mt-2 pl-2 text-xs text-gray-400 border-l-2 border-[#343536] animate-fadeIn">
                          {tip.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related subreddits */}
          <div className="bg-[#1a1b1c] rounded-md p-4">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <MessageSquare size={18} className="text-[#ff4500] mr-2" />
              Related Communities
            </h3>

            <div className="space-y-3">
              {relatedSubreddits.map((sub, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#232426] p-2 rounded-md hover:bg-[#2a2b2d] transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4500] to-[#ff8c70] flex items-center justify-center text-white mr-3">
                    r/
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">
                      {sub.name}
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <User size={10} className="mr-1" />
                      {sub.members} members
                    </div>
                  </div>
                  <button className="ml-auto px-2 py-1 bg-[#ff4500] text-white text-xs rounded-full hover:bg-[#ff5414]">
                    Join
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-3 py-2 bg-[#232426] hover:bg-[#2a2b2d] transition-colors rounded-md text-sm text-gray-300">
              View more communities
            </button>
          </div>

          {/* Resources card */}
          <div className="bg-[#1a1b1c] rounded-md p-4">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <HelpCircle size={18} className="text-[#ff4500] mr-2" />
              Portfolio Resources
            </h3>

            <div className="space-y-2 text-sm">
              <a
                href="#"
                className="flex items-center text-blue-400 hover:underline py-1"
              >
                <ExternalLink size={14} className="mr-2" />
                Inspiring Portfolio Examples
              </a>
              <a
                href="#"
                className="flex items-center text-blue-400 hover:underline py-1"
              >
                <ExternalLink size={14} className="mr-2" />
                GitHub Repo of Portfolio Templates
              </a>
              <a
                href="#"
                className="flex items-center text-blue-400 hover:underline py-1"
              >
                <ExternalLink size={14} className="mr-2" />
                Technical Portfolio Checklist (PDF)
              </a>
              <a
                href="#"
                className="flex items-center text-blue-400 hover:underline py-1"
              >
                <ExternalLink size={14} className="mr-2" />
                Best Hosting Options for Portfolios
              </a>
            </div>

            <div className="mt-3 pt-3 border-t border-[#343536]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Created by</span>
                <span className="text-blue-400 hover:underline cursor-pointer">
                  u/webdev_resources
                </span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="p-4 text-xs text-gray-500">
            <div className="flex flex-wrap gap-2 mb-3">
              <a href="#" className="hover:text-gray-300">
                Content Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300">
                User Agreement
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300">
                Help
              </a>
            </div>
            <div className="text-center">
              Reddit Inc © 2023. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

interface AuthorBadgeProps {
  type: string;
}

const AuthorBadge: React.FC<AuthorBadgeProps> = ({ type }) => {
  let bgColor: string, textColor: string, icon: React.ReactNode;

  switch (type) {
    case "New Dev":
      bgColor = "bg-blue-500";
      textColor = "text-white";
      icon = <Code size={10} className="mr-0.5" />;
      break;
    case "Mid Level":
      bgColor = "bg-yellow-500";
      textColor = "text-black";
      icon = <Zap size={10} className="mr-0.5" />;
      break;
    case "Pro":
      bgColor = "bg-green-500";
      textColor = "text-white";
      icon = <Award size={10} className="mr-0.5" />;
      break;
    default:
      bgColor = "bg-gray-500";
      textColor = "text-white";
      icon = null;
  }

  return (
    <span
      className={`${bgColor} ${textColor} text-[10px] px-1.5 py-0.5 rounded-full flex items-center ml-2`}
    >
      {icon}
      {type}
    </span>
  );
};

interface TechBadgeProps {
  name: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ name }) => {
  const getColorForTech = (tech: string): string => {
    const techColors: Record<string, string> = {
      React: "bg-blue-600",
      "Next.js": "bg-black",
      Astro: "bg-purple-600",
      "Tailwind CSS": "bg-sky-500",
      "Framer Motion": "bg-purple-500",
      "Three.js": "bg-gray-800",
      GSAP: "bg-green-600",
      Vercel: "bg-black",
      "Minimal JS": "bg-yellow-500",
    };

    return techColors[tech] || "bg-gray-600";
  };

  return (
    <span
      className={`${getColorForTech(
        name
      )} text-white text-xs px-2 py-1 rounded mr-2 mb-2 inline-flex items-center`}
    >
      <Code size={12} className="mr-1" />
      {name}
    </span>
  );
};

export default RedditWebDev;
