let grid = [];
let score = 0;

function initGrid() {
    const gridElement = document.querySelector('.grid');
    gridElement.innerHTML = '';
    grid = Array(4).fill().map(() => Array(4).fill(0));
    
    // 創建網格單元格
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        gridElement.appendChild(cell);
    }
    
    // 初始添加兩個數字
    addNewNumber();
    addNewNumber();
    updateDisplay();
}

function addNewNumber() {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({x: i, y: j});
            }
        }
    }
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateDisplay() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const value = grid[i][j];
            const cell = cells[i * 4 + j];
            cell.textContent = value || '';
            cell.setAttribute('data-value', value);
        }
    }
    document.getElementById('score').textContent = score;
}

function move(direction) {
    let moved = false;
    const oldGrid = JSON.stringify(grid);

    if (direction === 'left' || direction === 'right') {
        for (let i = 0; i < 4; i++) {
            let row = grid[i].filter(x => x !== 0);
            if (direction === 'right') row.reverse();

            // 合併相同的數字
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    score += row[j];
                    row.splice(j + 1, 1);
                }
            }

            // 填充零
            while (row.length < 4) {
                direction === 'left' ? row.push(0) : row.unshift(0);
            }

            if (direction === 'right') row.reverse();
            grid[i] = row;
        }
    } else {
        for (let j = 0; j < 4; j++) {
            let col = grid.map(row => row[j]).filter(x => x !== 0);
            if (direction === 'down') col.reverse();

            // 合併相同的數字
            for (let i = 0; i < col.length - 1; i++) {
                if (col[i] === col[i + 1]) {
                    col[i] *= 2;
                    score += col[i];
                    col.splice(i + 1, 1);
                }
            }

            // 填充零
            while (col.length < 4) {
                direction === 'up' ? col.push(0) : col.unshift(0);
            }

            if (direction === 'down') col.reverse();
            for (let i = 0; i < 4; i++) {
                grid[i][j] = col[i];
            }
        }
    }

    if (oldGrid !== JSON.stringify(grid)) {
        addNewNumber();
        updateDisplay();
    }
}

function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
    }
}

function resetGame() {
    score = 0;
    initGrid();
}

// 初始化遊戲
document.addEventListener('keydown', handleKeyPress);
initGrid(); 