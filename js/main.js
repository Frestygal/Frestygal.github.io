function playSound() {
  var random = Math.random();

  var probMeow = 0.9;

  if (random < probMeow) {
    var snd = new Audio("js/meow.wav"); //wav is also supported
    snd.play(); //plays the sound
  } else {
    var snd = new Audio("js/hellnawr.wav"); //wav is also supported
    snd.play(); //plays the sound
  }
}

// THIS IS FOR COPYING SOMETHING TO CLIPBOARD
// document.getElementById("DSTag").addEventListener("click", function (event) {
//   event.preventDefault(); // Prevent the default behavior of the link
//   var DiscordServr = "https://discord.com/invite/RD8KnsVgPP"; // Replace this with your actual Discord tag
//   copyToClipboard(DiscordServr);
// });

// function copyToClipboard(text) {
//   var tempInput = document.createElement("input");
//   tempInput.value = text;
//   document.body.appendChild(tempInput);
//   tempInput.select();
//   document.execCommand("copy");
//   document.body.removeChild(tempInput);
// }
