//Module for anything display-related
const GameBoard = (() => {
    
    const gameboard = document.querySelector('.game-board');
    let gameboardCells = [];
    let players = [];

    
    //Private functions
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


    //Public functions
    const SetPlayers = (playerList) => players = playerList;

    const InitializeGameboard = () => {
        gameboardCells = [];
        gameboard.innerHTML = '';
        for(let i = 0; i < 9; i++){
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            gameboard.appendChild(cell);
            gameboardCells.push(cell);
        }
        InitializeEventHandlers();
    }

    const FinishGame = (indices, name) => {
        RemoveEventHandlers();
        if(indices !== null){
            statusDiv.textContent = `${name} won! Congratulations!`
            for(let i of indices){
                gameboardCells[i].style.backgroundColor = 'green';
            }
        }
        else{
            statusDiv.textContent = "It's a tie!";
        }
        startBtn.disabled = false;
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
        SetPlayers,
        InitializeGameboard,
        FinishGame,
        Render
    };
})();


//Module for anything game-logic related
const GameLogic = (() => {

    //Which line combinations need to be checked for a win
    const CHECK_INDICES_ARRAY = [[0, 1, 2], [3, 4, 5], [6, 7, 8], 
                                 [0, 3, 6], [1, 4, 7], [2, 5, 8],
                                 [0, 4, 8], [2, 4, 6]];
    let firstIsCurrentPlayer = true;
    let  players = [];
    let gameboard = ['', '', '', '', '', '', '', '', ''];



    //Private functions
    const SetPlayers = (player1, player2) => {
        players = [player1, player2];
    }

    const SendPlayers = () => GameBoard.SetPlayers(players);

    const SwitchPlayer = () => {
        firstIsCurrentPlayer = !firstIsCurrentPlayer;
        statusDiv.textContent = firstIsCurrentPlayer ? `${players[0].getName()}'s turn` : `${players[1].getName()}'s turn`;
    }

    //Returns true if a given line combination contains the same marker in every cell
    const CheckOneRow = (indices) => {
        if(gameboard[indices[0]] === '' || gameboard[indices[1]] === '' || gameboard[indices[2]] === ''){
            return false;
        }
        else if(gameboard[indices[0]] === gameboard[indices[1]] && gameboard[indices[0]] === gameboard[indices[2]]){
            return true;
        }
        else return false;
    }

    //Returns true if the game ended and calls GameBoard's FinishGame function with appropriate parameters
    //Returns false if the game has not been decided
    const CheckGameEnd = () => {
        for(let indices of CHECK_INDICES_ARRAY){
            if(CheckOneRow(indices)){
                if(gameboard[indices[0]] === players[0].getMarker()) {
                    GameBoard.FinishGame(indices, players[0].getName());
                    return true; 
                }
                else{
                    GameBoard.FinishGame(indices, players[1].getName());
                    return true; 
                }
            }
        }
        for(let cell of gameboard){
            if(cell === '') return false;
        }
        GameBoard.FinishGame(null);
        return true;
    }



    //Public functions
    const GetCell = (index) => {
        return gameboard[index];
    }

    const AddMark = (index) => {
        if(gameboard[index] === ''){
            gameboard[index] = firstIsCurrentPlayer ? players[0].getMarker() : players[1].getMarker();
            if(!CheckGameEnd()) SwitchPlayer();
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



//Basically just a container for player data
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



const statusDiv = document.querySelector('.game-info');
statusDiv.textContent = 'Welcome to Tic Tac Toe! Please enter your names!';
const startBtn = document.querySelector('.startBtn');

startBtn.addEventListener('click', (e) => {
    const p1 = document.querySelector('#p-1');
    const p2 = document.querySelector('#p-2');
    if(p1.value && p2.value){
        GameLogic.StartGame(Player(p1.value, 'X', 'blue'), Player(p2.value, 'O', 'red'));
        e.target.disabled = true;
        statusDiv.textContent = `${p1.value}'s turn`;
    }
    else{
        statusDiv.textContent = 'Enter both names before you start the game!';
    }
});