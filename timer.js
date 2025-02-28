document.addEventListener("DOMContentLoaded", function() {
    const timerContainer = document.getElementById("timer-container");
    
    let time = 0;
    let isRunning = false;
    let interval;

    function formatTime(ms) {
        const mins = Math.floor(ms / 60000);
        const secs = Math.floor((ms % 60000) / 1000);
        const mils = Math.floor((ms % 1000) / 10);
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(mils).padStart(2, "0")}`;
    }

    function updateDisplay() {
        timerContainer.innerHTML = formatTime(time);
    }

    function startStop() {
        if (isRunning) {
            clearInterval(interval);
        } else {
            interval = setInterval(() => {
                time += 10;
                updateDisplay();
            }, 10);
        }
        isRunning = !isRunning;
    }

    function reset() {
        clearInterval(interval);
        time = 0;
        isRunning = false;
        updateDisplay();
    }

    timerContainer.innerHTML = formatTime(time);

    // Criar botões dinamicamente
    const startBtn = document.createElement("button");
    startBtn.innerText = "Iniciar / Pausar";
    startBtn.onclick = startStop;

    const resetBtn = document.createElement("button");
    resetBtn.innerText = "Resetar";
    resetBtn.onclick = reset;

    document.body.appendChild(startBtn);
    document.body.appendChild(resetBtn);
});
