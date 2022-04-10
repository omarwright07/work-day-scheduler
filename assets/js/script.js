// get today's date to display at the top of web app
var todayDate = moment().format("dddd, MMMM Do");
//holds all time block data to save
var timeBlocks = {
    timeBlock9AM: "Test1",
    timeBlock10AM: "Test1",
    timeBlock11AM: "Test1",
    timeBlock12PM: "Test1",
    timeBlock1PM: "Test1",
    timeBlock2PM: "Test1",
    timeBlock3PM: "Test1",
    timeBlock4PM: "Test1",
    timeBlock5PM: "Test1",
};
// ###########################################################
// ###########################################################
// Save and Load Funcitons ____________________________________
var saveTimeBlock = function () {
    console.log("Saving...")
    // var timeBlockEntry = {
    //     time: ,
    //     description: , 
    // }
    saveTimeBlocks();
};

var saveTimeBlocks = function () {
    // localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
    console.log(timeBlocks);
};

var loadTimeBlocks = function () {
    console.log("Loading Time Blocks....");
    timeBlocks = JSON.parse(localStorage.getItem("timeBlocks"));

    // if nothing in localStorage, create a new object to track all description
    if (!timeBlocks) {
        console.log("There was no local save!");
    } else {
        console.log("Loaded from local save!")
    }
};

$(".container").on("click", ".saveBtn", saveTimeBlock);

// Time Blocks Funcitons ____________________________________
var updateTimeBlocks = function () {
    //Sets the current date in case it's midnight
    console.log("Updating Time Blocks....");
    for (i = 0; i < 9; i++) {
        var timeBlockEl = ("#timeblock" + moment("9AM", "hA").add(i, "hour").format("hA"));
        checkTimeBlock($(timeBlockEl));
    }
};

var checkTimeBlock = function (timeBlockEl) {
    // remove any old classes from element
    $(timeBlockEl).removeClass("future past present");
    var blockID = $(timeBlockEl).attr("id").replace("timeblock","");
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
    console.log("Generating Time Blocks....");
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
            .addClass("textarea col pt-2 text-left past")
            .attr("id", ("timeblock" + timeBlockHour))
            .text("");

        var timeBlockBTN = $("<button>")
            .addClass("saveBtn col-1");

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
    var currentDateEl = document.querySelector("#currentDay");
    currentDateEl.innerHTML = todayDate;
};

// ###########################################################
// ###########################################################
setCurrentDate();
generateTimeBlocks();
loadTimeBlocks();
var myUpdater = setInterval(updateTimeBlocks, 5000);
console.log("This is the timeblock object")
console.log(timeBlocks);