import React, { useMemo, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

interface ContributionHeatmapProps {
  commitsByDate: Record<string, number>;
}

const CELL_SIZE = 11;
const GAP = 2;
const DAYS = 91;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function getCellColor(count: number): string {
  if (count === 0) return "rgba(49, 50, 68, 0.4)"; // ctp-surface0/40
  if (count === 1) return "rgba(166, 227, 161, 0.3)"; // ctp-green/30
  if (count <= 3) return "rgba(166, 227, 161, 0.6)"; // ctp-green/60
  return "#a6e3a1"; // ctp-green
}

const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
  commitsByDate,
}) => {
  const [expanded, setExpanded] = useState(true);

  const { grid, months } = useMemo(() => {
    const today = new Date();
    const cells: { date: string; count: number; col: number; row: number }[] =
      [];

    const start = new Date(today);
    start.setDate(start.getDate() - DAYS);

    start.setDate(start.getDate() - start.getDay());

    const totalDays = Math.ceil(
      (today.getTime() - start.getTime()) / 86_400_000
    );
    const monthLabels: { label: string; col: number }[] = [];
    let lastMonth = -1;

    for (let i = 0; i <= totalDays; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      const col = Math.floor(i / 7);
      const row = i % 7;

      if (d.getMonth() !== lastMonth) {
        lastMonth = d.getMonth();
        monthLabels.push({
          label: d.toLocaleString("en", { month: "short" }),
          col,
        });
      }

      cells.push({ date: key, count: commitsByDate[key] || 0, col, row });
    }

    return { grid: cells, months: monthLabels };
  }, [commitsByDate]);

  const numCols = grid.length > 0 ? grid[grid.length - 1].col + 1 : 0;
  const gridWidth = numCols * (CELL_SIZE + GAP) + 28; // 28px for day labels

  return (
    <div className="flex-shrink-0 border-b border-ctp-surface0/40">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-1 w-full px-4 py-1.5 text-[10px] text-ctp-overlay1 uppercase tracking-widest font-medium hover:text-ctp-subtext0 transition-colors"
      >
        {expanded ? (
          <FiChevronDown className="w-3 h-3" />
        ) : (
          <FiChevronRight className="w-3 h-3" />
        )}
        Activity
      </button>

      {expanded && (
        <div className="px-3 pb-2 overflow-x-auto scrollbar-none">
          <svg
            width={gridWidth}
            height={7 * (CELL_SIZE + GAP) + 16}
            className="block"
          >
            {/* Month labels */}
            {months.map((m, i) => (
              <text
                key={i}
                x={28 + m.col * (CELL_SIZE + GAP)}
                y={10}
                className="fill-ctp-overlay0"
                fontSize={8}
                fontFamily="Source Code Pro, monospace"
              >
                {m.label}
              </text>
            ))}

            {/* Day labels */}
            {DAY_LABELS.map((label, row) =>
              label ? (
                <text
                  key={row}
                  x={0}
                  y={16 + row * (CELL_SIZE + GAP) + CELL_SIZE - 2}
                  className="fill-ctp-overlay0"
                  fontSize={8}
                  fontFamily="Cascadia Code, monospace"
                >
                  {label}
                </text>
              ) : null
            )}

            {/* Cells */}
            {grid.map((cell) => (
              <rect
                key={cell.date}
                x={28 + cell.col * (CELL_SIZE + GAP)}
                y={16 + cell.row * (CELL_SIZE + GAP)}
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx={2}
                fill={getCellColor(cell.count)}
              >
                <title>
                  {cell.date}: {cell.count} commit{cell.count !== 1 ? "s" : ""}
                </title>
              </rect>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
};

export default ContributionHeatmap;
