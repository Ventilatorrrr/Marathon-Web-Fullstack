let slideIndex = 1;
let slides = document.getElementsByClassName("slide");
let intervalID = 0;
let userInteracted = false;

function slidesShow(n)
{
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";

    clearInterval(intervalID);
    if (!userInteracted)
    {
        intervalID = setInterval(() => slidesShow(slideIndex += 1), 3000);
    }
}

function plusSlides(n)
{
    userInteracted = true;
    slideIndex += n;
    slidesShow(slideIndex);
}

document.addEventListener("DOMContentLoaded", () => {
    slidesShow(slideIndex);
});