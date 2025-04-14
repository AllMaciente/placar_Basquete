let timer;
let time = 600;

function getTimeFromInputs() {
  const min = parseInt(document.getElementById("minutesInput").value) || 0;
  const sec = parseInt(document.getElementById("secondsInput").value) || 0;
  return min * 60 + sec;
}

function setTimeInputs(t) {
  const min = Math.floor(t / 60);
  const sec = t % 60;
  document.getElementById("minutesInput").value = String(min).padStart(2, "0");
  document.getElementById("secondsInput").value = String(sec).padStart(2, "0");
}

function updateTimerDisplay() {
  setTimeInputs(time);
}

function startTimer() {
  if (!timer) {
    time = getTimeFromInputs();
    timer = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimerDisplay();
      } else {
        stopTimer();
        tocarAlarme();
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  stopTimer();
  time = 600;
  setTimeInputs(time);
}

function updateScore(team, value) {
  const input = document.getElementById(`team${team}Score`);
  let current = parseInt(input.value);
  current += value;
  if (current < 0) current = 0;
  input.value = current;
}

function resetScores() {
  document.getElementById("teamAScore").value = 0;
  document.getElementById("teamBScore").value = 0;
}

function tocarAlarme() {
  const alarm = document.getElementById("alarmSound");
  alarm.loop = true;
  alarm
    .play()
    .then(() => {
      alert("⏰ Tempo encerrado!");
      alarm.pause();
      alarm.currentTime = 0;
      alarm.loop = false;
    })
    .catch((err) => {
      console.error("Erro ao tocar alarme:", err);
    });
}
