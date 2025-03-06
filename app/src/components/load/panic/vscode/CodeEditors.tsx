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
import VsCode from "./VsCode";
import { useWindowContext } from "../context/windowcontext";
import "./CodeEditorsAnimation.css";

interface CodeEditorsProps {
  panicPhase: string;
  totalTimeForCodeInMS: number;
}

const files = ["reactComponent", "cssStyles", "animation"] as CodeType[];

const getFilePosition = (file: CodeType) => {
  const positions = {
    reactComponent: { left: "5%", top: "5%" },
    cssStyles: { left: "15%", top: "15%" },
    animation: { left: "25%", top: "25%" },
  };
  return positions[file] || { left: "15%", top: "15%" };
};

const CodeEditors: React.FC<CodeEditorsProps> = ({
  panicPhase,
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
  const [fileIndex, setFileIndex] = useState(0);

  const timePerFile = useMemo(
    () => totalTimeForCodeInMS / files.length,
    [totalTimeForCodeInMS]
  );

  const animateCodeWindow = useCallback(
    (currentFile: CodeType) => {
      const activeCodeWindow = document.querySelector(".code-window.active");
      if (activeCodeWindow) {
        activeCodeWindow.classList.add("code-window-exit-animation");

        // Use animationend event to trigger the next animation
        activeCodeWindow.addEventListener(
          "animationend",
          () => {
            goToWindow(currentFile);

            const newCodeWindow = document.querySelector(
              `.code-window.${currentFile}`
            );
            if (newCodeWindow) {
              newCodeWindow.classList.add("code-window-enter-animation");
              // Clean up classes after animation
              newCodeWindow.addEventListener(
                "animationend",
                () => {
                  newCodeWindow.classList.remove("code-window-enter-animation");
                  activeCodeWindow?.classList.remove(
                    "code-window-exit-animation"
                  );
                },
                { once: true }
              );
            }
          },
          { once: true }
        );
      } else {
        // First file doesn't have an active window to animate from
        goToWindow(currentFile);
        const newCodeWindow = document.querySelector(
          `.code-window.${currentFile}`
        );
        if (newCodeWindow) {
          newCodeWindow.classList.add("code-window-enter-animation");
        }
      }
    },
    [goToWindow]
  );

  const processFile = useCallback(() => {
    if (fileIndex >= files.length) return;
    const currentFile = files[fileIndex];

    animateCodeWindow(currentFile);

    // Progressive typing simulation
    const codeLength = typingProgress[currentFile] || 0;
    const totalLines = codeContent[currentFile].length;
    const targetProgress = Math.min(
      totalLines,
      codeLength + Math.ceil(totalLines * 0.4)
    );

    let currentLine = codeLength;
    const typeLines = () => {
      if (currentLine < targetProgress) {
        setTypingProgress((prev) => ({
          ...prev,
          [currentFile]: currentLine + 1,
        }));

        currentLine++;
        setTimeout(typeLines, 200 + Math.random() * 30); // Vary typing speed slightly
      } else {
        setFileIndex((prev) => prev + 1);
        if (fileIndex < files.length) setTimeout(processFile, timePerFile);
        else {
          const editorContent = document.querySelector(".code-editor-content");
          if (editorContent)
            editorContent.classList.add("code-saving-animation");
        }
      }
    };

    typeLines();
  }, [fileIndex, typingProgress, timePerFile, animateCodeWindow]);

  useEffect(() => {
    const codeCursors = document.querySelectorAll(".code-cursor");
    codeCursors.forEach((cursor) => cursor.classList.add("code-cursor-blink"));
    processFile();
  }, [processFile]);

  // Initialize fileRefs array when files change
  useEffect(() => {
    fileRefs.current = fileRefs.current.slice(0, files.length);
  }, []);

  useEffect(() => {
    fileRefs.current[fileIndex]?.classList.add("file-fade-in");
  }, [fileIndex]);

  return (
    <div>
      {files.slice(0, 3).map((file, index) => {
        const position = getFilePosition(file);
        return (
          <Card
            key={file}
            ref={(el) => (fileRefs.current[index] = el)}
            className={cn(
              `code-window ${file} absolute w-[72%] h-3/4 shadow-xl transition-all duration-300 z-30 border-none overflow-hidden rounded-lg`,
              activeWindow === file ? "opacity-100 active" : "opacity-0",
              (panicPhase === "coding" || panicPhase === "assistance") &&
                activeWindow !== file &&
                "opacity-60"
            )}
            style={{
              transform: `${
                activeWindow === file ? "translateZ(0px)" : "translateZ(-50px)"
              } rotate(${file === "cssStyles" ? "1deg" : "-1deg"})`,
              left: position.left,
              top: position.top,
            }}
          >
            <VsCode filename={file} typingProgress={typingProgress} />
          </Card>
        );
      })}
    </div>
  );
};

export default CodeEditors;
