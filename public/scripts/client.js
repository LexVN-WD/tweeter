/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  for (const element of tweets) {
    // calls createTweetElement for each tweet
    let $tweet = createTweetElement(element);
    // takes return value and appends it to the tweets container
    $("#tweetContainer").append($tweet);
  }
};

const createTweetElement = function(tweet) {
  let $tweet = `<article>
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
                          <time> ${tweet.created_at} </time>
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
                    </article>`;

        return $tweet;
};

renderTweets(data);