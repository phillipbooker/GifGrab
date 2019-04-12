var searched = false;
var currentSearch = "";
var searchTerms = ["batman", "spider-man", "tony danza"];
var currentGifs = [];

function generateButtons(){
    $("#button-box").empty();
    $.each(searchTerms, function(i, term){
        var newButton = $("<button>");
        newButton.addClass("search-button");
        newButton.text(term);
        $("#button-box").append(newButton);
    });
}


//Hzhkf0esHVMhW
$("#button-box").on("click", "button", function(){
    var searchText = $(this).text();
    if(searchText !== currentSearch){
        $("#gif-results").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchText + "&limit=10&rating=g&api_key=VEZHrKqVdCyZsqm04KR03fPmWINC3fFU";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.data[0].id);
            $.each(response.data, function(i, gif){
                var gifBox = $("<div>");
                gifBox.addClass("gif-box");


                var newGif = $("<img>");
                // console.log(gif.images.original.url);
                // console.log(gif.images.original_still.url);
                newGif.addClass("gif-result");
                newGif.attr("src", gif.images.original_still.url);
                newGif.attr("data-id", gif.id);
                newGif.attr("data-clicked", "f");
                newGif.attr("data-move", gif.images.original.url);
                newGif.attr("data-still", gif.images.original_still.url);
                
                var gifP = $("<p>");
                gifP.text("Rating: " + gif.rating);

                gifBox.append(newGif);
                gifBox.append(gifP);
                
                $("#gif-results").append(gifBox);
            });
            

        });
        currentSearch = searchText;
    }
    
});

$("#gif-results").on("click", ".gif-result", function(){
    var gif = $(this);
    var clicked = gif.attr("data-clicked");
    console.log("Initial clicked value: " + clicked);

    if(clicked == "t"){
        gif.attr("src", gif.attr("data-still"));
        gif.attr("data-clicked", "f");
    } else {
        gif.attr("src", gif.attr("data-move"));
        gif.attr("data-clicked", "t");
    }

    //Unable to get working with booleans
    // clicked = !clicked;

    // gif.attr("data-clicked", !clicked);
    console.log("New clicked value: " + gif.attr("data-clicked"));
})

$("#search-button").on("click", function(){
    event.preventDefault();

    //Considering handling ignore case situation
    var searchText = $("#search-text").val();

    if(searchText.length > 0 && searchTerms.indexOf(searchText) < 0){
        // var newButton = $("<button>");
        // newButton.text(searchText);
        // $("#button-box").append(newButton);
        searchTerms.push(searchText);
        generateButtons();
    }
    $("#search-text").val("");
});

$(document).ready(function(){
    // alert("hi");
    var searchString = "happy"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchString + "&limit=1&api_key=VEZHrKqVdCyZsqm04KR03fPmWINC3fFU";

    generateButtons();
    // var newButton = $("<button>");
    // newButton.text(searchString);
    // $("#button-box").append(newButton);

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    //     console.log(response.data[0].id);
    //     var newGif = $("<img>");
    //     newGif.attr("src", "https://media.giphy.com/media/" + response.data[0].id + "/giphy.gif")
    //     $("body").append(newGif);
    // });
});