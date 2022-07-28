const GameBoard = (() => {
    const gameboard = [];
    let players = [];
    for(let i = 1; i <= 9; i++){
        gameboard.push(document.querySelector(`.cell-${i}`));
    }

    const SetPlayers = (playerList) => players = playerList;
    const handleClick = (e) => {
        const currentCellIndex = e.target.dataset.index;
        GameLogic.AddMark(currentCellIndex);
        GameBoard.Render();
    }
    const InitializeEventHandlers = () => {
        gameboard.forEach(cell => {
            cell.addEventListener('click', handleClick);
        });
    }

    const Render = () => {
        for(let i = 0; i < 9; i++){
            let displayCell = gameboard[i];
            let logicCell = GameLogic.GetCell(i);
            displayCell.textContent = logicCell;
            displayCell.style.color = logicCell === players[0].getMarker() ? players[0].getColor() : players[1].getColor();
            if(logicCell === 'X'){
                displayCell.style.color = 'blue';
            }
            else{
                displayCell.style.color = 'red';
            }
        }
    };
    return {
        Render,
        InitializeEventHandlers,
        SetPlayers
    };
})();
const GameLogic = (() => {
    let firstIsCurrentPlayer = true;
    let  players = [];
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const SetPlayers = (player1, player2) => {
        players = [player1, player2];
    }
    const SendPlayers = () => GameBoard.SetPlayers(players);
    const SwitchPlayer = () => firstIsCurrentPlayer = !firstIsCurrentPlayer;
    const GetCell = (index) => {
        return gameboard[index];
    }

    const AddMark = (index) => {
        if(gameboard[index] === ''){
            gameboard[index] = firstIsCurrentPlayer ? players[0].getMarker() : players[1].getMarker();
            SwitchPlayer();
        }
    }

    const StartGame = (first, second) => {
        gameboard = ['', '', '', '', '', '', '', '', ''];
        SetPlayers(first, second);
        SendPlayers();
        firstIsCurrentPlayer = true;
        GameBoard.InitializeEventHandlers();
        GameBoard.Render();
    }
    return{
        StartGame,
        AddMark, 
        GetCell
    };
})();

const Player = (name, marker, color) => {
    const getName = () => name;
    const getMarker = () => marker;
    const getColor = () => color;
    return {
        getName,
        getMarker,
        getColor
    };
};

const playerOne = Player("Etereke", 'X', 'blue');
const playerTwo = Player("Süti", 'O', 'red');

GameLogic.StartGame(playerOne, playerTwo);