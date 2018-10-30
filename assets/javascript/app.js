// Create array to hold buttons
let buttons = [];

// Add GIF button to buttons div
$("#add-gif-button").on("click", function(event) {
    event.preventDefault();

    let buttonText = $("#button-text").val().trim().toLowerCase();

    for (let button of buttons) {
        if (button.q === buttonText) { return 0 }
    }

    buttons.push(new GifButton($("#buttons"), buttonText));

    $("#button-text").val('');
});

// Prepends GIFs to page
$(document).on("click", ".gif-button", function(event) {
    let buttonObject;

    // Searches for object associated with gif generator
    for (let button of buttons) {
        if (button.q === event.target.innerText) {
            buttonObject = button;
        }
    }

    buttonObject.pushGIFs($("#main"));
});

// Pauses or plays a GIF when clicking
$(document).on("click", ".gallery-element", function(event) {
    // Make sure the user clicked on the image itself
    if (event.target.nodeName !== "IMG") {
        return 0;
    } else {
        // Change the state of the GIF from paused to playing or vice-versa
        if (event.target.getAttribute("src") === event.target.getAttribute("data-still")) {
            event.target.setAttribute("src", event.target.getAttribute("data-anim"));
        } else {
            event.target.setAttribute("src", event.target.getAttribute("data-still"));
        }
    }
});



