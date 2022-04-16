/*
 * Author: Project #1 Fire
 * Project Name: Project Fire custom page JS
 * Version: Initialzed
 * Date: 08.29.17
 * URL: github.com/itsokayitsofficial/project1/
 */
//-------------------------------Quiz Array ----------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------Quiz objects-------------------------------------------------------------------------------------//



$(".left").on("click",function(){
  $(".lefta").toggleClass("ghost");
  $(".left3").toggleClass("ghost");
});
// Nav Transition
$('body').on('click', function () {
  if ($('.nav-tabs').children().length == 0) {
    $(".nav-tabs").css("visibility","hidden");
    $(".site-nav").addClass("active");
    $(".navbar-brand").addClass("fade-out").removeClass("fade-in");
    $(".logo").removeClass("fade-out").addClass("fade-in");
    $('.sidebar').hide();
  } else {
    $(".nav-tabs").css("visibility","visible");
    $(".site-nav").removeClass("active");
    $(".navbar-brand").addClass("fade-in").removeClass("fade-out");
    $(".logo").removeClass("fade-in").addClass("fade-out");
  }
});
//Prevents sidebar from closing when meetUp RSVP is clicked
$(document).on('click', '.RSVP', function(e) {
  e.stopPropagation();
});

//If sidebar of current tab is open, sidebar of newly clicked tab will also open.
$(document).on('click', 'li', function() {
  $('li').find('nav').removeClass('active');
  if ($('li').find('nav').hasClass('open')) {
    $('li').find('nav').removeClass('open');
    $(this).find('nav').addClass('open');
  }
  if ($(this).hasClass('active')) {
    $(this).find('nav').addClass('active');
  }
})

// Tab Clear
$('.nav-tabs').on("click", "button", function () {
    var anchor = $(this).siblings('a');
    $(anchor.attr('href')).remove();
    $(this).parent().remove();
    $(".nav-tabs li").children('a').first().click();
});

// Sidebar Meet Up Transitions
$(document).on('click', '.sidebar', function(event) {
    event.preventDefault();
    $(this).toggleClass("open");
});
// Sidebar Quiz Transitions
$(document).on('click', '.sidebar-left', function(event) {
    event.preventDefault();
    $(this).toggleClass("open2");
});


