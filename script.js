const GameBoard = (() => {
    const gameboard = document.querySelector('.game-board');
    let gameboardCells = [];
    let players = [];
    // for(let i = 1; i <= 9; i++){
    //     gameboardCells.push(document.querySelector(`.cell-${i}`));
    // }
    const InitializeGameboard = () => {
        gameboardCells = [];
        for(let i = 0; i < 9; i++){
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            gameboard.appendChild(cell);
            gameboardCells.push(cell);
        }
        InitializeEventHandlers();
    }
    const SetPlayers = (playerList) => players = playerList;
    const handleClick = (e) => {
        const currentCellIndex = e.target.dataset.index;
        GameLogic.AddMark(currentCellIndex);
        GameBoard.Render();
    }
    const InitializeEventHandlers = () => {
        gameboardCells.forEach(cell => {
            cell.addEventListener('click', handleClick);
        });
    }
    const RemoveEventHandlers = () => {
        gameboardCells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }

    const FinishGame = (indices) => {
        RemoveEventHandlers();
        if(indices !== null){
            for(let i of indices){
                gameboardCells[i].style.backgroundColor = 'green';
            }
        }
    }

    const Render = () => {
        for(let i = 0; i < 9; i++){
            let displayCell = gameboardCells[i];
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
        InitializeGameboard,
        SetPlayers,
        FinishGame
    };
})();
const GameLogic = (() => {
    const CHECK_INDICES_ARRAY = [[0, 1, 2], [3, 4, 5], [6, 7, 8], 
                                 [0, 3, 6], [1, 4, 7], [2, 5, 8],
                                 [0, 4, 8], [2, 4, 6]];
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

    const CheckOneRow = (indices) => {
        if(gameboard[indices[0]] === '' || gameboard[indices[1]] === '' || gameboard[indices[2]] === ''){
            return false;
        }
        else if(gameboard[indices[0]] === gameboard[indices[1]] && gameboard[indices[0]] === gameboard[indices[2]]){
            return true;
        }
        else return false;
    }

    const CheckGameEnd = () => {
        for(let indices of CHECK_INDICES_ARRAY){
            if(CheckOneRow(indices)){
                if(gameboard[indices[0]] === players[0].getMarker()) {
                    GameBoard.FinishGame(indices);
                    return 1; 
                }
                else{
                    GameBoard.FinishGame(indices);
                    return 2; 
                }
            }
        }
        for(let cell of gameboard){
            if(cell === '') return 0;
        }
        GameBoard.FinishGame(null);
        return 3;
    }

    const AddMark = (index) => {
        if(gameboard[index] === ''){
            gameboard[index] = firstIsCurrentPlayer ? players[0].getMarker() : players[1].getMarker();
            let gameState = CheckGameEnd();
            if(gameState !== 0){
                switch(gameState){
                    case 1:
                        console.log('Player 1 wins!');
                        break;
                    case 2:
                        console.log('Player 2 wins!');
                        break;
                    case 3:
                        console.log("It's a tie!");
                        break;
                    default:
                        console.log('Something went wrong!');
                }
            }
            else SwitchPlayer();
        }
    }

    const StartGame = (first, second) => {
        gameboard = ['', '', '', '', '', '', '', '', ''];
        SetPlayers(first, second);
        SendPlayers();
        firstIsCurrentPlayer = true;
        GameBoard.InitializeGameboard();
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