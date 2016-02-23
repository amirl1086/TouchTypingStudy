/* Author: Amir Lavi */
/*===================*/
/* Java Script File - Implement the functionality */
/*================================================*/

//object literal for statistics
var statistics = {
    currentTime: 0,
    wordCount: 0,
    errorsCount: 0,
    charsCount: 0
};

//the time interval variable
var timeInterval;

//the program library
var exercisesLibrary =
    ["Welcome to Touch typing study. This is also an exersice, start practicing now or choose a different lesson from below",
    "I'm so grateful now. I'm going to manifest getting accepted into my dream college and receiving my associates degree.",
    "Then one day I picked The Secret up and started reading it and could not put it down.",
    "I just broke up with my boyfriend. We used to live together and so I had to find a new place to live.",
    "Now already shocked by what had happened, I quickly responded with a yes! What happened next blew me away!",
    "The law of attraction not only got me what I wanted but it also gave me so much more.",
    "Let these incidents strengthen your faith and I bless the readers that their wishes materialize instantly!",
    "The interviewer had a closing comment; \"Sumeet, you have the power to emit positivity.\""];

//this function will be called upon pressing the keyboard
var textUpdated = function()
{
    //the user input
    var userText = this.value;

    //updating the statistics
    statistics.charsCount = userText.length;
    statistics.wordCount = userText.split(" ").length;

    //the id of the text displayed
    var textDisplayId = document.getElementById("textDisplay");

    //get the string inside the text displayed
    var subjectText = textDisplayId.innerText;

    var colors = ["black", "red", "green"];
    textDisplayId.innerText = ""; //initialize the text in the displayed box

    //a loop that will decide in which color to paint the current letter
    var i;
    for (i = 0; i < subjectText.length; i++)
    {
        if (i >= userText.length) //if longer than user input paint in black
            textDisplayId.innerHTML += ("<span style='color:" + colors[0] + ";'>" + subjectText[i] + "</span>");
        else if (subjectText[i] != userText[i]) //if not equal paint in red
            textDisplayId.innerHTML += ("<span style='color:" + colors[1] + ";'>" + subjectText[i] + "</span>");
        else if (subjectText[i] == userText[i]) //if equal paint in green
            textDisplayId.innerHTML += ("<span style='color:" + colors[2] + ";'>" + subjectText[i] + "</span>");
    }

    //count errors (user deletion is available)
    statistics.errorsCount = 0;
    for (i = 0; i < userText.length; i++)
        if (subjectText[i] != userText[i])
            statistics.errorsCount++;
};

//this function will run upon setInterval. will update and print the current statistics
var runClock = function()
{
    //displaying the timer
    var date = new Date(statistics.currentTime);
    var milliSeconds = date.getMilliseconds();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var updateTimeId = document.getElementById("updateTime");
    updateTimeId.innerHTML = "<h2> Time Elapsed: " + minutes + ":" + seconds + ":" + (milliSeconds / 100) + " </h2>";

    //displaying number of words per minute - by a formula found on "http://www.wikihow.com/Calculate-Words-Per-Minute"
    var wordsPerMinuteId = document.getElementById("wordsPerMinute");
    var numOfMinutesPassed = (date.getTime() * (1 / 1000)) / 60;
    var wpm = Math.round(statistics.wordCount / numOfMinutesPassed);
    if (isNaN(wpm) || !isFinite(wpm))
        wpm =0;
    wordsPerMinuteId.innerHTML = "<h2> Words Per Minute: " + wpm + " </h2>";

    //displaying number of errors
    var errorsPercentageId = document.getElementById("errorPercentage");
    var ep = Math.round(statistics.errorsCount / statistics.charsCount * 100);
    if (isNaN(ep) || !isFinite(ep))
        ep =0;
    errorsPercentageId.innerHTML = "<h2> Error Percentage: " + ep + "%" + " </h2>";

    //displaying characters typed
    var charCountId = document.getElementById("charsCount");
    charCountId.innerHTML = "<h2> Characters Typed: " + statistics.charsCount + " </h2>";
    statistics.currentTime = statistics.currentTime + 100;
};