window.onload = function() {
  console.log("LSLLSL");
//Hides on window.load
  if(window.innerWidth <= 480){
    $("body").empty();
    $("<img>").attr("src","./public/assets/img/err.png").addClass("errImg").appendTo("body");
    $("<h3>").text("Due to some of Codex's features, it cannot run mobile, we apologize").addClass("errText").appendTo("body");

  }
  $('#zipHolder').hide();
  $('.sidebar-left').hide();


//-----------------------------------------------------MeetUp Variables-------------------------------------------------------------------//
  var topic = '';
  var zip = '';
  var results;
  var eventKey = 'eB5tLtxwlSEJS302vB0ATl2sMzPOsNKQBRLo3nFd';
  var geolocationKey = "AIzaSyCJAQvR6R-V1xdtlCoXg3tvR4tuVTqD1iw";
  var backUpKey = "n3TrufCMPW589XTFhAN_rkiJZll8PHb-McY4NiW6";
  var eventURL = "https://control.predicthq.com/search/events/";
  var queryUrl = 'https://api.predicthq.com?key=' + eventKey + '&sign=true&photo-host=public&topic=' + topic + '&zip=' + zip + '&page=5&fields=next_event,time,group_photos&callback=?';
  var tryZip = '';
  var sidebarId = '';

  var defaultTopic = '';
//---------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------YouTube variables--------------------------------------------------------------------------//
  var tubeURL = "https://www.googleapis.com/youtube/v3/";
  var youTubeKey = "AIzaSyBV8DyidI_MUrySRFtaD2K1oWiNOyunuAU";

  var videoSearch = '';
//----------------------------------------------------------YouTube API-------------------------------------------------------------------------------------//
  let getYouTube = function(){
    videoSearch = tubeURL + "search?&q=" + topic + '%20tutorial%20programming' + "&part=snippet&chart=mostPopular&videoCategoryId=27&type=video&relevanceLanguage=en&maxResults=1&key=" + youTubeKey;
    var youtubeId = $('#' + topic + 'video');

  $.ajax({
      url: videoSearch,
      method: "GET",
      dataType: 'jsonp'
    })
    .done(function(response) {
      console.log(response);
      var videoId = response.items[0].id.videoId;
      youtubeId.append("<iframe width='100%' height='100%' src='https://www.youtube.com/embed/" + videoId + "' frameborder='0'id='hi'></iframe>")
    });


};
//---------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------Zip Code/Search logic-----------------------------------------------------------------------//
  //returns boolean; checks if user input is valid US zip code
  function isValidUSZip(isZip) {
    return /^\d{5}(-\d{4})?$/.test(isZip);
  }
  //on click of the zip code 'Go!' button.
  $('#zipSearch').on('click', function(event) {
    event.preventDefault(event);
    tryZip = $('#userZip:text').val();
    $('#noZip').html('')
    //if Valid zip code set as user zip code and stores zip code locally.
    if (isValidUSZip(tryZip) === true) {
      zip = tryZip;
      localStorage.clear();
      localStorage.setItem('zip', zip);
      $('#zipHolder').html('Current Zip Code: ' + zip + ' <span class="caret"></span>');
      $('#searchError').html('');
      $('#zipHolder, #zipSearch, #zipForm').toggle();
      // window.location.assign("https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=YSYZ4UG4LKSBGGBYBOFB&redirect_uri=https://marcoking13.github.io/Codex/");
      // $.ajax("https://www.eventbriteapi.com/v3/users/me/?token=YSYZ4UG4LKSBGGBYBOFB").done((function(response){  console.log(response);})
  }
  //if invalid zip, turns the search box red
    else {
      $('#zipForm').addClass('has-error');
    }
  });
  //Function to change zip code
  $('#changeZip').on('click', function(event) {
    window.location.assign("https://secure.meetup.com/oauth2/authorize?client_id=YOUR_CONSUMER_KEY&response_type=token&redirect_uri=https://marcoking13.github.io/Codex/redirect");
    $('#zipHolder, #zipSearch, #zipForm').toggle();
    $('#userZip:text').val('');
    $('#zipForm').removeClass('has-error');
  });
//checks if there is a zip in local storage, if there is, sets that as current zip
  let checkZip = function() {
    if (localStorage.getItem("zip") !== null) {
      zip = localStorage.getItem('zip');
      $('#zipHolder').html('Current Zip Code: ' + zip + ' <span class="caret"></span>');
      $('#searchError').html('');
      $('#zipHolder, #zipSearch, #zipForm').toggle();
    };
  };

//------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------MeetUp API Call-----------------------------------------------------------------------------//


//Dynamically displays meetup sidebar, reformats unix time for next event
let displayMeetUp = function() {

  var lat;
  var lng;
axios.get({url:"https://maps.googleapis.com/maps/api/geocode/json?",params:{zip:zip,key:geolocationKey}}).then((res)=>{
  var location = res.results[0].location.geometry;
  lat = location.lat;
  lng = location.lng;
  console.log(lat,lng);
}).catch((err)=>{console.log(err)});

  $.ajax({
    url:"https://api.predicthq.com/v1/events/?q="+topic +"&zip=' + zip + '&catagory=programming&page=5&country=US&fields=next_event,time,group_photos&callback=?",
    headers: {
       'Authorization':'Bearer '+eventKey,
       'Accept':'application/json'
   },
    method:"GET"

  }).done((res)=>{
      console.log("Go");
      console.log(res);
      var eventURL = "https://control.predicthq.com/search/events/";

      var results = res.results;
      for (var i =0; i <2; i ++){
        var k =0;
        var meetUpDiv=$('<div>');
        var title =  $('<h5>');
        title.addClass("bold");
        var descr =  $('<p>');
        descr.addClass("f13 p5");
        var timeText =  $('<p>');
        var locationText =  $('<p>');

        var link = $('<a>');
        var img = $('<img>');
        var time = results[i].start;
        var timeMoment = moment(time);
        var currentTime = timeMoment.format('LLL');
        var sidebarId = $('#' + topic + 'sidebar');

        img.attr('src', "./public/assets/img/code"+Math.floor(Math.random() * 7 + 1)+".png");
        img.css('width', '50px');
        img.css('height', '50px');

        link.attr('href', eventURL+results[i].id)
        link.attr('target', '_blank');
        link.addClass('RSVP');
        link.text('RSVP');


        console.log("go");
        console.log(results[i].title);
      //if no venue is listed, remove venue from display



      descr.text(results[i].description);
      title.text(results[i].title);
      timeText.text("Start Time "+currentTime);
      locationText.text(results[i].timezone);

      meetUpDiv.addClass('meetUpDiv')
      meetUpDiv.append(title);
      meetUpDiv.append(descr);
      meetUpDiv.append(locationText);

      meetUpDiv.append(timeText);
      meetUpDiv.append(img);
      meetUpDiv.append(link);
      $(meetUpDiv).appendTo(sidebarId);
      }
    }).catch(error => alert(error.message));

  };
var i =0;
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------Modal Generation for search-------------------------------------------------------------------------------//
  var topics = [];
    // Function - Generates tabs of search input submitted
    function searchTab() {
      var codepen = $("<iframe height='300' scrolling='no' title='RZvYVZ' src='//codepen.io/marcorulesk345/embed/RZvYVZ/?height=300&theme-id=31149&default-tab=html,result&embed-version=2&editable=true' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/marcorulesk345/pen/RZvYVZ/'>RZvYVZ</a> by marco (<a href='https://codepen.io/marcorulesk345'>@marcorulesk345</a>) on <a href='https://codepen.io'>CodePen</a>.</iframe>");
      // For Loop - To cull search results
      for (var i = 0; i < topics.length; i++) {
        // Remove current tab class="active"
        $("#myTab").find("li").removeClass('active');
        // Remove current content class="active in"
        $("#myTabContent").find("div").removeClass('active in');
        // Variable - Define <div> to place search results in
        var contentDiv = $("<div>");
        // Variable - Define .content to place class="" in
        contentDiv.attr("class", "tab-pane fade active in");
        // Variable - Define .content to place class="" in
        contentDiv.attr("id", topics[i]);
        contentDiv.css({'height': '350px', 'width': '100%', 'text-align': 'center'});
        // Variable - Define <li> to generate search tab
        var searchTab = $('<li>');
        // Attribute to searchTab - class="active"
        searchTab.attr("class", "active");
        // Attribute to showTab - data-search="topics[i]"
        searchTab.attr("data-search", topics[i]);

        // Variable - Define <a> to generate input result
        var tabAncr = $("<a data-toggle='tab'>");
        // Attribute to showTab - href="#topics[i]"
        tabAncr.attr("href", "#" + topics[i]);
        // Text to showTab - displays search input on showTab. Accounts for a space in user search
        topic = topic.split('_').join(' ');
        tabAncr.text(topic);
        topic = topic.split(' ').join('_');
        // Variable - Button to delete search tab
        var tabButton = $("<button type='button' class='close'>&times;</button>");
        // Append with tabAncr - id="myTab"
        searchTab.append(tabAncr);
        // Append with tabButton - id="myTab"
        searchTab.append(tabButton);

        //create sidebar for each result
        var sideBar = $('<nav>');
        sideBar.addClass('sidebar sidebar-right');
        sideBar.attr('id', topic + 'sidebar');
        var meetUpHeader = $('<h3>');
        meetUpHeader.css({'height': '60px', 'font-size': '14px', 'text-align': 'center'});
        meetUpHeader.text('Events');
        sideBar.append(meetUpHeader);
        searchTab.append(sideBar);

        //create div to place youtube api call in and add codepen to content div
        codepen.css({'height': '300px', 'width': '80%', 'text-align': 'center', 'margin': '0px 10% 0px 10%'})
        var vids = $('<div>');
        vids.attr('id', topic + 'video');
        vids.css({'height': '350px', 'width': '80%', 'text-align': 'center', 'margin': '0px 10% 0px 10%'})
        contentDiv.append(vids);
        contentDiv.append(codepen);
      };
      // Append with searchTab - id="myTab"
      $("#myTab").append(searchTab);
      // Append with contentDiv - id="myTabContent"
      $("#myTabContent").append(contentDiv);
    };
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------Search on click functions-------------------------------------------------------------------------------//
//Capitalizes first letter of search input
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
//Function- If sidebar was open at time of search, new search will have an open sidebar
function sidebarStatus() {
var topicQuery = $('#' + topic + 'sidebar');
$('li').find('nav').removeClass('active');
  if ($('li').find('nav').hasClass('open')) {
      ($('li').find('nav').removeClass('open'));
      topicQuery.addClass('open', 'active');
  }
}
//On search
$('#searchButton').on('click', function(event) {
event.preventDefault(event);
var tabOpen = false;
//Prevents searching if there is no input
  if ($('#searchInput:text').val().trim() !== '' && $("#zipHolder").is(":visible")) {
    topic = $('#searchInput:text').val().trim();
    topic = topic.capitalize();
//Checks to see if searched topic is already open in a tab, if it is, goes to that tab
    $('#myTab').find('li').removeClass('active');
    $('#myTab').find('li').each(function (){
      $(this).find('a').attr('aria-expanded', 'false');
      if ($(this).attr('data-search') == topic) {
        $("#myTabContent").find("div").removeClass('active in');
        $('#' + topic).addClass('tab-pane active in ml10')
        $(this).addClass('active');
        $(this).find('a').attr('aria-expanded') === true;
        tabOpen = true;
        $('#searchInput:text').val('');
      }
    });
//if there is no tab open for the searched topic, open new tab
    if (!tabOpen) {
//accounts for space/slash in user input
      topic = topic.split(' ').join('_');
      topic = topic.split('/').join('_');
      topics.push(topic);
      searchTab();
      sidebarStatus();
      displayMeetUp();
      $('.sidebar-left').show();
      $('#searchInput:text').val('');
      getYouTube();

    };

  }
//user validation, must enter zip code to search
  else if ($('#zipHolder').is(':hidden')) {
    $('#noZip').html('Please select a zip code.')
    $('#zipForm').addClass('has-error');
    $('#searchInput:text').val('');
  };
});
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------Quiz Modal Generation--------------------------------------------------------------------------------------------//
//generates tab modal for each quiz dynamically.
function quizTab() {
  // For Loop - To cull search results
  for (var k = 0; k < topics.length; k++) {
    console.log(topics);
    // Remove current tab class="active"
    $("#myTab").find("li").removeClass('active');
    // Remove current content class="active in"
    $("#myTabContent").find("div").removeClass('active in');
    // Variable - Define <div> to place search results in
    var contentDiv = $("<div>");
    // Variable - Define .content to place class="" in
    contentDiv.attr("class", "tab-pane fade active in");
    // Variable - Define .content to place class="" in
    contentDiv.attr("id", topics[k]);
    contentDiv.css({'height': '350px', 'width': '80%',color:"white"});
    // Variable - Define <li> to generate search tab
    var searchTab = $('<li>');
    // Attribute to searchTab - class="active"
    searchTab.attr("class", "active");
    // Attribute to showTab - data-search="topics[i]"
    searchTab.attr("data-search", topics[k]);
    // Variable - Define <a> to generate input result
    var tabAncr = $("<a data-toggle='tab'>");
    // Attribute to showTab - href="#topics[i]"
    tabAncr.attr("href", "#" + topics[k]);
    // Text to showTab - displays search input on showTab
    topic = topic.split('_').join(' ');
    tabAncr.text(topic);
    topic = topic.split(' ').join('_');
    // Variable - Button to delete search tab
    var tabButton = $("<button type='button' class='close'>&times;</button>");
    // Append with tabAncr - id="myTab"
    searchTab.append(tabAncr);
    // Append with tabButton - id="myTab"
    searchTab.append(tabButton);

    //create meetup sidebar for each quiz.
    var sideBar = $('<nav>');
    sideBar.addClass('sidebar sidebar-right');
    sideBar.attr('id', topic + 'sidebar');
    var meetUpHeader = $('<h3>');
    meetUpHeader.css({'height': '60px', 'font-size': '14px', 'text-align': 'center'});
    meetUpHeader.text('MeetUps Near You');
    sideBar.append(meetUpHeader);
    searchTab.append(sideBar);
  }
  // Append with searchTab - id="myTab"
  $("#myTab").append(searchTab);

  // Append with contentDiv - id="myTabContent"
  $("#myTabContent").append(contentDiv);
};

function insertQuestion (question){
//Inserts questions from argued JS quiz object
// Prevents user from generating  topics without having the sidebar open first since the sidebar tabs are still clickable even when the sidebar is pulled in
  var sidebarLeftCheck = $(".sidebar-left").hasClass("open open2");
  console.log(sidebarLeftCheck);

  for (var j =0; j <  10; j++) {
    console.log(question);
    nextQuestion = question[j];
    var questionDiv = $('<div>');
    questionDiv.text('Question ' + (j + 1));
    questionDiv.attr('id', 'Question' + j);
    questionDiv.css({"text-align": "center", "font-weight":"bold","font-size": "17px",color:"white"});
      for(var k in nextQuestion) {
        if(k !== "correctAnswer"){
          console.log(k);
          answer = $("<div>");
          answer.addClass(k);
          answer.css({"font-size":"14px","font-weight":"normal"});
          answer.html(nextQuestion[k]);
          questionDiv.append(answer);
          $('#' + topic).append(questionDiv);
        }
      }
    var br = $('<br>');
    questionDiv.append(br);

  }

//Creates Submit/Reset button
  var quizSubmit = $('<button>');
  quizSubmit.addClass('quizSubmit');
  quizSubmit.text('Submit');
  quizSubmit.append($('<br>'));
  quizSubmit.attr('href', '#top');
  $('#' + topic).append(quizSubmit);
  var resetButton = $('<button>')
  resetButton.addClass('resetButton');
  resetButton.text('Reset');
  $('#' + topic).append(resetButton)
  resetButton.hide();

console.log(quizzes);
//Checks to see if quiz tab is already open. If it is, goes to that tab. If it is not, generates new quiz tab
$('.quiz').on('click', function(e) {
  topic = e.target.text

  e.stopPropagation();
  var tabOpen = false;
  $('#myTab').find('li').removeClass('active');
  $('#myTab').find('li').each(function (){
    $(this).find('a').attr('aria-expanded', 'false');
    if ($(this).attr('data-search') == topic) {
      $("#myTabContent").find("div").removeClass('active in');
      $('#' + topic).addClass('tab-pane active in')
      $(this).addClass('active');
      $(this).find('a').attr('aria-expanded') === true;
      tabOpen = true;
      $('.quiz').parent().parent().removeClass('open');
    }
  });
  if (!tabOpen) {
    console.log(topic);
    topics.push(topic);
    quizTab();
    console.log(topic+"_Quiz")
    insertQuestion(quizzes[topic+"_Quiz"]);
    $('.quiz').parent().parent().removeClass('open');
  }
});
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------Quiz Logic---------------------------------------------------------------------------//
var correct = 0;
//adds/removes classes to correct answer for CSS styling
$(document).on('click', '.correctAnswer', function() {
  $(this).siblings().removeClass('selected');
  $(this).siblings().removeClass('correct');
  $(this).siblings().removeClass('incorrect');
  $(this).addClass('correct');
  $(this).addClass('selected');
});
//adds/removes classes to incorrect answers for CSS styling
$(document).on('click', '.answer1, .answer2, .answer3', function() {
  if ($(this).siblings().hasClass('correctStatus')) {
    return;
  }
  $(this).siblings().removeClass('correct');
  $(this).siblings().removeClass('selected');
  $(this).siblings().removeClass('incorrect');
  $(this).addClass('selected');
  $(this).addClass('incorrect');
});
//On submit button click
$(document).on('click', '.quizSubmit', function() {
//resets correct to zero
  correct = 0;
//removes result DIV
  $('#results').remove();
//Counts every div with class correct and adds to correct var
  $(this).parent().children().find('div').each(function(){
    if ($(this).hasClass('correct')) {
      correct++;
    };
  });
//Goes through each answer div and adds classes for right and wrong answers for CSS styling
  $(this).parent().children().find('div').each(function(){
    $(this).removeClass('selected')
      if ($(this).hasClass('correctAnswer')) {
        $(this).addClass('correctStatus');
      }
      else if ($(this).hasClass('incorrect')){
        $(this).addClass('incorrectStatus');
      };
  });
    var resultsDiv = $('<div>');
    resultsDiv.attr('id', 'results');
    resultsDiv.text('You got ' + correct + '/10 correct!')
    $(this).parent().append(resultsDiv);
    $('.quizSubmit').hide();
    $('.resetButton').show();
    $('#results').show();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});
//On reset button click, goes through answer divs and removes all classes
$(document).on('click', '.resetButton', function() {
  $(this).parent().children().find('div').each(function(){
    $(this).removeClass('correctStatus')
    $(this).removeClass('correct')
    $(this).removeClass('incorrectStatus')
    $(this).removeClass('incorrect')
  });
//Shows submit button, hides results, hides reset button
    $('.quizSubmit').show();
    $('#results').remove();
    $('.resetButton').hide();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});

checkZip();
}; //window On load





//------------------------------------Quiz Questions------------------------------//
