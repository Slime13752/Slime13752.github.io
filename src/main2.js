import { showSlides, plusSlides } from "./slideshow2.js";
import { loadImages } from "./xhr.js";

let imageDescription = {};

/**
 * Takes in a JSON String and loops through each key value pair. The designed JSON has an image key and a lot of value pairs to go with that
 * image key. Looping through each value, the code is able to create images on the fly through a lot of JSON data.
 * @param {*} jsonString 
 */
const makeImages = (jsonString) => {
    const response = JSON.parse(jsonString);

    imageDescription[1] = "An Amber Tree, one of the main wood trees of Wish Guardian."; // hardcode the first image description

    Object.entries(response).forEach((entry) => {
        const [key, value] = entry;
        //console.log(`${key}: ${value}`); //making sure you can get all the image data
        

        // Each value paired with the image key is it's own image. This loops through each value to generate an image.
        for(const image of value){
            //console.log(values); // this should be a JSON object of each image, stored separately
            const div = document.createElement("div");
            document.querySelector(".container").appendChild(div);
            div.className = `mySlides`; // need the class name mySlides so that slideshow.js can select every image with querySelectorAll
            
            // inner HTML for tall images
            if(image.number == 17 || image.number == 55 || image.number == 58 ||image.number == 73 ||image.number == 74 || 
                image.number == 75 || image.number == 80){
                div.innerHTML = `
                    <div class="numbertext">${image.number} / ${image.total}</div>
                    <img src=${image.url} style="height:auto" alt="${image.name}">`;
            }

            // inner HTML for long images
            else{
                div.innerHTML = `
                    <div class="numbertext">${image.number} / ${image.total}</div>
                    <img src=${image.url} style="width:100%" alt="${image.name}">`;
            }
            
            imageDescription[image.number] = image.description;
        }
        
    });

}

const hideShowText = (textClass, buttonID) =>{
    const elementList = document.querySelectorAll(textClass);
    if(elementList[0].disabled){
        for(let i = 0; i < elementList.length; i++){
            elementList[i].disabled = false;
            elementList[i].style.display = "block";
            document.querySelector(buttonID).innerHTML = "Hide Text"
        }
    }else{
        for(let i = 0; i < elementList.length; i++){
            elementList[i].disabled = true;
            elementList[i].style.display = "none";
            document.querySelector(buttonID).innerHTML = "Show Text"
        }
    }
}
hideShowText(".one", "#uno");
hideShowText(".two", "#dos");
hideShowText(".three", "#tres");
loadImages(makeImages, "./data/image-data2.json"); //need to actually call load images in order to generate every image from your JSON

showSlides(1); // display the first slide in the loop by default

document.querySelector(".prev").addEventListener('click', () => { plusSlides(-1) }); // make the previous button work
document.querySelector(".next").addEventListener('click', () => { plusSlides(1) }); // make the next button work
document.querySelector("#uno").addEventListener('click', () => {hideShowText(".one", "#uno")});
document.querySelector("#dos").addEventListener('click', () => {hideShowText(".two", "#dos")});
document.querySelector("#tres").addEventListener('click', () => {hideShowText(".three", "#tres")});

let delay = 100000;
let fps = 60;
let timeoutID;
let buttonClicks = 1;
const loop = () => {
    
    if(buttonClicks == 1 || buttonClicks == 2){
        timeoutID = setTimeout(loop, delay / fps);
        plusSlides(1);
    }
    
    
}
const stopLoop = () => {
    clearTimeout(timeoutID);
}

loop();

let isPlay = false;

// make the play button work
document.querySelector("#play").addEventListener('click', () => { 
    if(isPlay){
        loop(); 
        buttonClicks += 1;
        loop();
        //console.log(buttonClicks);
        isPlay = false;
        document.querySelector("#play").innerHTML = "Pause Slideshow";
    }
    else{
        stopLoop(); 
        buttonClicks = 0; 
        //console.log(buttonClicks);
        isPlay = true;
        document.querySelector("#play").innerHTML = "Play Slideshow";
    }
    
}); 

// make the pause button work
//document.querySelector("#pause").addEventListener('click', () => { }); 

export{imageDescription};