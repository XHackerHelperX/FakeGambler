        var startingMoney = 10;
        var autoPlayInterval;
        var autoPlayActive = false;
        var winPercentageSelect = document.getElementById("winPercentage");
        var moneyToday = 0;
        var moneyThisWeek = 0;
        var moneyLost = 0;
        var actualMoneyToday = 0;
        var actualMoneyThisWeek = 0;
        var achievements = [];
        
        document.getElementById("balance").textContent = "$" + numberWithCommas(startingMoney);
        document.getElementById("moneyToday").textContent = "$" + numberWithCommas(moneyToday);
        document.getElementById("moneyThisWeek").textContent = "$" + numberWithCommas(moneyThisWeek);
        document.getElementById("moneyLost").textContent = "$" + numberWithCommas(moneyLost);
        document.getElementById("actualMoneyToday").textContent = "$" + numberWithCommas(actualMoneyToday);
        document.getElementById("actualMoneyThisWeek").textContent = "$" + numberWithCommas(actualMoneyThisWeek);
        
function playGame() {
    var winPercentage = parseInt(winPercentageSelect.value);
    var betAmount = parseFloat(document.getElementById("betAmount").value);
    
    if (isNaN(winPercentage) || isNaN(betAmount)) {
        alert("Please enter valid numbers.");
        return;
    }
    
    if (betAmount <= 0 || betAmount > startingMoney) {
        alert("Bet amount must be between $0.01 and $" + numberWithCommas(startingMoney) + ".");
        return;
    }
    
    if (winPercentage < 0 || winPercentage > 50) {
        alert("Win percentage must be between 0 and 50.");
        return;
    }

    var multiplier = calculateMultiplier(winPercentage);
    var randomNumber = Math.random() * 100;
    var result = "";
    var today = new Date();
    var dayOfWeek = today.getDay();
    
    if (randomNumber <= winPercentage) {
        var winAmount = betAmount * multiplier;
        result = "You win $" + numberWithCommas(winAmount.toFixed(2)) + "! Multiplier: " + multiplier.toFixed(2);
        startingMoney += winAmount;
        moneyToday += winAmount;
        moneyThisWeek += winAmount;
        actualMoneyToday += winAmount;
        actualMoneyThisWeek += winAmount;
    } else {
        var lossAmount = betAmount;
        result = "You lose $" + numberWithCommas(lossAmount.toFixed(2)) + "! Multiplier: " + multiplier.toFixed(2);
        startingMoney -= lossAmount;
        moneyLost += lossAmount;
        actualMoneyToday -= lossAmount;
        actualMoneyThisWeek -= lossAmount;
    }
    
    if (startingMoney <= 0) {
        result += "<br>You are out of money. Game Over!";
        document.querySelector("button").disabled = true;
        clearInterval(autoPlayInterval);
        autoPlayActive = false;
        document.getElementById("startAutoPlay").textContent = "Start Auto Play";
    } else {
        result += "<br>Your current balance: $" + numberWithCommas(startingMoney.toFixed(2));
        document.getElementById("balance").textContent = "$" + numberWithCommas(startingMoney.toFixed(2));
    }
    
    document.getElementById("result").innerHTML = result;
    updateStats();
    checkAchievements();
}

           function calculateMultiplier(winPercentage) {
            if (winPercentage <= 5) {
                return 17;
            } else if (winPercentage <= 10) {
                return 8;
            } else if (winPercentage <= 15) {
                return 5;
            } else if (winPercentage <= 20) {
                return 3.7;
            } else if (winPercentage <= 25) {
                return 2.5;
            } else if (winPercentage <= 30) {
                return 2.3;
            } else if (winPercentage <= 35) {
                return 1.83;
            } else if (winPercentage <= 40) {
                return 1.5;
            } else if (winPercentage <= 45) {
                return 1.2;
            } else if (winPercentage <= 50) {
                return 1;
            } else {
                return 1;
            }
        }
        
 function numberWithCommas(x) {
    // Round to two decimal places and then add commas
    return (Math.round(x * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

function restart() {
    // Ask for confirmation before restarting
    var confirmRestart = confirm("Are you sure you want to restart? This will reset all your progress.");
    if (confirmRestart) {
        startingMoney = 10;
        moneyToday = 0;
        moneyThisWeek = 0;
        moneyLost = 0;
        actualMoneyToday = 0;
        actualMoneyThisWeek = 0;
        achievements = [];

        // Update displayed values
        document.getElementById("balance").textContent = "$" + numberWithCommas(startingMoney);
        document.getElementById("moneyToday").textContent = "$" + numberWithCommas(moneyToday);
        document.getElementById("moneyThisWeek").textContent = "$" + numberWithCommas(moneyThisWeek);
        document.getElementById("moneyLost").textContent = "$" + numberWithCommas(moneyLost);
        document.getElementById("actualMoneyToday").textContent = "$" + numberWithCommas(actualMoneyToday);
        document.getElementById("actualMoneyThisWeek").textContent = "$" + numberWithCommas(actualMoneyThisWeek);
        
        // Clear achievements display
        var achievementsList = document.getElementById("achievements");
        achievementsList.innerHTML = "";

        // Clear local storage
        localStorage.clear();
    }
}

        function updateMultiplier() {
            var winPercentage = parseInt(winPercentageSelect.value);
            var multiplier = calculateMultiplier(winPercentage);
            document.getElementById("result").innerHTML = "Multiplier: " + multiplier.toFixed(2);
        }
        
        function updateStats() {
            localStorage.setItem("startingMoney", startingMoney);
            localStorage.setItem("moneyToday", moneyToday);
            localStorage.setItem("moneyThisWeek", moneyThisWeek);
            localStorage.setItem("moneyLost", moneyLost);
            localStorage.setItem("actualMoneyToday", actualMoneyToday);
            localStorage.setItem("actualMoneyThisWeek", actualMoneyThisWeek);
            localStorage.setItem("achievements", JSON.stringify(achievements));
            
            document.getElementById("moneyToday").textContent = "$" + numberWithCommas(moneyToday);
            document.getElementById("moneyThisWeek").textContent = "$" + numberWithCommas(moneyThisWeek);
            document.getElementById("moneyLost").textContent = "$" + numberWithCommas(moneyLost);
            document.getElementById("actualMoneyToday").textContent = "$" + numberWithCommas(actualMoneyToday);
            document.getElementById("actualMoneyThisWeek").textContent = "$" + numberWithCommas(actualMoneyThisWeek);
        }
        
        function checkAchievements() {
            if (actualMoneyThisWeek >= 1000 && !achievements.includes("Week1k")) {
                achievements.push("Week1k");
                alert("Congratulations! You've reached the 1k milestone this week! You earned the achievement: 'Week1k'");
            }
            if (actualMoneyThisWeek >= 10000 && !achievements.includes("Week10k")) {
                achievements.push("Week10k");
                alert("Congratulations! You've reached the 10k milestone this week! You earned the achievement: 'Week10k'");
            }
            if (actualMoneyThisWeek >= 50000 && !achievements.includes("Week50k")) {
                achievements.push("Week50k");
                alert("Congratulations! You've reached the 50k milestone this week! You earned the achievement: 'Week50k'");
            }
            if (actualMoneyThisWeek >= 100000 && !achievements.includes("Week100k")) {
                achievements.push("Week100k");
                alert("Congratulations! You've reached the 100k milestone this week! You earned the achievement: 'Week100k'");
            }
            if (actualMoneyThisWeek >= 1000000 && !achievements.includes("Week1M")) {
                achievements.push("Week1M");
                alert("Congratulations! You've reached the 1M milestone this week! You earned the achievement: 'Week1M'");
            }
            if (actualMoneyThisWeek >= 1000000000 && !achievements.includes("Week1B")) {
                achievements.push("Week1B");
                alert("Congratulations! You've reached the 1B milestone this week! You earned the achievement: 'Week1B'");
            }
            if (actualMoneyThisWeek >= 1000000000000 && !achievements.includes("Week1T")) {
                achievements.push("Week1T");
                alert("Congratulations! You've reached the 1T milestone this week! You earned the achievement: 'Week1T'");
            }
            
            updateStats();
            displayAchievements();
        }
        
        function displayAchievements() {
            var achievementsList = document.getElementById("achievements");
            achievementsList.innerHTML = "";
            achievements.forEach(function(achievement) {
                var listItem = document.createElement("li");
                listItem.textContent = getAchievementName(achievement);
                achievementsList.appendChild(listItem);
            });
        }
        
        function getAchievementName(achievement) {
            switch (achievement) {
                case "Week1k":
                    return "Reached $1000 this week: 'Week1k'";
                case "Week10k":
                    return "Reached $10000 this week: 'Week10k'";
                case "Week50k":
                    return "Reached $50000 this week: 'Week50k'";
                case "Week100k":
                    return "Reached $100000 this week: 'Week100k'";
                case "Week1M":
                    return "Reached $1000000 this week: 'Week1M'";
                case "Week1B":
                    return "Reached $1000000000 this week: 'Week1B'";
                case "Week1T":
                    return "Reached $1000000000000 this week: 'Week1T'";
                default:
                    return "";
            }
        }
        
        // Check local storage for previous stats
        if (localStorage.getItem("startingMoney")) {
            startingMoney = parseInt(localStorage.getItem("startingMoney"));
            document.getElementById("balance").textContent = "$" + numberWithCommas(startingMoney);
        }
        if (localStorage.getItem("moneyToday")) {
            moneyToday = parseInt(localStorage.getItem("moneyToday"));
            document.getElementById("moneyToday").textContent = "$" + numberWithCommas(moneyToday);
        }
        if (localStorage.getItem("moneyThisWeek")) {
            moneyThisWeek = parseInt(localStorage.getItem("moneyThisWeek"));
            document.getElementById("moneyThisWeek").textContent = "$" + numberWithCommas(moneyThisWeek);
        }
        if (localStorage.getItem("moneyLost")) {
            moneyLost = parseInt(localStorage.getItem("moneyLost"));
            document.getElementById("moneyLost").textContent = "$" + numberWithCommas(moneyLost);
        }
        if (localStorage.getItem("actualMoneyToday")) {
            actualMoneyToday = parseInt(localStorage.getItem("actualMoneyToday"));
            document.getElementById("actualMoneyToday").textContent = "$" + numberWithCommas(actualMoneyToday);
        }
        if (localStorage.getItem("actualMoneyThisWeek")) {
            actualMoneyThisWeek = parseInt(localStorage.getItem("actualMoneyThisWeek"));
            document.getElementById("actualMoneyThisWeek").textContent = "$" + numberWithCommas(actualMoneyThisWeek);
        }
        if (localStorage.getItem("achievements")) {
            achievements = JSON.parse(localStorage.getItem("achievements"));
            displayAchievements();
        }
