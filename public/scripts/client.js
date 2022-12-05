/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// renderTweets Function --> Prepends tweet objects to tweet-container
const renderTweets = function(tweets) {
  // loops through tweets
  for (const element of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(element);
    // takes return value and appends it to the tweets container
    $(".tweet-container").prepend($tweet);
  }
};

// createTweetElement Function --> Takes tweet object and returns holistic HTML element 
const createTweetElement = function(tweet) {

  const timeAgo = timeago.format(tweet.created_at);
  
  const $tweet = $(`
  <article>
    <header>
      <div>
        <img class="avatar" src=${tweet.user.avatars}>
        <span class="username"> ${tweet.user.name} </span>
      </div>
      <span class="handle"><b> ${tweet.user.handle} </b></span>
    </header>
    <div>
      <p> ${escape(tweet.content.text)} </p>
    </div>
    <footer>
      <div>
        <time> ${timeAgo} </time>
      </div>
      <nav>
        <button type="button" class="flag">
          <i class="fa-solid fa-flag"></i>
        </button>
        <button type="button" class="retweet">
          <i class="fa-solid fa-retweet"></i>
        </button>
        <button type="button" class="heart">
          <i class="fa-solid fa-heart"></i>
        </button>
      </nav>
    </footer>
  </article>
  `);
  return $tweet;
};

// error message helper function
const errMessage = function(message) {
  $(".error-message").slideDown()
  $(".error-message").html(`&#9940${message}&#9940`)
}


// form submit error helper function
const formError = function() {
  errMessage("There has been an error with your Tweet! Please try again.");
}

$(document).ready(function () {
  
  /* loadTweets Function --> allows user to view transformed tweet object in tweet container 
  after submit without refresh */
  const loadTweets = () => {
    const newTweet = $.get(
      "http://localhost:8080/tweets",
      function(response) {
        renderTweets(response)
      }
    )
  };

  loadTweets();
  $(".error-message").hide();

  /* Form submit event handler */
  $("#tweet-form").submit(function(event) {
    
    event.preventDefault();

    // length of characters within tweet-text textarea
    const textData = $(this).find("#tweet-text").val().length;

    if (textData === 0 || null) {
      errMessage("No text submitted");
    } else if (textData > 140) {
      errMessage("Max Character Limit Exceeded");
    } else {
      const formData = $(this).serialize();
      $.ajax({
        url: "http://localhost:8080/tweets",
        method: "POST",
        data: formData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(response) {
          $("#tweet-text").val("");
          $(".counter").val("140");
          $(".tweet-container").empty();
          $(".error-message").slideUp()
          loadTweets();
        },
        error: formError,
      });
    }
  });
});

// Escape function to prevent XSS attacks
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};