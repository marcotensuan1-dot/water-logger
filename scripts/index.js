
let currentAmount = 0;
let goalAmount = 128;
let history = []; // keep track of past amounts

let completionCounter = 0;
const completionText = document.getElementById("completion-title")

// Buttons
const settingsButton = document.getElementById("settings-btn");

const addEight = document.getElementById("eight-oz");
const addTwelve = document.getElementById("twelve-oz");
const addSixteen = document.getElementById("sixteen-oz");
const addCustom = document.getElementById("custom-oz");
const resetButon = document.getElementById("reset-btn");
const undoButton = document.getElementById("undo-btn");


// Intake text
let intakeText = document.getElementById("current-intake");
let customText = document.getElementById("customWaterAmount");

// Water level
let waterLevel = document.getElementsByClassName("inner-cup")[0];

// settings
const settingsModal = document.getElementById("settings-modal");
const closeModalButton = document.getElementById("close-modal");
let colorSelector = document.getElementById("colorSelector");
let goalInput = document.getElementById("custom-daily-goal");

// Add water function
function addWater(num){
    console.log("ADD FUNCTION DEBUG: adding: " + num);
    history.push(currentAmount); // pushes history before any change

    currentAmount = currentAmount + num;

    let currentPercentage = ((currentAmount / goalAmount) * 100).toFixed(1);
    waterLevel.style.height = `${currentPercentage}%`;

    intakeText.innerText = `${currentAmount} / ${goalAmount} (${currentPercentage}%)`
    console.log(intakeText);
    console.log(history);

    // Completion
    if(currentAmount >= goalAmount && completionCounter < 1){
        console.log("CONFETTI DEBUG: confetti triggered");
        completionCounter++;  

        completionText.style.display = `inline-block`;
        let sound = new Audio("./assets/audios/complete.mp3");
        sound.play();

        confetti({
            particleCount: 100,
            spread: 70,
            origin: {y: 0.6},
        });
        console.log("CONFETTI DEBUG: counter: " + completionCounter);
    }

}

// Button Functions
resetButon.addEventListener("click", function(){
    history.push(currentAmount);
    console.log(history);

    completionText.style.display = `none`;
    completionCounter = 0;
    console.log("CONFETTI DEBUG: counter: " + completionCounter);

    currentAmount = 0;
    console.log("Post Reset Amount: " + currentAmount);

    waterLevel.style.height = `0%`;
    intakeText.innerText = `0 / ${goalAmount} (0%)`
})

addEight.addEventListener("click", function(){
    // update Number value
    console.log(currentAmount);
    addWater(8);
    console.log("After add 8: " + currentAmount);
});

addTwelve.addEventListener("click", function(){
    // update Number value
    console.log(currentAmount);
    addWater(12);
    console.log("After add 12: " + currentAmount);
});

addSixteen.addEventListener("click", function(){
    // update Number value
    console.log(currentAmount);
    addWater(16);
    console.log("After add 16: " + currentAmount);
});

addCustom.addEventListener("click", function(){
    console.log("CUSTOM VAL DEBUG: Custom val pressed");
    addCustom.style.display=`none`;
    resetButon.style.display = `none`;
    undoButton.style.display = `none`;
    customText.style.display = `inline-block`;
    customText.focus();
});

// have to seperate
customText.addEventListener("keydown", function(event){
    // If enter is pressed, then add custom amt
    // Have to check of custom amt is integer
    if(event.key === "Enter"){
        console.log("CUSTOM VAL DEBUG: amt before add: " + currentAmount);
        let rawVal = customText.value;

        if(rawVal.trim() !== "" && /^-?\d+$/.test(rawVal)){
            let num = Number(rawVal);

            addWater(num);

            customText.value = "";
            customText.style.display="none";
            addCustom.style.display = `inline-block`;
            resetButon.style.display = `inline-block`;
            undoButton.style.display= `inline-block`;

        }

        else{
            console.log("custom amt error");
            customText.value = "";
            customText.placeholder="Invalid Input :(";
        }
    }   
});

// undo button
undoButton.addEventListener("click", function(){

    if(history.length > 0){
        currentAmount = history.pop();

        // Update cup UI
        let currentPercentage = ((currentAmount / goalAmount) * 100).toFixed(1);
        waterLevel.style.height = `${currentPercentage}%`;
        intakeText.innerText = `${currentAmount} / ${goalAmount} (${currentPercentage}%)`;
        console.log("UNDO DEBUG: Undid");
    }

    else{
        console.log("UNDO DEBUG: Nothing to undo")
    }
});

// Settings
settingsButton.addEventListener("click", function(){
    settingsModal.style.display = 'flex';
    goalInput.placeholder = goalAmount;
});

closeModalButton.addEventListener("click", function(){
    settingsModal.style.display = 'none';
});

goalInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        console.log("GOAL SETTINGS DEBUG: Enter Pressed");
        
        let rawVal = goalInput.value;

        if(rawVal.trim() !== "" && /^-?\d+$/.test(rawVal)){
            console.log("GOAL SETTINGS DEBUG: Valid Number: " + rawVal)
            let num = Number(rawVal);
            goalAmount = num;
            goalInput.value = "";
            console.log("GOAL SETTINGS DEBUG: goalAmount: " + goalAmount + "| goalInput: " + rawVal);
            addWater(0);
            goalInput.placeholder = goalAmount;
        }

        else{
            console.log("GOAL SETTINGS DEBUG: Invalid Input");
            goalInput.value="";
            goalInput.placeholder="Invalid Input :(";

        }
    }
});

colorSelector.addEventListener("change", function(){
    let selectedColor = colorSelector.value;
    waterLevel.style.backgroundColor = selectedColor;
    console.log("DEBUG COLOR CHANGE: color changed to: " + selectedColor);
});


