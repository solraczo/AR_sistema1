document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("a[rel='ar']");
    
    if (!window.navigator.userAgent.includes("iPhone")) {
        button.style.display = "none";
        alert("Esta experiencia de AR solo funciona en iPhone.");
    }
});
