function createBoard() {
  for (let a = 0; a < 6; a++) {
    const row = document.createElement("tr");
    document.querySelector(".game-table").appendChild(row);
    for (let b = 0; b < 7; b++) {
      const slot = document.createElement("td");
      slot.className = "slot";
      row.appendChild(slot);
    }
  }
}

createBoard();

let tableRow = document.getElementsByTagName("tr");
let tableCell = document.getElementsByTagName("td");
let tableSlot = document.querySelectorAll(".slot");
const playerTurn = document.querySelector(".player-turn");
const reset = document.querySelector(".reset");
let player1;
let player2;
let currentPlayer = 1;
player1color = "red";
player2color = "yellow";

for (let i = 0; i < tableCell.length; i++) {
  tableCell[i].addEventListener("click", (e) => {
    console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
  });
}

window.onload = () => {
  player1 = prompt("Player One: Enter your name. You will be Red");
  player2 = prompt("Player Two: Enter your name. You will be Yellow");
  playerTurn.textContent = `${player1}'s Turn!`;
};

Array.prototype.forEach.call(tableCell, (cell) => {
  cell.addEventListener("click", changeColor);
  cell.style.backgroundColor = "white";
});

function changeColor(e) {
  let column = e.target.cellIndex;
  let row = [];

  for (let i = 5; i > -1; i--) {
    if (tableRow[i].children[column].style.backgroundColor == "white") {
      row.push(tableRow[i].children[column]);
      if (currentPlayer === 1) {
        row[0].style.backgroundColor = player1color;
        if (
          horizontalCheck() ||
          verticleCheck() ||
          diagonalCheck1() ||
          diagonalCheck2()
        ) {
          playerTurn.textContent = `${player1} Wins!`;
          playerTurn.style.color = player1color;
          //   setTimeout(() => {
          //     alert(`${player1} Wins!`);
          //   }, 100);
          return alert(`${player1} Wins!`);
        } else if (drawCheck()) {
          playerTurn.textContent = "Game is a Draw";
          return alert("DRAW!");
        } else {
          playerTurn.textContent = `${player2}'s Turn!`;
          return (currentPlayer = 2);
        }
      } else {
        row[0].style.backgroundColor = player2color;
        if (
          horizontalCheck() ||
          verticleCheck() ||
          diagonalCheck1() ||
          diagonalCheck2()
        ) {
          playerTurn.textContent = `${player2} Wins!`;
          playerTurn.style.color = player2color;
          return alert(`${player2} Wins!`);
        } else if (drawCheck()) {
          playerTurn.textContent = "Game is a Draw";
          return alert("DRAW!");
        } else {
          playerTurn.textContent = `${player1}'s Turn!`;
          return (currentPlayer = 1);
        }
      }
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  return one == two && one == three && one == four && one != "white";
}

function horizontalCheck() {
  for (let row = 0; row < tableRow.length; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        colorMatchCheck(
          tableRow[row].children[col].style.backgroundColor,
          tableRow[row].children[col + 1].style.backgroundColor,
          tableRow[row].children[col + 2].style.backgroundColor,
          tableRow[row].children[col + 3].style.backgroundColor
        )
      ) {
        return true;
      }
    }
  }
}

function verticleCheck() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          tableRow[row].children[col].style.backgroundColor,
          tableRow[row + 1].children[col].style.backgroundColor,
          tableRow[row + 2].children[col].style.backgroundColor,
          tableRow[row + 3].children[col].style.backgroundColor
        )
      ) {
        return true;
      }
    }
  }
}

function diagonalCheck1() {
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          tableRow[row].children[col].style.backgroundColor,
          tableRow[row + 1].children[col + 1].style.backgroundColor,
          tableRow[row + 2].children[col + 2].style.backgroundColor,
          tableRow[row + 3].children[col + 3].style.backgroundColor
        )
      ) {
        return true;
      }
    }
  }
}

function diagonalCheck2() {
  for (let col = 0; col < 4; col++) {
    for (let row = 5; row > 2; row--) {
      if (
        colorMatchCheck(
          tableRow[row].children[col].style.backgroundColor,
          tableRow[row - 1].children[col + 1].style.backgroundColor,
          tableRow[row - 2].children[col + 2].style.backgroundColor,
          tableRow[row - 3].children[col + 3].style.backgroundColor
        )
      ) {
        return true;
      }
    }
  }
}

function drawCheck() {
  let fullslot = [];
  for (let i = 0; i < tableCell.length; i++) {
    if (tableCell[i].style.backgroundColor != "white") {
      fullslot.push(tableCell[i]);
    }
  }
  if (fullslot.length === tableCell.length) {
    return true;
  }
}

reset.addEventListener("click", () => {
  tableSlot.forEach((slot) => {
    slot.style.backgroundColor = "white";
  });
  playerTurn.style.color = "black";
  return currentPlayer === 1
    ? (playerTurn.textContent = `${player1}'s Turn`)
    : (playerTurn.textContent = `${player2}'s Turn`);
});
