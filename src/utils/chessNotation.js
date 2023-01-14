export default function getChessNotationFromXAndY(x, y) {
    const chessSymbols = new Map();
    const listOfPairs = [["0", "A"], ["1", "B"], ["2", "C"], ["3", "D"], ["4", "E"], ["5", "F"], ["6", "G"], ["7", "H"]]

    y = 8 - y

    for (let pair = 0; pair < listOfPairs.length; pair++) {
        chessSymbols.set(listOfPairs[pair][0], listOfPairs[pair][1])
    }

    console.log("x", x, "y", y)

    const chessMap = new Map();

    for (let i = 0; i < 8; i++) {
        for (let j = 8; j > 0; j--) {
            chessMap.set('' + i + j, `${chessSymbols.get('' + i) + (j)}`)
        }
    }

    return chessMap.get('' + x + y)
}
