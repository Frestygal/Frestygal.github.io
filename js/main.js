function playSound() {
  var random = Math.random();

  var probMeow = 0.9;

  if (random < probMeow) {
    var snd = new Audio("js/meow.wav");
    snd.play();
  } else {
    var snd = new Audio("js/hellnawr.wav");
    snd.play();
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
