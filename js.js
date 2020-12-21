// borrowed from Rick G at https://codepen.io/rxsharp/pen/jPZgpX content finished
// function countdown(elementName, minutes, seconds) {
//   var element, endTime, hours, mins, msLeft, time;

//   function twoDigits(n) {
//     return n <= 9 ? "0" + n : n;
//   }

//   function updateTimer() {
//     msLeft = endTime - +new Date();
//     if (msLeft < 1000) {
//       element.innerHTML = "Time is up!";
//     } else {
//       time = new Date(msLeft);
//       hours = time.getUTCHours();
//       mins = time.getUTCMinutes();
//       element.innerHTML =
//         (hours ? hours + ":" + twoDigits(mins) : mins) +
//         ":" +
//         twoDigits(time.getUTCSeconds());
//       setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
//     }
//   }

//   element = document.getElementById(elementName);
//   endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
//   updateTimer();
// }

//https://codepen.io/rxsharp/pen/jPZgpX content finished

function countdown(elementName, minutes, seconds) {
  var element, endTime, msLeft, pct;

  function updateTimer() {
    msLeft = endTime - +new Date();
    pct = msLeft / (endTime - startTime);
    console.log(msLeft / (endTime - startTime));
    if (msLeft < 10) {
      personArray.shift();
      document.querySelector("li").remove();
      element.innerText = "Time's up";
      if (personArray[0]) {
        setTimeout(nextPerson, 3000);
      } else {
        nameDisplay.innerText = "Round Over";
        document.getElementById("controls").style.display = "block";
      }
    } else {
      element.innerText = msLeft / 1000;
      nameDisplay.innerText = personArray[0];
      document.getElementById("progress-bar").style.width = pct * 100 + "%";
      document.getElementById("progress-bar").style.height = pct * 100 + "%";
      setTimeout(updateTimer, 60);
    }
  }

  function nextPerson() {
    startTime = +new Date();
    endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
  }

  element = document.getElementById(elementName);
  startTime = +new Date();
  endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
  updateTimer();
}

arrayCopy = [];
const copyArray = () => {
  arrayCopy = [...personArray];
};

const tenMinutes = function () {
  const numOfSeconds = document.getElementById("time-input").value;
  document.getElementById("controls").style.display = "none";
  countdown("timer-display", 0, numOfSeconds);
};

const numOfSeconds = document.getElementById("time-input").value;
const personList = document.getElementById("person-list");
const personArray = [];
const nameDisplay = document.getElementById("current-name");

const addName = () => {
  element = document.createElement("li");
  element.innerText = document.getElementById("name-input").value;
  personArray.push(document.getElementById("name-input").value);
  personList.appendChild(element);
};

document.getElementById("ten-start").addEventListener("click", tenMinutes);
document.getElementById("add-name-btn").addEventListener("click", addName);
