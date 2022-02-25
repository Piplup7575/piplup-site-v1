function changeBG() {
  if (5 + 5 == 10) {
    makeBackgroundLightBlue();
  } else {
    makeBackgroundWhite();
  }
}

function checkOne(answer) {
  if ($(answer).attr("class") == "correct selected") {
    //If you choose a correct answer, this code will execute
    document.getElementById("body").style.backgroundColor = randomColor();
  } else {
    //If you choose an incorrect answer, this code will execute
    document.getElementById("body").style.backgroundColor = "white";
  }
}

function gotAllRight() {
  //code here will execute if all answers are correct
  cycleBackgroundColor();
  makeSnow();
}

function gotAllWrong() {
  //code here will execute if all answers are wrong
  showBackgroundImage();
}

/******************** FUNCTIONS TO USE ********************/

function showBackgroundImage() {
  //define the background image in quizStyle.css
  $("body").css("background-size", "cover");
}

function hideBackgroundImage() {
  $("body").css("background-size", "0px");
}

function cycleBackgroundColor() {
  //A smaller duration will make the colors change quicker
  var duration = 100;
  $("body").css("background-image", "none");
  setInterval(function() {
    changeColors();
  }, duration);
}

function makeSnow() {
  var number_of_snowflakes = 10;
  showSnow(number_of_snowflakes);
}

function randomBackgroundColor() {
  $("body").css("background-image", "none");
  $("body").css("background-color", randomColor());
}

function makeBackgroundWhite() {
  $("body").css("background-image", "none");
  $("body").css("background-color", "white");
}

function makeBackgroundBlack() {
  $("body").css("background-image", "none");
  $("body").css("background-color", "black");
}

function makeBackgroundLightBlue() {
  $("body").css("background-image", "none");
  $("body").css("background-color", "lightblue");
}

function makeBackgroundRed() {
  $("body").css("background-image", "none");
  $("body").css("background-color", "red");
}

/*************** NECESSARY CODE: DON'T TOUCH ***************/

$(document).ready(function() {
  $(document).on("click", "p, img", function() {
    choose(this);
  });
});

function choose(ele) {
  $(ele)
    .siblings()
    .removeClass("selected");
  $(ele).addClass("selected");

  checkOne(ele);
}

function checkAnswers() {
  var counter = 0;
  $(".selected").each(function() {
    if ($(this).attr("class") == "correct selected") {
      counter++;
    }
  });
  if (counter == $(".selected").length && counter == $(".correct").length) {
    gotAllRight();
  }
  if (counter == 0) {
    gotAllWrong();
  }
}

var hue = 1,
  sat = 1,
  hueSwitch = 1,
  satSwitch = 1;
var flakes = [],
  snowtimer;
function changeColors() {
  hue += hueSwitch;
  sat += 2 * satSwitch;
  $("body").css("background-color", "hsl(" + hue + ", " + sat + "%, 25%)");
  if (hue > 360 || hue < 1) {
    hueSwitch *= -1;
  }
  if (sat > 99 || sat < 1) {
    satSwitch *= -1;
  }
}

function randomColor() {
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

function showSnow(number) {
  hidesnow();
  var snowsrc = $("#snowflake").attr("src");
  var no = number;

  var dx, xp, yp; // coordinate and position variables
  var am, stx, sty; // amplitude and step variables
  var i;

  var doc_width = $(window).width() - 10;
  var doc_height = $(window).height();

  dx = [];
  xp = [];
  yp = [];
  am = [];
  stx = [];
  sty = [];
  flakes = [];
  for (i = 0; i < no; ++i) {
    dx[i] = 0; // set coordinate variables
    xp[i] = Math.random() * (doc_width - 50); // set position variables
    yp[i] = Math.random() * doc_height;
    am[i] = Math.random() * 20; // set amplitude variables
    stx[i] = 0.02 + Math.random() / 10; // set step variables
    sty[i] = 0.7 + Math.random(); // set step variables

    var flake = $("<div />");

    var id = "dot" + i;
    flake.attr("id", id);
    flake.css({
      position: "absolute",
      zIndex: i,
      top: "15px",
      left: "15px"
    });

    flake.append("<img class='snowflake' src='" + snowsrc + "'>");
    flake.appendTo("body");

    flakes[i] = $("#" + id);
  }

  var animateSnow;
  animateSnow = function() {
    for (i = 0; i < no; ++i) {
      // iterate for every dot
      yp[i] += sty[i];
      if (yp[i] > doc_height - 50) {
        xp[i] = Math.random() * (doc_width - am[i] - 30);
        yp[i] = 0;
        stx[i] = 0.02 + Math.random() / 10;
        sty[i] = 0.7 + Math.random();
      }

      dx[i] += stx[i];
      flakes[i].css("top", yp[i] + "px");
      flakes[i].css("left", xp[i] + am[i] * Math.sin(dx[i]) + "px");
    }

    snowtimer = setTimeout(animateSnow, 10);
  };

  function hidesnow() {
    if (window.snowtimer) clearTimeout(snowtimer);

    for (i = 0; i < no; i++) flakes[i].hide();
  }

  animateSnow();
}
