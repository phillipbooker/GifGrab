//Variables used to prevent unnecessary loading of gifs
var searched = false;
var currentSearch = "";

//Initial array of search topics
var topics = ["rugrats", "hey arnold", "rocko", "doug", "angry beavers"];

//Array to hold current gifs for future features
// var currentGifs = [];

//Generates search buttons
function generateButtons(){
    $("#button-box").empty();
    $.each(topics, function(i, term){
        var newButton = $("<button>");
        newButton.addClass("search-button");
        newButton.addClass("btn");
        newButton.addClass("btn-dark");
        newButton.text(term);
        $("#button-box").append(newButton);
    });
}

//Fires the gif search
$("#button-box").on("click", "button", function(){
    var searchText = $(this).text();
    if(searchText !== currentSearch){
        $("#gif-results").empty();

        //Search using the text of the clicked button
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchText + "&limit=10&api_key=VEZHrKqVdCyZsqm04KR03fPmWINC3fFU";
        
        //Make API call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            //Loop through each gif object in response
            $.each(response.data, function(i, gif){
                //Creates div that holds resulting gif
                var gifBox = $("<div>");
                gifBox.addClass("gif-box");

                //Creates the gif image element
                var newGif = $("<img>");
                newGif.addClass("gif-result");
                newGif.attr("src", gif.images.original_still.url);
                newGif.attr("data-id", gif.id);
                newGif.attr("data-clicked", "f");
                newGif.attr("data-move", gif.images.original.url);
                newGif.attr("data-still", gif.images.original_still.url);

                //Need to explore data attributes
                
                //Creates paragraph element for gif rating
                var gifP = $("<p>");
                gifP.text("rating: " + gif.rating);
                gifP.addClass("rating");

                //Adds gif and rating to resulting gif div
                gifBox.append(newGif);
                gifBox.append(gifP);
                $("#gif-results").append(gifBox);
            });
            

        });
        //Store searched term to prevent repeat searches
        currentSearch = searchText;
    }
    
});

//Handles playing and stopping of gifs on click
$("#gif-results").on("click", ".gif-result", function(){
    var gif = $(this);
    var clicked = gif.attr("data-clicked");
    // console.log("Initial clicked value: " + clicked);

    if(clicked == "t"){
        gif.attr("src", gif.attr("data-still"));
        gif.attr("data-clicked", "f");
    } else {
        gif.attr("src", gif.attr("data-move"));
        gif.attr("data-clicked", "t");
    }

    //Unable to get working with booleans
    // gif.attr("data-clicked", !clicked);
    
    // console.log("New clicked value: " + gif.attr("data-clicked"));
})

//When search bar is used
$("#search-button").on("click", function(){
    //Stops default function of submit button
    event.preventDefault();

    //Converts search term to lower case
    var searchText = $("#search-text").val().toLowerCase();

    //Only adds to topics if it isn't already there
    if(searchText.length > 0 && topics.indexOf(searchText) < 0){
        topics.push(searchText);
        generateButtons();
    }

    //Clears search bar
    $("#search-text").val("");
});

//Initialize page with buttons
$(document).ready(function(){
    generateButtons();
});