//this function will run upon one of the time button was clicked
var handleTime = function(e)
{
    //the content inside the button clicked
    var content = e.target.innerText;

    //get the buttons class in the form of an array to apply settings
    var timeButtons = document.getElementsByClassName("timeButton");

    //get the user input box's id
    var userInput = document.getElementById("userInputBox");

    //go through the options
    if (content == "PLAY")
    {
        timeButtons[0].innerText = "PAUSE"; //switch the option
        userInput.disabled = false; //enable input by user
        timeButtons[0].style.backgroundColor = "#003399";  //change color to pause color
        timeInterval = setInterval(runClock, 100);
        userInput.focus();
    }
    else if (content == "PAUSE")
    {
        timeButtons[0].innerText = "PLAY"; //switch the option
        userInput.disabled = true;
        clearInterval(timeInterval);
        timeButtons[0].style.backgroundColor = "#006633"; //change color to play color
    }
    else if (content == "NEW")
    {
        //initialize all settings
        clearInterval(timeInterval);
        statistics.currentTime = 0;
        statistics.errorsCount = 0;
        statistics.charsCount = 0;
        statistics.wordCount = 0;
        userInput.value = "";
        runClock(); //run clock will initialize the statistics

        //change the displayed text to the default one
        document.getElementById("textDisplay").innerText = exercisesLibrary[0];

        //if "NEW" was clicked during runtime innerText should be "PAUSE"
        if (timeButtons[0].innerText == "PAUSE")
        {
            timeButtons[0].innerText = "PLAY"; //switch the option
            userInput.disabled = true; //disable input by user
            timeButtons[0].style.backgroundColor = "#006633"; //change color to play color
        }
    }
};

//this function will change the displayed text accodigly to the usere's choice
var switchText = function(e)
{
    var userInput = document.getElementById("userInputBox");
    if (userInput.value.length != 0 || (userInput.value.length == 0 && statistics.currentTime > 100))
        return;
    //get the button typed on
    var content = e.target.innerText;
    var textSwitching = document.getElementById("textDisplay");

    //go through the options
    if (content == "Lesson 1")
        textSwitching.innerHTML = exercisesLibrary[1];
    else if (content == "Lesson 2")
        textSwitching.innerHTML = exercisesLibrary[2];
    else if (content == "Lesson 3")
        textSwitching.innerHTML = exercisesLibrary[3];
    else if (content == "Lesson 4")
        textSwitching.innerHTML = exercisesLibrary[4];
    else if (content == "Lesson 5")
        textSwitching.innerHTML = exercisesLibrary[5];
    else if (content == "Lesson 6")
        textSwitching.innerHTML = exercisesLibrary[6];
    else //definitely Lesson 7
        textSwitching.innerHTML = exercisesLibrary[7];
};

//this function will be loaded with the body
var pageListeners = function () {
    var i;
    //setting up listeners for the exercise buttons
    var switchButtons = document.getElementsByClassName("textSwitchingButton");
    for (i = 0; i < switchButtons.length; i++)
        switchButtons[i].addEventListener("click", switchText, false);

    //setting up listeners for the time buttons
    var timeButtons = document.getElementsByClassName("timeButton");
    for (i = 0; i < timeButtons.length; i++)
        timeButtons[i].addEventListener("click", handleTime, false);
    //change the color of the play button
    timeButtons[0].style.backgroundColor = "#006633";

    //setting up the text box for the user to type in
    var userInput = document.getElementById("userInputBox");
    userInput.addEventListener("keyup", textUpdated, false); //second section
    userInput.disabled = true;
    userInput.defaultValue = "";

    //initialize the text displayed
    var textDisplay = document.getElementById("textDisplay");
    textDisplay.innerHTML = exercisesLibrary[0];

    //run clock will initialize the statistics
    runClock();
};

