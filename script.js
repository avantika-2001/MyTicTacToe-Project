window.addEventListener('DOMContentLoaded', () => {
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.disp_player');
    const resetButton = document.querySelector('#reset');
    const result = document.querySelector('.winner');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    boxes.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    const userAction = (box, index) => {
        if(isValidAction(box) && isGameActive) {
            box.innerText = currentPlayer;
            updateBoard(index);
            checkResult();
            changePlayer();
        }
    }
    function checkResult() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
        announce(TIE);
    }

    const isValidAction = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O'){
            return false;
        }
        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                result.innerHTML = 'Player <span class="Player_0">O</span> Won';
                break;
            case PLAYERX_WON:
                result.innerHTML = 'Player <span class="Player_X">X</span> Won';
                break;
            case TIE:
                result.innerText = 'Tie';
        }
        result.classList.remove('vanish');
    };
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        result.classList.add('vanish');

        if (currentPlayer === 'O') {
            changePlayer();
        };

        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('Player_X');
            box.classList.remove('Player_0');
        });
    }
    resetButton.addEventListener('click', resetBoard);

});