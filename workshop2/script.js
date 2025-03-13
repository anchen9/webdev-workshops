// Set variables for later use
let circle = document.getElementById("circle");
let square = document.getElementById("square");
let changeCircleBtn = document.getElementById("changeCircleBtn");

// Reusable function that changes the background color of clicked element to black
function changeColor() {
  this.style.backgroundColor = "black";
  alert("color of " + this.id + " has been changed");
}

/*
Add event listeners to square and circle elements; listens for click
and responds with function declared above
*/
square.addEventListener("click", changeColor);
circle.addEventListener("click", changeColor);

// Create a specific line of action for one particular element
changeCircleBtn.addEventListener("click", function changeCircle() {
  circle.classList.remove("circle");
  circle.classList.add("square");
});
