import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { codeContent, type CodeType } from "./code";
import VsCode from "./app/VsCode";
import { useWindowContext } from "@/components/load/panic/context/windowContext";

interface CodeEditorsProps {
  totalTimeForCodeInMS: number;
}

const files = ["reactComponent", "cssStyles", "animation"] as CodeType[];

const getFilePosition = (file: CodeType) => {
  const positions = {
    reactComponent: { left: "5%", top: "5%", rotate: "1deg" },
    cssStyles: { left: "15%", top: "15%", rotate: "-1deg" },
    animation: { left: "25%", top: "25%", rotate: "1deg" },
  };
  return positions[file] || { left: "15%", top: "15%", rotate: "-1deg" };
};

const CodeEditors: React.FC<CodeEditorsProps> = ({
  totalTimeForCodeInMS,
}: CodeEditorsProps) => {
  const { activeWindow, goToWindow } = useWindowContext();
  const fileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [typingProgress, setTypingProgress] = useState<
    Record<CodeType, number>
  >({
    reactComponent: 0,
    cssStyles: 0,
    animation: 0,
  });

  const [visibleEditors, setVisibleEditors] = useState<CodeType[]>([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [sequenceStarted, setSequenceStarted] = useState(false);

  const timePerFile = useMemo(
    () => Math.floor(totalTimeForCodeInMS / files.length),
    [totalTimeForCodeInMS]
  );

  const processFile = useCallback(
    (fileIndex: number) => {
      if (fileIndex >= files.length) return;

      const currentFile = files[fileIndex];
      setVisibleEditors((prev) => {
        if (!prev.includes(currentFile)) return [...prev, currentFile];
        return prev;
      });

      goToWindow(currentFile);
      setCurrentFileIndex(fileIndex);

      const totalLines = codeContent[currentFile].length;
      const timePerLine = Math.floor((timePerFile * 0.8) / totalLines);

      setTypingProgress((prev) => ({
        ...prev,
        [currentFile]: 0,
      }));

      let currentLine = 0;
      const typingInterval = setInterval(() => {
        const notFinished = currentLine < totalLines;
        if (notFinished) {
          setTypingProgress((prev) => ({
            ...prev,
            [currentFile]: currentLine + 1,
          }));
          currentLine++;
          return;
        }

        clearInterval(typingInterval);
        const editorElement = fileRefs.current[fileIndex];
        editorElement?.classList.add("file-complete");

        const transitionDelay = Math.floor(timePerFile * 0.2);
        setTimeout(() => processFile(fileIndex + 1), transitionDelay);
      }, timePerLine);
    },
    [timePerFile, goToWindow]
  );

  useEffect(() => {
    if (!sequenceStarted) {
      setTimeout(() => {
        setSequenceStarted(true);
        processFile(0);
      }, 500);
    }
  }, [sequenceStarted, processFile]);

  useEffect(() => {
    fileRefs.current = fileRefs.current.slice(0, files.length);
  }, []);

  return (
    <div className="relative w-full h-full">
      {files.map((file, index) => {
        const position = getFilePosition(file);

        if (!visibleEditors.includes(file)) return null;
        const editorZIndex = 10 + visibleEditors.indexOf(file);

        const isActive = activeWindow === file;

        const transform = isActive
          ? `translateZ(0px) rotate(${position.rotate})`
          : `translateZ(-${
              (visibleEditors.length - visibleEditors.indexOf(file)) * 10
            }px) rotate(${position.rotate})`;

        return (
          <Card
            key={file}
            ref={(el) => (fileRefs.current[index] = el)}
            className={cn(
              `code-window ${file} absolute w-[72%] h-3/4 shadow-xl transition-all duration-500 border-none overflow-hidden rounded-lg`,
              index === currentFileIndex
                ? "code-window-active"
                : "code-window-inactive",
              visibleEditors.indexOf(file) === visibleEditors.length - 1 &&
                "code-window-enter-animation"
            )}
            style={{
              left: position.left,
              top: position.top,
              zIndex: editorZIndex,
              opacity: isActive ? 1 : 0.6,
              transform,
            }}
          >
            <VsCode
              filename={file}
              typingProgress={typingProgress}
              isActive={isActive}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default CodeEditors;
