function changeColors() {
  document.getElementById("title").style.backgroundColor = getRandomColor();
  document.getElementById("left").style.backgroundColor = getRandomColor();
  document.getElementById("game").style.backgroundColor = getRandomColor();
  document.getElementById("right").style.backgroundColor = getRandomColor();
  document.getElementById("images").style.backgroundColor = getRandomColor();
}

// Don't touch the script under here

function getRandomColor() {
  return (
    "rgba(" +
    Math.ceil(Math.random() * 255) +
    "," +
    Math.ceil(Math.random() * 255) +
    "," +
    Math.ceil(Math.random() * 255) +
    "," +
    Math.random() +
    ")"
  );
}
