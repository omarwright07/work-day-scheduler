// get today's date to display at the top of web app
var todayDate = moment().format("dddd, MMMM Do");
var rightNow = moment().format();
//holds all time block data to save
var timeBlocks = {};
// ###########################################################
// ###########################################################
// Save and Load Funcitons ____________________________________
var saveTimeBlock = function () {
    console.log("Saving...")
};

var saveTimeBlocks = function () {
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
};

var loadTimeBlocks = function () {
    console.log("click");
};

$(".container").on("click", ".saveBtn", saveTimeBlock);

// Generate Time Blocks Funcitons ____________________________________
var generateTimeBlocks = function () {
    console.log("Generating Time Blocks....");
};

var updateTimeBlocks = function () {
    console.log("Updating Time Blocks....");
};

// Edit Text Funcitons ____________________________________
// Turns a <p> into a <textarea>
$(".container").on("click", "p", function () {
    // gets the p's current value/text
    var text = $(this)
        .text()
        .trim();

    // creates the textarea element
    var textInput = $("<textarea>")
        .addClass("textarea")
        .val(text);

    // replaces p with textarea element
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

// Returns <textarea> to <p>
$(".container").on("blur", "textarea", function () {
    // get the textarea's current value/text
    var text = $(this)
        .val()
        .trim();

    // recreate p element
    var timeBlockEl = $("<p>")
        .removeClass("textarea")
        .text(text);

    // replace textarea with p element
    $(this).replaceWith(timeBlockEl);
});



// Misc Funcitons ____________________________________
var setCurrentDate = function () {
    var currentDateEl = document.querySelector("#currentDay");
    currentDateEl.innerHTML = todayDate;
};

// ###########################################################
// ###########################################################
setCurrentDate();
generateTimeBlocks();
var myUpdater = setInterval(updateTimeBlocks, 5000);