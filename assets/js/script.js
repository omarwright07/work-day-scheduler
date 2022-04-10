// Object that holds all time block data to save
var timeBlocks = {
    timeBlock9AM: "",
    timeBlock10AM: "",
    timeBlock11AM: "",
    timeBlock12PM: "",
    timeBlock1PM: "",
    timeBlock2PM: "",
    timeBlock3PM: "",
    timeBlock4PM: "",
    timeBlock5PM: "",
};

// ###########################################################
// ###########################################################
// Save and Load Funcitons ____________________________________
var saveTimeBlock = function (id) {
    console.log("Saving...")
    var saveTextArea = "#" + id;
    var text = $(saveTextArea).val();
    timeBlocks[id] = text;
    console.log(id);
    console.log(saveTextArea);
    console.log(text);
    console.log(timeBlocks);
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
};

var loadTimeBlocks = function () {
    console.log("Loading Time Blocks....");
    var savedtimeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));

    // if nothing in localStorage, create a new object to track all description
    if (!savedtimeBlocks) {
        console.log("There was no local save! Setting default values!");
        for (i = 0; i < 9; i++) {
            setTimeBlocksText();
        }
    } else {
        console.log("Loaded from local save!")
        timeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));
        setTimeBlocksText();
    }
};

var setTimeBlocksText = function () {
    for (i = 0; i < 9; i++) {
        var timeBlockEl = ("#timeBlock" + moment("9AM", "hA").add(i, "hour").format("hA"));
        // var test = timeBlockEl.replace("#","");
        $(timeBlockEl).text(Object.values(timeBlocks)[i]);
    }
}

// Time Blocks Funcitons ____________________________________
var updateTimeBlocks = function () {
    setCurrentDate();
    // console.log("Updating Time Blocks....");
    for (i = 0; i < 9; i++) {
        var timeBlockEl = ("#timeBlock" + moment("9AM", "hA").add(i, "hour").format("hA"));
        checkTimeBlock($(timeBlockEl));
    }
};

var checkTimeBlock = function (timeBlockEl) {
    // remove any old classes from element
    $(timeBlockEl).removeClass("future past present");
    var blockID = $(timeBlockEl).attr("id").replace("timeBlock", "");
    var blockTime = moment(blockID, "hA");
    var rightNow = moment().format("hh");

    // apply new class if task is in the future, past, or present
    if (blockTime.isAfter(rightNow)) {
        $(timeBlockEl).addClass("future");
    }
    else if (Math.abs(blockTime.diff(rightNow, "seconds")) <= 1) {
        $(timeBlockEl).addClass("past");
    }
    else {
        $(timeBlockEl).addClass("present");
    }
}


// Generate Time Blocks Funcitons ____________________________________
var generateTimeBlocks = function () {
    // console.log("Generating Time Blocks....");
    // (9) 9am,10am,11am,12pm,1pm,2pm,3pm,4pm,5pm
    for (var i = 0; i < 9; i++) {
        var timeBlockHour = moment("9AM", "hA").add(i, "hour").format("hA");

        // create elements that make up a time block
        var timeBlockDiv = $("<div>")
            .addClass("time-block row");

        var timeBlockHeader = $("<p>")
            .addClass("hour col-1 pt-3 text-right")
            .text(timeBlockHour);

        var timeBlockBody = $("<textarea>")
            .addClass("textarea col pt-2 text-left past time-text")
            .attr("id", ("timeBlock" + timeBlockHour))
            .text("");

        var timeBlockBTN = $("<button>")
            .addClass("saveBtn col-1")
            .attr("id", ("timeBlock" + timeBlockHour + "Save"));

        var timeBlockSaveIcon = $("<i>")
            .addClass("oi oi-clipboard");

        // append elements
        timeBlockBTN.append(timeBlockSaveIcon);
        timeBlockDiv.append(timeBlockHeader, timeBlockBody, timeBlockBTN);
        $(".container").append(timeBlockDiv);
    }
    updateTimeBlocks();
};

// Misc Funcitons ____________________________________
var setCurrentDate = function () {
    // get today's date to display at the top of web app
    var todayDate = moment().format("dddd, MMMM Do");
    var currentDateEl = document.querySelector("#currentDay");
    currentDateEl.innerHTML = todayDate;
};

// ###########################################################
// ###########################################################

setCurrentDate();
generateTimeBlocks();
loadTimeBlocks();
var myUpdater = setInterval(updateTimeBlocks, 5000);
$(".container").on("click", ".saveBtn", function () {
    var id = $(this).attr("id").replace("Save", "");
    saveTimeBlock(id);
});
