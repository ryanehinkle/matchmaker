console.log("Starting Matchmaker.."); //Logs when application starts

const desiredResponses = [4, 5, 1, 4, 1]; // Set constants
const responseWeight = [2, 1, 3, 3, 2];
let userResponses = []; //Set as a variable so it can be changed after multiple clicks

function Range(a,b){ //Custom function to set a variable to a range/list of numbers given the start and end
	if (b === undefined) {
		b = a;
		a = 1;
	}
	return [...Array(b-a+1).keys()].map(x => x+a);
}

let match = Range(90, 100); //These are the range thresholds
let friend = Range(75, 89);
let goAway = Range(0, 74);

function calculateCompatibility() { 
    console.log("Calculating compatability.."); //Logs when the function starts
    userResponses = []; //Resets the userResponses list when button is clicked
    userResponses.push(document.getElementById("q1").selectedOptions[0].value);
    userResponses.push(document.getElementById("q2").selectedOptions[0].value);
    userResponses.push(document.getElementById("q3").selectedOptions[0].value);
    userResponses.push(document.getElementById("q4").selectedOptions[0].value);
    userResponses.push(document.getElementById("q5").selectedOptions[0].value);

    let totalCompatibility = 0;
    let totalWeighted = 0;
    
    for (let i = 0; i < userResponses.length; i++) { //Calculate compatability for each question and add to incremental total
        const userResponsesInt = parseInt(userResponses[i]);

        let questionCompatibility = Math.abs(userResponsesInt - desiredResponses[i]); //Regular compatability
        totalCompatibility += questionCompatibility;

        let questionWeighted = questionCompatibility * responseWeight[i]; //Weighted compatability
        totalWeighted += questionWeighted;
    }

    totalWeighted = 100 - totalWeighted //Subtracts from a scale of 100 and prints that total
    document.getElementById("score").innerHTML = "Your compatability score is " + totalWeighted + "%";

    if(match.includes(totalWeighted)) { //Displays remark based on threshold ranges
        document.getElementById("remark").innerHTML = "♡ We're a great match! ♡";
    } else if(friend.includes(totalWeighted)) {
        document.getElementById("remark").innerHTML = "We would probably be decent friends ¯\\_(ツ)_/¯";
    } else if(goAway.includes(totalWeighted)) {
        document.getElementById("remark").innerHTML = "Go away! ⸨◺_◿⸩";
    }

    detailed.disabled = false; //Enables the See Detailed Results button to be pressed
}

function detailedResults() { //Gets called onClick
    console.log("Displaying detailed results..") //Logs when function starts
    for (let i = 0; i < userResponses.length; i++) {
        questionNumber = parseFloat([i]) + 1 //Sets value to the number of thee question for each iteration
        const userResponsesInt = parseInt(userResponses[i]);

        let questionCompatibility = Math.abs(userResponsesInt - desiredResponses[i]); //Regular compatability
        let questionWeighted = questionCompatibility * responseWeight[i]; //Weighted compatability

        document.getElementById("desc").innerHTML = "Here is your detailed report. (Lower number is a better match)"; //Report description
        document.getElementById("detail" + questionNumber).innerHTML = ("Question " + questionNumber +
        ":<br>Compatability Score: " + questionCompatibility +
        "<br>Weighted Score: " + questionWeighted); //Displays the compatability and weighted scores with line breaks
    }
}