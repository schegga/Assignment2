//---------------Slideshow----------------
slideIndex = 0; // Initialisiert den Slide-Index auf 0
showSlides(); // Startet die Funktion showSlides

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides"); // Sammelt alle Elemente mit der Klasse "mySlides"
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Versteckt alle Slides
    }
    slideIndex++; // Erhöht den Slide-Index um eins
    if (slideIndex > slides.length) { slideIndex = 1 } // Setzt den Slide-Index zurück auf 1, wenn das Ende erreicht ist
    slides[slideIndex - 1].style.display = "block"; // Zeigt das aktuelle Slide an
    setTimeout(showSlides, 5000); // Wechselt die Slides alle 5 Sekunden
}
