/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
  // loops through tweets
  for (const element of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(element);
    // takes return value and appends it to the tweets container
    $("#tweetContainer").prepend($tweet);
  }
};

const createTweetElement = function(tweet) {
  let timeAgo = timeago.format(tweet.created_at);
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
      <p> ${tweet.content.text} </p>
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

$(document).ready(function () {
  // loadTweets function
  const loadTweets = () => {
    const newTweet = $.get(
      "http://localhost:8080/tweets",
      function(response) {
        renderTweets(response)
      }
    )
  };
  loadTweets();

  $("#newTweet").submit(function(event) {
    event.preventDefault();

    const $formData = $(this).serialize();
    const maxCharLimit = 140;


    if ($formData === "text=") {
      return alert("No Text Written");
    } 
    
    if ($formData.length > maxCharLimit) {
      return alert("Max Character Limit Exceeded");
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
          renderTweets(response);
          loadTweets();
        },
        error: function() {
          alert("There has been an error with your Tweet! Please try again.");
        }
      });
    }
  });
});