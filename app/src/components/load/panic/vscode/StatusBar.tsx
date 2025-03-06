import {
  VscSymbolStructure,
  VscSync,
  VscError,
  VscCheck,
  VscBell,
} from "react-icons/vsc";

interface StatusBarProps {
  problems: number;
  language: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ problems, language }) => {
  return (
    <div className="h-[22px] bg-[#007acc] flex items-center justify-between text-white text-xs px-2 border-t border-[#1a1a1a]">
      <div className="flex items-center space-x-2">
        <div className="flex items-center px-2 hover:bg-[#1f8ad2]">
          <VscSymbolStructure className="mr-1" />
          <span>main*</span>
        </div>
        <div className="flex items-center px-2 hover:bg-[#1f8ad2]">
          <VscSync className="mr-1 animate-spin" />
        </div>
        <div className="flex items-center px-2 hover:bg-[#1f8ad2]">
          <span className="text-[10px]">
            {problems > 0 ? `${problems} ` : ""}
            {problems > 0 ? (
              <span className="inline-flex items-center">
                <VscError className="mr-0.5" /> {problems}
              </span>
            ) : (
              <span className="inline-flex items-center">
                <VscCheck className="mr-0.5" /> 0
              </span>
            )}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="px-2 hover:bg-[#1f8ad2]">Ln 1, Col 1</div>
        <div className="px-2 hover:bg-[#1f8ad2]">Spaces: 2</div>
        <div className="px-2 hover:bg-[#1f8ad2]">UTF-8</div>
        <div className="px-2 hover:bg-[#1f8ad2]">{language.toUpperCase()}</div>
        <div className="px-2 hover:bg-[#1f8ad2]">{getCurrentDateTime()}</div>
        <div className="px-2 hover:bg-[#1f8ad2]">
          <VscBell />
        </div>
      </div>
    </div>
  );
};

const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default StatusBar;
