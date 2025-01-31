import { Cell } from "./cell";

export function Grid({ row, col, playsound }) {
    return (
        <div
            className="Container"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 3rem)",
                gridTemplateRows: "repeat(3, 3rem)",
                border: "2px solid #283618",
                width: "9.1rem",
                height: "9.1rem",
            }}
        >
            <Cell playsound={playsound}  row={(row - 1) * 3 + 1} col={(col - 1) * 3 + 1} />
            <Cell playsound={playsound}  row={(row - 1) * 3 + 1} col={(col - 1) * 3 + 2} />
            <Cell playsound={playsound}  row={(row - 1) * 3 + 1} col={(col - 1) * 3 + 3} />
            <Cell playsound={playsound}  row={(row - 1) * 3 + 2} col={(col - 1) * 3 + 1} />
            <Cell playsound={playsound}  row={(row - 1) * 3 + 2} col={(col - 1) * 3 + 2} />
            <Cell playsound={playsound}  row={(row - 1) * 3 + 2} col={(col - 1) * 3 + 3} />
            <Cell playsound={playsound}  row={(row - 1) * 3 + 3} col={(col - 1) * 3 + 1} />
            <Cell playsound={playsound}  row={(row - 1) * 3 + 3} col={(col - 1) * 3 + 2} />
            <Cell playsound={playsound}  row={(row - 1) * 3 + 3} col={(col - 1) * 3 + 3} />
        </div>
    );
}
