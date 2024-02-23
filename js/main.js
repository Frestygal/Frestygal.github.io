function playSound() {
  var random = Math.random(0.0, 100.0);
  var probMeow = 99.9;

  var sndmeow = new Audio("js/meow.wav");
  var sndnawr = new Audio("js/hellnawr.wav");

  if (random < probMeow) {
    sndmeow.play();
  } else {
    sndnawr.play();
  }
}

// THIS IS FOR COPYING SOMETHING TO CLIPBOARD
// document.getElementById("CopySumn").addEventListener("click", function (event) {
//   event.preventDefault();
//   var WhattoCopy = "Something";
//   copyToClipboard(WhattoCopy);
// });

// function copyToClipboard(text) {
//   var tempInput = document.createElement("input");
//   tempInput.value = text;
//   document.body.appendChild(tempInput);
//   tempInput.select();
//   document.execCommand("copy");
//   document.body.removeChild(tempInput);
// }
