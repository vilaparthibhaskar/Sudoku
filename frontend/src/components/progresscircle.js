export function ProgressCircle({ levelsCompleted, totalLevels, color}) {
    const radius = 13;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;
    const progress = (levelsCompleted / totalLevels) * circumference;

    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            style={{
                transform: "rotate(-90deg)",
                display: "inline-block",
                verticalAlign: "middle",
            }}
        >
            <circle
                cx="25"
                cy="25"
                r={radius}
                fill="none"
                stroke="#d3d3d3"
                strokeWidth={strokeWidth}
            />
            <circle
                cx="25"
                cy="25"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
            />
        </svg>
    );
}
