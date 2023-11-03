// USER MONEY
// DETERMINE BETTED LINE
// COLLECT BET
// SPIN SLOT
// CHECK IF USER WON
// GIVE USER WINNINGS
// PLAY AGAIN

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 3,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}


const getDeposit = () => {
    while (true) {
        const depositAmount = prompt("Deposit amount: ");
        const userDepositAmount = parseFloat(depositAmount);

        if (isNaN(userDepositAmount) || userDepositAmount <= 0) {
            console.log("Input a valid amount!")
        } else if (!isNaN(userDepositAmount)) {
            return userDepositAmount;

        } else {
            console.log("error in getting amount!");
        }
    }

};

const getLineOneBet = (userBalance) => {
    while (true) {
        const lineOneBet = prompt("Enter your bet in line 1 (0 if you will not bet in this line): ");
        const userLineOneBet = parseFloat(lineOneBet);

        if (isNaN(userLineOneBet) || userLineOneBet < 0) {
            console.log("Enter a valid bet!");
        } else if (userLineOneBet > userBalance){
            console.log("Bet amount is larger than your balance. ")
        } else {
            return userLineOneBet;
        }
    }
}

const getLineTwoBet = (userBalance) => {
    while (true) {
        const lineTwoBet = prompt("Enter your bet in line 2 (0 if you will not bet in this line): ");
        const userLineTwoBet = parseFloat(lineTwoBet);

        if (isNaN(userLineTwoBet) || userLineTwoBet < 0) {
            console.log("Enter a valid bet!");
        } else if (userLineTwoBet > userBalance){
            console.log("Bet amount is larger than your balance. ")
        } else {
            return userLineTwoBet;
        }
    }
}

const getLineThreeBet = (userBalance) => {
    while (true) {
        const lineThreeBet = prompt("Enter your bet in line 3 (0 if you will not bet in this line): ");
        const userLineThreeBet = parseFloat(lineThreeBet);

        if (isNaN(userLineThreeBet) || userLineThreeBet < 0) {
            console.log("Enter a valid bet!");
        } else if (userLineThreeBet > userBalance){
            console.log("Bet amount is larger than your balance. ")
        } else {
            return userLineThreeBet;
        }
    }
}

const spin = () => {
    const symbols = [];

    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length) 
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, lineOneBet, lineTwoBet, lineThreeBet) => {
    let winnings = 0;
    let lineCounter = 0;

    for (let row = 0; row < 3; row++){
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
            
        }
        lineCounter++;

        if (allSame && lineCounter == 1) {
            winnings += lineOneBet * SYMBOL_VALUES[symbols[0]]
            console.log("Line " + lineCounter + " won!");
        } else if (allSame && lineCounter == 2) {
            winnings += lineTwoBet * SYMBOL_VALUES[symbols[0]]
            console.log("Line " + lineCounter + " won!");
        } else if (allSame && lineCounter == 3) {
            winnings += lineThreeBet * SYMBOL_VALUES[symbols[0]]
            console.log("Line " + lineCounter + " won!");
        } else {
            console.log("Line " + lineCounter + " lost");
        }
    }

    return winnings;
}

const Game = () => {
    let userWantsToPlay = true;

    let totalDeposit = 0;
    let totalWinnings = 0;
    let totalGameResult = 0;
    let userBalance = getDeposit();
    totalDeposit += userBalance;

    while (userWantsToPlay) {
        console.log("Available Balance: " + userBalance);

        let userBetOnLineOne = getLineOneBet(userBalance);
        userBalance -= userBetOnLineOne;
        console.log("Remaining Balance: " + userBalance);

        let userBetOnLineTwo = getLineTwoBet(userBalance);
        userBalance -= userBetOnLineTwo;
        console.log("Remaining Balance: " + userBalance);

        let userBetOnLineThree = getLineThreeBet(userBalance);
        userBalance -= userBetOnLineThree;
        console.log("Remaining Balance: " + userBalance);

        const reels = spin();

        const rows = transpose(reels);

        printRows(rows);

        const winnings = getWinnings(rows, userBetOnLineOne, userBetOnLineTwo, userBetOnLineThree);

        console.log("You won: $" + winnings.toString());

        userBalance += winnings;
        totalWinnings += winnings;

        console.log("Total balance: $" + userBalance.toString());

        if (userBalance == 0) {
            console.log("Your balance is: " + userBalance);
            let depositAgain = prompt("Do you want to deposit again? (y/n): ");
            if (depositAgain == "y") {
                userBalance = getDeposit();
                totalDeposit += userBalance;

                console.log("=== New round ===");
            } else {
                totalGameResult = totalWinnings - totalDeposit;
                console.log("=== Your total deposit was:             $" + totalDeposit + " ===");
                console.log("=== By playing your total winning is:   $" + totalWinnings + " ===");
                console.log("=== Total Gain or Lost:                 $" + totalGameResult + " ===");
                console.log("=== Thank You for Playing! ===");
                console.log("=== Made by Omi ===");
                userWantsToPlay = false;
            }
        } else {
            let playAgain = prompt("Do you want to play again? (y/n): ");
            if (playAgain == "y") {
                console.log("=== New round ===");
            } else {
                totalGameResult = totalWinnings - totalDeposit;
                console.log("=== Your total deposit was:             $" + totalDeposit + " ===");
                console.log("=== By playing your total winning is:   $" + totalWinnings + " ===");
                console.log("=== Total Gain or Lost:                 $" + totalGameResult + " ===");
                console.log("=== Thank You for Playing! ===");
                console.log("=== Made by Omi ===");
                userWantsToPlay = false;
            }
        }
    }
}

console.log("========== Casiyes ==========");
Game();

