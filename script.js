var startingMoney = 10;
var autoPlayInterval;
var autoPlayActive = false;

document.getElementById("balance").textContent = "$" + numberWithCommas(startingMoney);
updateMultiplier();

function updateMultiplier() {
    var winPercentage = parseInt(document.getElementById("winPercentage").value);
    var multiplier = calculateMultiplier(winPercentage);
    document.getElementById("multiplier").textContent = multiplier.toFixed(2);
}

function playGame() {
    var betAmount = parseInt(document.getElementById("betAmount").value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > startingMoney) {
        displayError("Please enter a valid bet amount between 1 and " + numberWithCommas(startingMoney) + ".");
        return;
    }
    
    var winPercentage = parseInt(document.getElementById("winPercentage").value);
    var multiplier = calculateMultiplier(winPercentage);
    var randomNumber = Math.random() * 100;
    var result = "";
    
    if (randomNumber <= winPercentage) {
        var winAmount = betAmount * multiplier;
        result = "You win $" + numberWithCommas(winAmount) + "! Multiplier: " + multiplier.toFixed(2);
        startingMoney += winAmount;
    } else {
        var lossAmount = betAmount;
        result = "You lose $" + numberWithCommas(lossAmount) + "! Multiplier: " + multiplier.toFixed(2);
        startingMoney -= lossAmount;
    }
    
    if (startingMoney <= 0) {
        result += "<br>You are out of money. Game Over!";
        disableGame();
    } else {
        result += "<br>Your current balance: $" + numberWithCommas(startingMoney);
        document.getElementById("balance").textContent = "$" + numberWithCommas(startingMoney);
    }
    
    document.getElementById("result").innerHTML = result;
}

function calculateMultiplier(winPercentage) {
    if (winPercentage <= 10) {
        return 10;
    } else if (winPercentage <= 30) {
        return 5;
    } else if (winPercentage <= 50) {
        return 3;
    } else if (winPercentage <= 70) {
        return 2;
    } else {
        return 0.5;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toggleAutoPlay() {
    if (!autoPlayActive) {
        var interval = parseInt(document.getElementById("interval").value) * 1000;
        autoPlayInterval = setInterval(playGame, interval);
        autoPlayActive = true;
        document.getElementById("startAutoPlay").textContent = "Stop Auto Play";
    } else {
        clearInterval(autoPlayInterval);
        autoPlayActive = false;
        document.getElementById("startAutoPlay").textContent = "Start Auto Play";
    }
}

function disableGame() {
    document.getElementById("playGameButton").disabled = true;
    clearInterval(autoPlayInterval);
    autoPlayActive = false;
    document.getElementById("startAutoPlay").textContent = "Start Auto Play";
}

function displayError(message) {
    var errorElement = document.createElement("p");
    errorElement.style.color = "red";
    errorElement.textContent = message;
    document.getElementById("result").appendChild(errorElement);
    setTimeout(function() {
        document.getElementById("result").removeChild(errorElement);
    }, 3000); // Remove error message after 3 seconds
}
