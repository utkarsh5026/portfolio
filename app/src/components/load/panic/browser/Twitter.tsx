import { FiRepeat, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import { Avatar } from "@/components/ui/avatar";
import { FaReact } from "react-icons/fa";

const Twitter = () => {
  return (
    <div className="bg-black text-white min-h-full font-serif">
      <div className="max-w-xl mx-auto border-x border-gray-800 min-h-full">
        <div className="sticky top-0 z-10 bg-black bg-opacity-70 backdrop-blur-md p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Home</h1>
        </div>

        {/* Tweet compose box */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex">
            <div className="mr-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center text-sm font-medium">
                U
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4 text-gray-500">What's happening?</div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-blue-500">
                  <span className="hover:bg-blue-900 hover:bg-opacity-20 p-2 rounded-full">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                    >
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </svg>
                  </span>
                  <span className="hover:bg-blue-900 hover:bg-opacity-20 p-2 rounded-full">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                    >
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </svg>
                  </span>
                  <span className="hover:bg-blue-900 hover:bg-opacity-20 p-2 rounded-full">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                    >
                      <path d="M8 9.5C8 8.119 9.119 7 10.5 7h3C14.881 7 16 8.119 16 9.5c0 1.381-1.119 2.5-2.5 2.5h-3C9.119 12 8 10.881 8 9.5zM15.5 13c1.381 0 2.5 1.119 2.5 2.5v3c0 1.381-1.119 2.5-2.5 2.5h-3C11.119 21 10 19.881 10 18.5v-3c0-1.381 1.119-2.5 2.5-2.5h3zM17 5.5C17 4.119 18.119 3 19.5 3h3C23.881 3 25 4.119 25 5.5v3c0 1.381-1.119 2.5-2.5 2.5h-3C18.119 11 17 9.881 17 8.5v-3zM5.5 13C6.881 13 8 14.119 8 15.5v3C8 19.881 6.881 21 5.5 21h-3C1.119 21 0 19.881 0 18.5v-3C0 14.119 1.119 13 2.5 13h3z"></path>
                    </svg>
                  </span>
                </div>
                <button className="bg-blue-500 text-white rounded-full px-4 py-1.5 font-bold text-sm">
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tweets feed */}
        <div>
          <Tweet
            name="React Core Team"
            username="@reactjs"
            time="2h"
            content="React 19 is coming with significant improvements to the rendering engine. Server Components are now stable and fully integrated with Suspense for a better user experience."
            icon={<FaReact className="text-blue-500 h-6 w-6" />}
            loves={1002}
            retweets={2567}
            shares={"1.4K"}
          />

          <Tweet
            name="Tailwind CSS"
            username="@tailwindcss"
            time="5h"
            content="Just launched my new portfolio site built with React and @tailwindcss! Check it out and let me know what you think 👇"
            icon={<SiTailwindcss className="text-white h-6 w-6" />}
            loves={Math.floor(Math.random() * 1000)}
            retweets={Math.floor(Math.random() * 1000)}
            shares={"121.4K"}
          />

          <Tweet
            name="TypeScript"
            username="@typescript"
            time="1d"
            content="TypeScript 5.3 is now available! This release brings performance improvements, better type inference, and new features."
            icon={<SiTypescript className="text-blue-500 h-6 w-6" />}
            loves={Math.floor(Math.random() * 1000)}
            retweets={Math.floor(Math.random() * 1000)}
            shares={"2.4K"}
          />
        </div>
      </div>
    </div>
  );
};

interface TweetProps {
  name: string;
  username: string;
  time: string;
  content: string;
  icon: React.ReactNode;
  loves: number;
  retweets: number;
  shares: string;
}

const Tweet: React.FC<TweetProps> = ({
  name,
  username,
  time,
  content,
  icon,
  loves,
  retweets,
  shares,
}) => {
  return (
    <div className="p-4 border-b border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer">
      <div className="flex">
        <div className="mr-3">
          <Avatar className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
            {icon}
          </Avatar>
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="font-bold mr-1">{name}</span>
            <span className="text-gray-500 mr-1">{username}</span>
            <span className="text-gray-500">{time}</span>
          </div>
          <div className="mb-3">{content}</div>
          <div className="flex justify-between text-gray-500">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <FiMessageCircle size={16} />
              <span>{loves}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-green-500">
              <FiRepeat size={16} />
              <span>{retweets}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-500">
              <FiHeart size={16} />
              <span>{loves}</span>
            </button>
            <span className="flex items-center space-x-1 hover:text-blue-500">
              <FiShare2 size={16} />
              <span>{shares}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Twitter;
