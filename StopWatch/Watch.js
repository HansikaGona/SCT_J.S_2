let startTime = 0;
let elapsed = 0;
let timer;
let running = false;
let lapCount = 0;

function updateDisplay() {
  let time = elapsed + (running ? Date.now() - startTime : 0);
  let date = new Date(time);
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
  let milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0'); // centiseconds
  document.getElementById('display').textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(updateDisplay, 10); // improved from 100ms to 10ms for smoother updates
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(timer);
    elapsed += Date.now() - startTime;
    running = false;
  }
}

function reset() {
  clearInterval(timer);
  startTime = 0;
  elapsed = 0;
  running = false;
  lapCount = 0;
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
}

function lap() {
  if (running) {
    lapCount++;
    const lapTime = document.getElementById('display').textContent;
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCount}: ${lapTime}`;
    document.getElementById('laps').appendChild(li);
  }
}
