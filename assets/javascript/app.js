var searched = false;
var currentSearch = "";


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
                var newGif = $("<img>");
                newGif.attr("src", "https://media.giphy.com/media/" + gif.id + "/giphy.gif")
                $("#gif-results").append(newGif);
            });
            

        });
        currentSearch = searchText;
    }
    
});

$("#search-button").on("click", function(){
    
    event.preventDefault();
    var searchText = $("#search-text").val();
    if(searchText.length > 0){
        var newButton = $("<button>");
        newButton.text(searchText);
        $("#button-box").append(newButton);
    }
    $("#search-text").val("");
});

$(document).ready(function(){
    // alert("hi");
    var searchString = "happy"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchString + "&limit=1&api_key=VEZHrKqVdCyZsqm04KR03fPmWINC3fFU";

    var newButton = $("<button>");
    newButton.text(searchString);
    $("#button-box").append(newButton);

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