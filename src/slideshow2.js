import { imageDescription } from "./main2.js";

let slideIndex = 1;

/**
 * Increment the current slide by the number entered
 * @param {*} n The amount of slides to move forward by
 */
export const plusSlides = (n) => {
    showSlides(slideIndex += n);
}

/**
 * Handles the logic of displaying the correct slide and updating the caption text.
 * @param {*} n The slide to display
 */
export const showSlides = (n) => {
    let i;
    let slides = document.querySelectorAll(".mySlides");
    let captionText = document.querySelector("#caption");
    
    //wrap around to display the slide at the beginning
    if (n > slides.length) { slideIndex = 1 }

    //wrap around to display the slide at the end
    if (n < 1) { slideIndex = slides.length }

    // make all images in the slide disabled
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // make the current slide viewable
    slides[slideIndex - 1].style.display = "block"; 
    captionText.innerHTML = imageDescription[slideIndex];
    if(slideIndex == 1){
        captionText.innerHTML = "An Amber Tree, one of the main wood trees of Wish Guardian."; // hardcode the first image description
    }
    
}
