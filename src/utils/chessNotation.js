export default function getChessNotationFromXAndY(x, y) {
    const chessSymbols = new Map();
    // chessSymbols be like:
    // {"0" => "A"}
    // {"1" => "B"}
    // {"2" => "C"}
    // {"3" => "D"}
    // {"4" => "E"}
    // {"5" => "F"}
    // {"6" => "G"}
    // {"7" => "H"}

    const listOfPairs = [
        ["0", "A"], ["1", "B"], ["2", "C"], ["3", "D"], ["4", "E"], ["5", "F"], ["6", "G"], ["7", "H"]
    ]

    // this is need because x and y start at [0][8], but this matrix at [0][0]
    // if we subtract y from 8, then we will have everything great
    y = 8 - y

    // fill our muffin
    for (let pair = 0; pair < listOfPairs.length; pair++) {
        chessSymbols.set(listOfPairs[pair][0], listOfPairs[pair][1])
    }

    // chessMap be like:
    // 0[8-0] => A[8-0]
    // 1[8-0] => B[8-0]
    // 2[8-0] => C[8-0] and etc...
    // for example:
    // '27' => 'C7',
    // '26' => 'C6',
    // '25' => 'C5',
    // '24' => 'C4',
    // '23' => 'C3',
    // '22' => 'C2',
    // '21' => 'C1',
    // '38' => 'D8',
    // '37' => 'D7',
    const chessMap = new Map();

    // fill our vessel
    for (let i = 0; i < 8; i++) {
        for (let j = 8; j > 0; j--) {
            chessMap.set('' + i + j, `${chessSymbols.get('' + i) + (j)}`)
        }
    }

    // get a notation with str(x) + str(y) :Python
    return chessMap.get('' + x + y)
}
