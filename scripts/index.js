
let currentAmount = 0;
let goalAmount = 128;

// Buttons
let addEight = document.getElementById("eight-oz");
let addTwelve = document.getElementById("twelve-oz");
let addSixteen = document.getElementById("sixteen-oz");
let addCustom = document.getElementById("custom-oz");
let resetButon = document.getElementById("reset-btn");


// Intake text
let intakeText = document.getElementById("current-intake");
let customText = document.getElementById("customWaterAmount");

// Water level
let waterLevel = document.getElementsByClassName("inner-cup")[0];

// Button Functions
resetButon.addEventListener("click", function(){
    currentAmount = 0;
    console.log("Post Reset Amount: " + currentAmount);

    waterLevel.style.height = `0%`;
    intakeText.innerText = `0 / ${goalAmount} (0%)`
})

addEight.addEventListener("click", function(){
    // update Number value
    console.log(currentAmount);
    currentAmount = currentAmount + 8;
    console.log("After add 8: " + currentAmount);

    // update css of cup.
    let currentPercentage = ((currentAmount / goalAmount) * 100).toFixed(1);
    waterLevel.style.height = `${currentPercentage}%`;

    intakeText.innerText = `${currentAmount} / ${goalAmount} (${currentPercentage}%)`
    console.log(intakeText);
});

addTwelve.addEventListener("click", function(){
    // update Number value
    console.log(currentAmount);
    currentAmount = currentAmount + 12;
    console.log("After add 12: " + currentAmount);

    let currentPercentage = ((currentAmount / goalAmount) * 100).toFixed(1);
    waterLevel.style.height = `${currentPercentage}%`;

    intakeText.innerText = `${currentAmount} / ${goalAmount} (${currentPercentage}%)`
    console.log(intakeText);
});

addSixteen.addEventListener("click", function(){
    // update Number value
    console.log(currentAmount);
    currentAmount = currentAmount + 16;
    console.log("After add 16: " + currentAmount);

    let currentPercentage = ((currentAmount / goalAmount) * 100).toFixed(1);
    waterLevel.style.height = `${currentPercentage}%`;

    intakeText.innerText = `${currentAmount} / ${goalAmount} (${currentPercentage}%)`
    console.log(intakeText);
});

addCustom.addEventListener("click", function(){
    console.log("CUSTOM VAL DEBUG: Custom val pressed");
    addCustom.style.display=`none`;
    resetButon.style.display = `none`;
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

            currentAmount = currentAmount + num;

            console.log("CUSTOM VAL DEBUG: amt after add: " + currentAmount);

            let currentPercentage = ((currentAmount / goalAmount) * 100).toFixed(1);
            waterLevel.style.height = `${currentPercentage}%`;

            intakeText.innerText = `${currentAmount} / ${goalAmount} (${currentPercentage}%)`
            console.log(intakeText);

            customText.value = "";
            customText.style.display="none";
            addCustom.style.display = `inline-block`;
            resetButon.style.display = `inline-block`;

        }

        else{
            console.log("custom amt error");
            customText.value = "Invalid Input :("
        }
    }   
});
