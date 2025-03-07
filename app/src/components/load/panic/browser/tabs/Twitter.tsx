import {
  FiRepeat,
  FiMessageCircle,
  FiHeart,
  FiShare2,
  FiMoreHorizontal,
  FiBookmark,
  FiSearch,
  FiHash,
  FiBell,
  FiMail,
  FiHome,
  FiUser,
  FiLink,
  FiImage,
  FiSmile,
  FiCalendar,
  FiMapPin,
  FiStar,
} from "react-icons/fi";
import { SiGithub, SiVercel } from "react-icons/si";
import { FaHeart } from "react-icons/fa";
import { Avatar } from "@/components/ui/avatar";
import { twitterData } from "./data";
import React, { useRef, useState, memo } from "react";

type TweetType = (typeof twitterData.tweets)[number];
type TweetActionType = Record<number, boolean>;

const Twitter = memo(() => {
  // State for interactive elements
  const [activeTab, setActiveTab] = useState("for-you");
  const [likedTweets, setLikedTweets] = useState<TweetActionType>({});
  const [retweetedTweets, setRetweetedTweets] = useState<TweetActionType>({});
  const [bookmarkedTweets, setBookmarkedTweets] = useState<TweetActionType>({});
  const [showCompose, setShowCompose] = useState(false);
  const [tweetContent, setTweetContent] = useState("");
  const dataRef = useRef(twitterData);
  const { tweets, trendingTopics, whoToFollow } = dataRef.current;

  const handleLike = (id: number) => {
    setLikedTweets({
      ...likedTweets,
      [id]: !likedTweets[id],
    });
  };

  const handleRetweet = (id: number) => {
    setRetweetedTweets({
      ...retweetedTweets,
      [id]: !retweetedTweets[id],
    });
  };

  const handleBookmark = (id: number) => {
    setBookmarkedTweets({
      ...bookmarkedTweets,
      [id]: !bookmarkedTweets[id],
    });
  };

  // Components for different media types
  const renderTweetMedia = (tweet: TweetType) => {
    if (!tweet.hasMedia) return null;

    if (tweet.mediaType === "code") {
      return (
        <div className="mt-3 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1 bg-gray-800 text-xs text-gray-400">
            <span>code.js</span>
            <span className="hover:text-white cursor-pointer">Copy</span>
          </div>
          <pre className="p-3 text-xs text-gray-300 overflow-x-auto whitespace-pre">
            {tweet.codeSnippet}
          </pre>
        </div>
      );
    }

    if (tweet.mediaType === "graph") {
      return (
        <div className="mt-3 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden p-4">
          {/* SVG based graph representation */}
          <div className="h-40 w-full flex items-end justify-between space-x-2">
            <div className="bg-blue-500 w-full h-20 rounded-t-sm"></div>
            <div className="bg-blue-500 w-full h-32 rounded-t-sm"></div>
            <div className="bg-blue-500 w-full h-24 rounded-t-sm"></div>
            <div className="bg-blue-500 w-full h-36 rounded-t-sm"></div>
            <div className="bg-blue-500 w-full h-28 rounded-t-sm"></div>
            <div className="bg-blue-500 w-full h-16 rounded-t-sm"></div>
            <div className="bg-blue-500 w-full h-30 rounded-t-sm"></div>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>Last 7 days</span>
            <span>+45% growth</span>
          </div>
        </div>
      );
    }

    if (tweet.mediaType === "diagram") {
      return (
        <div className="mt-3 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden p-4">
          {/* SVG based simple CI/CD pipeline visualization */}
          <div className="flex items-center justify-between text-xs text-white">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center mb-2">
                <SiGithub size={24} />
              </div>
              <span>Commit</span>
            </div>
            <div className="w-10 h-1 bg-blue-500"></div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center mb-2">
                <FiRepeat size={24} />
              </div>
              <span>CI/Tests</span>
            </div>
            <div className="w-10 h-1 bg-blue-500"></div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center mb-2">
                <SiVercel size={24} />
              </div>
              <span>Deploy</span>
            </div>
          </div>
        </div>
      );
    }

    // Default case: link preview
    if (tweet.link) {
      return (
        <div className="mt-3 border border-gray-800 rounded-lg overflow-hidden">
          <div className="p-3">
            <div className="text-gray-400 text-xs flex items-center mb-2">
              <FiLink className="mr-2" /> {tweet.link.url}
            </div>
            <div className="text-white font-bold">{tweet.link.title}</div>
            <div className="text-gray-400 text-sm mt-1">
              {tweet.link.description}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-black text-white min-h-full font-sans text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Left sidebar - visible on medium screens and up */}
        <div className="hidden md:block md:col-span-1 px-4 py-3 sticky top-0 h-screen overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Twitter logo */}
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center cursor-pointer">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <g>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </g>
                </svg>
              </div>
            </div>

            {/* Navigation items */}
            <nav className="space-y-2 mb-6">
              <NavItem icon={<FiHome size={24} />} label="Home" active />
              <NavItem icon={<FiHash size={24} />} label="Explore" />
              <NavItem
                icon={<FiBell size={24} />}
                label="Notifications"
                hasNotification
              />
              <NavItem icon={<FiMail size={24} />} label="Messages" />
              <NavItem icon={<FiBookmark size={24} />} label="Bookmarks" />
              <NavItem icon={<FiUser size={24} />} label="Profile" />
              <NavItem icon={<FiMoreHorizontal size={24} />} label="More" />
            </nav>

            {/* Tweet button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-full py-3 font-bold"
              onClick={() => setShowCompose(true)}
            >
              Tweet
            </button>

            {/* Profile section at the bottom */}
            <div className="mt-auto mb-4">
              <div className="flex items-center p-3 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                <Avatar className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                  <span className="font-bold text-white">Y</span>
                </Avatar>
                <div className="flex-1 mr-3">
                  <div className="font-bold">Your Name</div>
                  <div className="text-gray-500 text-sm">@username</div>
                </div>
                <FiMoreHorizontal />
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="col-span-1 md:col-span-2 border-x border-gray-800 min-h-screen">
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-black bg-opacity-70 backdrop-blur-md border-b border-gray-800">
            <h1 className="text-xl font-bold p-4">Home</h1>

            {/* Tab navigation */}
            <div className="flex border-b border-gray-800">
              <button
                className={`flex-1 py-4 text-center relative ${
                  activeTab === "for-you" ? "font-bold" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("for-you")}
              >
                For you
                {activeTab === "for-you" && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full"></div>
                )}
              </button>
              <button
                className={`flex-1 py-4 text-center relative ${
                  activeTab === "following" ? "font-bold" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
                {activeTab === "following" && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full"></div>
                )}
              </button>
            </div>
          </div>

          {/* Tweet compose box */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex">
              <div className="mr-4">
                <Avatar className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="font-bold text-white">Y</span>
                </Avatar>
              </div>
              <div className="flex-1">
                <div className="mb-4">
                  <textarea
                    className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none"
                    placeholder="What's happening?"
                    rows={2}
                    value={tweetContent}
                    onChange={(e) => setTweetContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 text-blue-500">
                    <button
                      className="p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
                      title="Image"
                    >
                      <FiImage size={18} />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
                      title="Smile"
                    >
                      <FiSmile size={18} />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
                      title="Calendar"
                    >
                      <FiCalendar size={18} />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
                      title="Map"
                    >
                      <FiMapPin size={18} />
                    </button>
                  </div>
                  <button
                    className={`bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-full px-4 py-1.5 font-bold text-sm ${
                      !tweetContent.trim()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!tweetContent.trim()}
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tweets feed */}
          <div>
            {tweets.map((tweet) => (
              <Tweet
                key={tweet.id}
                tweet={tweet}
                isLiked={likedTweets[tweet.id]}
                isRetweeted={retweetedTweets[tweet.id]}
                isBookmarked={bookmarkedTweets[tweet.id]}
                onLike={() => handleLike(tweet.id)}
                onRetweet={() => handleRetweet(tweet.id)}
                onBookmark={() => handleBookmark(tweet.id)}
                renderMedia={renderTweetMedia}
              />
            ))}
          </div>
        </div>

        {/* Right sidebar - visible on medium screens and up */}
        <div className="hidden md:block md:col-span-1 px-4 py-3 sticky top-0 h-screen overflow-y-auto">
          {/* Search box */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search Twitter"
              className="bg-[#202327] w-full pl-10 pr-4 py-2 rounded-full text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-black"
            />
          </div>

          {/* Trending topics */}
          <div className="bg-[#16181c] rounded-2xl mb-4">
            <h2 className="text-xl font-bold p-4">Trends for you</h2>
            {trendingTopics.map((topic) => (
              <div
                key={topic.id}
                className={`p-4 cursor-pointer hover:bg-gray-800 transition-colors`}
              >
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">
                    {topic.category} · Trending
                  </span>
                  <button
                    className="text-gray-500 hover:text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 rounded-full p-1 transition-colors"
                    title="More"
                  >
                    <FiMoreHorizontal size={14} />
                  </button>
                </div>
                <div className="font-bold mt-0.5">{topic.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {topic.tweets} Tweets
                </div>
              </div>
            ))}
            <div className="p-4 text-blue-500 hover:bg-gray-800 transition-colors cursor-pointer rounded-b-2xl">
              Show more
            </div>
          </div>

          {/* Who to follow */}
          <div className="bg-[#16181c] rounded-2xl mb-4">
            <h2 className="text-xl font-bold p-4">Who to follow</h2>
            {whoToFollow.map((profile) => (
              <div
                key={profile.id}
                className="p-4 hover:bg-gray-800 transition-colors cursor-pointer flex items-center"
              >
                <Avatar className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  {profile.icon}
                </Avatar>
                <div className="flex-1">
                  <div className="font-bold flex items-center">
                    {profile.name}
                    <svg
                      viewBox="0 0 24 24"
                      aria-label="Verified account"
                      fill="#1d9bf0"
                      className="ml-1 w-4 h-4"
                    >
                      <g>
                        <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {profile.username}
                  </div>
                </div>
                <button className="bg-white text-black rounded-full px-4 py-1.5 font-bold text-sm hover:bg-gray-200 transition-colors">
                  Follow
                </button>
              </div>
            ))}
            <div className="p-4 text-blue-500 hover:bg-gray-800 transition-colors cursor-pointer rounded-b-2xl">
              Show more
            </div>
          </div>

          {/* Footer links */}
          <div className="text-xs text-gray-500">
            <div className="flex flex-wrap">
              <span className="mr-3 mb-1 hover:underline cursor-pointer">
                Terms of Service
              </span>
              <span className="mr-3 mb-1 hover:underline cursor-pointer">
                Privacy Policy
              </span>
              <span className="mr-3 mb-1 hover:underline cursor-pointer">
                Cookie Policy
              </span>
              <span className="mr-3 mb-1 hover:underline cursor-pointer">
                Accessibility
              </span>
              <span className="mr-3 mb-1 hover:underline cursor-pointer">
                Ads info
              </span>
              <span className="mr-3 mb-1 hover:underline cursor-pointer">
                More
              </span>
            </div>
            <div className="mt-2">© 2023 Twitter, Inc.</div>
          </div>
        </div>
      </div>

      {/* Mobile bottom navigation - visible only on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around py-3 z-10">
        <button
          onClick={() => setActiveTab("for-you")}
          className="p-2 text-white"
        >
          <FiHome size={24} />
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className="p-2 text-gray-500"
        >
          <FiSearch size={24} />
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className="p-2 text-gray-500"
        >
          <FiBell size={24} />
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className="p-2 text-gray-500"
        >
          <FiMail size={24} />
        </button>
      </div>

      {/* Compose Tweet modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-800 rounded-2xl w-full max-w-xl">
            <div className="p-4 flex justify-between border-b border-gray-800">
              <button
                className="text-white p-2 rounded-full hover:bg-gray-800"
                onClick={() => setShowCompose(false)}
              >
                &times;
              </button>
              <button className="text-blue-500 font-bold px-4 py-1 rounded-full bg-blue-500 bg-opacity-10">
                Drafts
              </button>
            </div>
            <div className="p-4">
              <div className="flex">
                <Avatar className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                  <span className="font-bold text-white">Y</span>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-2">
                    <button className="text-blue-500 text-sm font-bold border border-gray-600 rounded-full px-3 py-0.5">
                      Everyone ▾
                    </button>
                  </div>
                  <textarea
                    className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none text-xl"
                    placeholder="What's happening?"
                    rows={4}
                    autoFocus
                  ></textarea>
                  <div className="text-blue-500 text-sm font-bold">
                    <button className="hover:underline">
                      Add another Tweet
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                    <div className="flex space-x-2 text-blue-500">
                      <button
                        className="p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
                        title="Image"
                      >
                        <FiImage size={18} />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
                        title="Smile"
                      >
                        <FiSmile size={18} />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
                        title="Calendar"
                      >
                        <FiCalendar size={18} />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-20 transition-colors"
                        title="Map"
                      >
                        <FiMapPin size={18} />
                      </button>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-full px-4 py-1.5 font-bold text-sm">
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasNotification?: boolean;
}
const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  hasNotification = false,
}) => {
  return (
    <div
      className={`flex items-center p-3 rounded-full hover:bg-gray-800 transition-colors cursor-pointer ${
        active ? "font-bold" : ""
      }`}
    >
      <div className="relative">
        {icon}
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
        )}
      </div>
      <span className="ml-4 text-xl">{label}</span>
    </div>
  );
};

interface TweetProps {
  tweet: (typeof twitterData.tweets)[number];
  isLiked: boolean;
  isRetweeted: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onRetweet: () => void;
  onBookmark: () => void;
  renderMedia: (tweet: (typeof twitterData.tweets)[number]) => React.ReactNode;
}

const Tweet: React.FC<TweetProps> = ({
  tweet,
  isLiked,
  isRetweeted,
  isBookmarked,
  onLike,
  onRetweet,
  onBookmark,
  renderMedia,
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="p-4 border-b border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer relative">
      {/* Tweet container */}
      <div className="flex">
        {/* Avatar */}
        <div className="mr-3">
          <Avatar className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
            {tweet.icon}
          </Avatar>
        </div>

        {/* Tweet content */}
        <div className="flex-1">
          {/* Tweet header with user info */}
          <div className="flex items-center mb-1">
            <span className="font-bold mr-1 hover:underline">{tweet.name}</span>
            {tweet.verified && (
              <svg
                viewBox="0 0 24 24"
                aria-label="Verified account"
                fill="#1d9bf0"
                className="w-4 h-4 mr-1"
              >
                <g>
                  <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
                </g>
              </svg>
            )}
            <span className="text-gray-500 mr-1">{tweet.username}</span>
            <span className="text-gray-500 mx-1">·</span>
            <span className="text-gray-500 hover:underline">{tweet.time}</span>
            <button
              className="ml-auto text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-blue-500 hover:bg-opacity-10 transition-colors"
              onClick={() => setShowActions(!showActions)}
            >
              <FiMoreHorizontal size={16} />
            </button>
          </div>

          {/* Pinned tweet indicator */}
          {tweet.isPinned && (
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <FiStar size={12} className="mr-1" />
              Pinned Tweet
            </div>
          )}

          {/* Tweet text content */}
          <div className="mb-3 whitespace-pre-line">
            {tweet.content}
            {tweet.hashtags && tweet.hashtags.length > 0 && (
              <div className="mt-1">
                {tweet.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-blue-500 hover:underline mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tweet media content */}
          {renderMedia && renderMedia(tweet)}

          {/* Thread indicator */}
          {tweet.hasThread && (
            <div className="mt-2 text-blue-500 hover:underline text-sm">
              Show this thread ({tweet.threadCount} more{" "}
              {tweet.threadCount === 1 ? "Tweet" : "Tweets"})
            </div>
          )}

          {/* Tweet actions */}
          <div className="flex justify-between text-gray-500 mt-3">
            <button className="flex items-center space-x-1 group">
              <div className="p-2 rounded-full group-hover:bg-blue-500 group-hover:bg-opacity-10 group-hover:text-blue-500 transition-colors">
                <FiMessageCircle size={18} />
              </div>
              <span className="text-sm group-hover:text-blue-500">
                {tweet.replies}
              </span>
            </button>

            <button
              className={`flex items-center space-x-1 group ${
                isRetweeted ? "text-green-500" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onRetweet();
              }}
            >
              <div
                className={`p-2 rounded-full ${
                  isRetweeted
                    ? "text-green-500"
                    : "group-hover:bg-green-500 group-hover:bg-opacity-10 group-hover:text-green-500"
                } transition-colors`}
              >
                <FiRepeat size={18} />
              </div>
              <span
                className={`text-sm ${
                  isRetweeted ? "text-green-500" : "group-hover:text-green-500"
                }`}
              >
                {tweet.retweets + (isRetweeted ? 1 : 0)}
              </span>
            </button>

            <button
              className={`flex items-center space-x-1 group ${
                isLiked ? "text-pink-500" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
            >
              <div
                className={`p-2 rounded-full ${
                  isLiked
                    ? "text-pink-500"
                    : "group-hover:bg-pink-500 group-hover:bg-opacity-10 group-hover:text-pink-500"
                } transition-colors`}
              >
                {isLiked ? <FaHeart size={18} /> : <FiHeart size={18} />}
              </div>
              <span
                className={`text-sm ${
                  isLiked ? "text-pink-500" : "group-hover:text-pink-500"
                }`}
              >
                {tweet.loves + (isLiked ? 1 : 0)}
              </span>
            </button>

            <button
              className={`flex items-center space-x-1 group ${
                isBookmarked ? "text-blue-500" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
            >
              <div
                className={`p-2 rounded-full ${
                  isBookmarked
                    ? "text-blue-500"
                    : "group-hover:bg-blue-500 group-hover:bg-opacity-10 group-hover:text-blue-500"
                } transition-colors`}
              >
                <FiBookmark size={18} />
              </div>
            </button>

            <button className="flex items-center space-x-1 group">
              <div className="p-2 rounded-full group-hover:bg-blue-500 group-hover:bg-opacity-10 group-hover:text-blue-500 transition-colors">
                <FiShare2 size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Action dropdown */}
      {showActions && (
        <div className="absolute right-4 top-12 bg-black border border-gray-800 rounded-md shadow-lg z-10 py-1 w-60">
          <button className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-800 flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2"
              fill="currentColor"
            >
              <g>
                <path d="M9.75 13.5h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5zm-2.22-3.4l.47.29a.75.75 0 10.8-1.27l-.47-.29a2 2 0 00-2.2 0l-.47.29a.75.75 0 00.8 1.27l.47-.29a.5.5 0 01.6 0zm8.5 0l.47.29a.75.75 0 00.8-1.27l-.47-.29a2 2 0 00-2.2 0l-.47.29a.75.75 0 10.8 1.27l.47-.29a.5.5 0 01.6 0zM12 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a12 12 0 1124 0A12 12 0 010 8z"></path>
              </g>
            </svg>
            Not interested in this Tweet
          </button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800 flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2"
              fill="currentColor"
            >
              <g>
                <path d="M5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5H12v2H5.5A2.5 2.5 0 013 19.5v-15A2.5 2.5 0 015.5 2H12v2H5.5zm13 2H12v12h6.5c.28 0 .5-.22.5-.5v-11c0-.28-.22-.5-.5-.5zM12 4V2h6.5A2.5 2.5 0 0121 4.5v11a2.5 2.5 0 01-2.5 2.5H12v-2h6.5c.28 0 .5-.22.5-.5v-11c0-.28-.22-.5-.5-.5H12z"></path>
              </g>
            </svg>
            Follow {tweet.username}
          </button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800 flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2"
              fill="currentColor"
            >
              <g>
                <path d="M10.4 3.6l1.05 2.1 2.35.32a.5.5 0 01.27.85l-1.7 1.67.4 2.34a.5.5 0 01-.72.52L10 10.2l-2.05 1.2a.5.5 0 01-.73-.53l.4-2.33-1.7-1.68a.5.5 0 01.28-.85l2.34-.32 1.05-2.1a.5.5 0 01.9 0zM10 17a2 2 0 110-4 2 2 0 010 4zm8-12a2 2 0 110 4 2 2 0 010-4zm0 12a2 2 0 110-4 2 2 0 010-4z"></path>
              </g>
            </svg>
            Add/remove from Lists
          </button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800 flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2"
              fill="currentColor"
            >
              <g>
                <path d="M4 4.5A2.5 2.5 0 016.5 2h11A2.5 2.5 0 0120 4.5v15a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 19.5v-15zM6.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-11zm10.25 2h-8.5a.75.75 0 00-.75.75v9.5c0 .41.34.75.75.75h8.5c.41 0 .75-.34.75-.75v-9.5a.75.75 0 00-.75-.75zM8 7.75c0-.14.11-.25.25-.25h6.5c.14 0 .25.11.25.25v7.5a.25.25 0 01-.25.25h-6.5a.25.25 0 01-.25-.25v-7.5zM8.75 18h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5z"></path>
              </g>
            </svg>
            Mute {tweet.username}
          </button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800 flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2"
              fill="currentColor"
            >
              <g>
                <path d="M12 3.75C7.99 3.75 4.75 7 4.75 11s3.24 7.25 7.25 7.25h1v2.5h2.5v-2.5h1c4.01 0 7.25-3.25 7.25-7.25s-3.24-7.25-7.25-7.25h-4.5zM12 5.25h4.5c3.18 0 5.75 2.57 5.75 5.75s-2.57 5.75-5.75 5.75h-4.5a6 6 0 01-4.23-1.76A5.99 5.99 0 016.25 11c0-3.18 2.57-5.75 5.75-5.75z"></path>
              </g>
            </svg>
            Block {tweet.username}
          </button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800 flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2"
              fill="currentColor"
            >
              <g>
                <path d="M3 2h18.61l-3.5 7 3.5 7H5v6H3V2zm2 12h13.38l-2.5-5 2.5-5H5v10z"></path>
              </g>
            </svg>
            Report Tweet
          </button>
        </div>
      )}
    </div>
  );
};

export default Twitter;
