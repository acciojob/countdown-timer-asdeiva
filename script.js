// Your script here.
const durationInput = document.getElementById('durationInput');
const startButton = document.getElementById('startButton');
const remainingTime = document.getElementById('remainingTime');
const endTime = document.getElementById('endTime');

// Event listener for start button
startButton.addEventListener('click', startCountdown);

// Event listener for Enter key press on duration input
durationInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    startCountdown();
  }
});

function startCountdown() {
  const durationInMinutes = parseInt(durationInput.value);
  if (isNaN(durationInMinutes)) {
    alert('Invalid duration');
    return;
  }

  const startTime = new Date();
  const endTimeMillis = startTime.getTime() + durationInMinutes * 60000;
  displayCountdown(endTimeMillis);

  // Update remaining time every second
  const countdownInterval = setInterval(() => {
    displayCountdown(endTimeMillis);
    if (new Date().getTime() >= endTimeMillis) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

function displayCountdown(endTimeMillis) {
  const currentTime = new Date().getTime();
  const remainingMillis = endTimeMillis - currentTime;

  const minutes = Math.floor(remainingMillis / 60000);
  const seconds = Math.floor((remainingMillis % 60000) / 1000);

  remainingTime.textContent = `Remaining time: ${formatTime(minutes)}:${formatTime(seconds)}`;

  const endTimeDate = new Date(endTimeMillis);
  const endTimeFormatted = formatTime(endTimeDate.getHours()) + ':' + formatTime(endTimeDate.getMinutes());
  endTime.textContent = `End time: ${endTimeFormatted}`;
}

function formatTime(value) {
  return value < 10 ? '0' + value : value;
}
