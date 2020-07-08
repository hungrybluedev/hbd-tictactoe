const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
];
const columns = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
const diagonals = [
    [0, 4, 8],
    [2, 4, 6],
];
export const cases = [...rows, ...columns, ...diagonals];
export const x_sym = "❌";
export const o_sym = "⭕";
