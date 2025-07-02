interface ProgressIndicatorProps {
  total: number;
  current: number;
  completed: number[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  total,
  current,
  completed,
}) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            completed.includes(index)
              ? "bg-ctp-green"
              : index === current
              ? "bg-ctp-blue"
              : "bg-ctp-surface1"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
