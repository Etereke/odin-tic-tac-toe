const LogicalBoard = (() => {
    const gameboard = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];
    const getCell = (index) => {
        return gameboard[index];
    }
    return {
        getCell
    };
})();

const PhysicalBoard = (() => {
    const gameboard = [];
    for(let i = 1; i <= 9; i++){
        gameboard.push(document.querySelector(`.cell-${i}`));
    }

    const Render = () => {
        console.log('Rendering...');
        for(let i = 0; i < 9; i++){
            let displayCell = gameboard[i];
            let logicCell = LogicalBoard.getCell(i);
            displayCell.textContent = logicCell;
            if(logicCell === 'X'){
                displayCell.style.color = 'blue';
            }
            else{
                displayCell.style.color = 'red';
            }
        }
    };
    return {
        Render
    };
})();

PhysicalBoard.Render();
const GameLogic = (() => {

    return{

    };
})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {
        getName,
        getMarker
    };
};

const playerOne = Player("Etereke", 'X');
const playerTwo = Player("Süti", 'O');
