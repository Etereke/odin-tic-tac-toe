const Gameboard = (() => {
    const gameboard = [['X', 'X', 'X'], ['O', 'O', 'O'], ['X', 'X', 'X']];
    const Render = () => {
        console.log(gameboard);
    }
    return {
        Render
    };
})();

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

console.log(playerOne.getName());
console.log(playerOne.getMarker());
console.log(playerTwo.getName());
console.log(playerTwo.getMarker());
