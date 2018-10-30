class GifButton {
    constructor(targetDiv, searchTerm) {
        this.limit = 10
        this.offset = this.limit;
        this.targetDiv = targetDiv;
        this.q = searchTerm;
        this.renderHTMLButton();
    }

    /**
     * Renders the corresponding HTML button for a button element
     */
    renderHTMLButton() {
        let button = $(`<button>${this.q}</button>`);
        button.attr("class", "gif-button");
        this.targetDiv.prepend(button);
    }

    /**
     * Makes an AJAX call, grabs 10 gifs using object's search term, and prepends their divs
     * to the gallery div
     * @param {object} targetDiv - jQuery object where GIFs will be prepended
     */
    pushGIFs(targetDiv) {
        // Set request host, path, and parameters
        let host = "api.giphy.com/";
        let path = "v1/gifs/search";
        let params = {
            api_key: "9RA8AfbfVImLgUnzBjuz0B6OjlxNKo2d",
            limit: this.limit,
            offset: this.offset,
            q: this.q,
            rating: "pg"
        };

        // Assemble request url
        let queryURL = `https://${host}${path}?${$.param(params)}`;

        // Make request to GIPHY API
        $.ajax({
            url: queryURL,
            type: 'get'
        }).then(function(response) {
            // Build and prepend HTML gallery elements from returned GIF object
            let galleryElement,
                galleryGif,
                galleryGifSrcStill,
                galleryGifSrcAnim,
                galleryGifRating;

            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].rating);
                galleryElement = $("<div>");
                galleryElement.attr("class", "gallery-element");

                galleryGif = $("<img>");
                galleryGifRating = $("<p>");
                galleryGifSrcStill = response.data[i].images['fixed_height_small_still'].url;
                galleryGifSrcAnim = response.data[i].images['fixed_height_small'].url;

                galleryGif.attr("data-still", galleryGifSrcStill);
                galleryGif.attr("data-anim", galleryGifSrcAnim);
                galleryGif.attr("src", galleryGifSrcStill);

                galleryGifRating.text(`Rating: ${response.data[i].rating.toUpperCase()}`);

                // Append elements to div, append div to gallery
                galleryElement.append(galleryGif);
                galleryElement.append(galleryGifRating);
                targetDiv.prepend(galleryElement);
            }

        });

        // Increase offset to avoid repeat GIFs
        this.offset += this.limit;
    }
}