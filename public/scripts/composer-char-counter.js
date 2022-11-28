// console.log("script has been loaded");

$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function(e){
    let charCount = $(this).val().length;
    let countChar = $(".counter");
    countChar.text(140 - charCount);
    if (charCount > 140) {
      countChar.css("color", "red");
    } else {
      countChar.css("color", "");
    }
  });
});
