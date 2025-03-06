document.addEventListener("DOMContentLoaded", function() {
    const timerContainer = document.getElementById("timer-container");
    let time = 0;
    let isRunning = false;
    let mode = "stopwatch";
    let interval;
    const presetTime = 0;
    const alertSound = new Audio("/alert.mp3");
    const minuteAlertSound = new Audio("/minute-alert.mp3");
    const hourAlertSound = new Audio("/hour-alert.mp3");

    function formatTime(ms) {
        const hours = Math.floor(ms / 3600000);
        const mins = Math.floor((ms % 3600000) / 60000);
        const secs = Math.floor((ms % 60000) / 1000);
        const mils = Math.floor((ms % 1000) / 10);
        return `<span>${hours > 0 ? String(hours).padStart(2, "0") + ":" : ""}
            ${String(mins).padStart(2, "0")}:
            ${String(secs).padStart(2, "0")}<span class="text-3xl">:</span>
            <span class="text-3xl">${String(mils).padStart(2, "0")}</span></span>`;
    }
const { useState, useEffect } = React;

    function updateDisplay() {
        timerContainer.innerHTML = formatTime(time);
    }
function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("stopwatch"); // 'timer' or 'stopwatch'
    const alertSound = new Audio("/alert.mp3");

    function startStop() {
    useEffect(() => {
        let interval;
        if (isRunning) {
            clearInterval(interval);
        } else {
            interval = setInterval(() => {
                time += mode === "timer" ? -10 : 10;
                time = Math.max(time, 0);
                updateDisplay();

                if (time === 0 && mode === "timer") {
                    clearInterval(interval);
                    isRunning = false;
                    alertSound.play();
                }
                if (time % 60000 === 0 && time !== 0) {
                    minuteAlertSound.play();
                }
                if (time === 3600000) {
                    hourAlertSound.play();
                }
                setTime((prevTime) => {
                    const newTime = mode === "timer" ? Math.max(prevTime - 10, 0) : prevTime + 10;
                    if (newTime === 0 && mode === "timer") {
                        clearInterval(interval);
                        setIsRunning(false);
                        alertSound.play();
                    }
                    return newTime;
                });
            }, 10);
        } else {
            clearInterval(interval);
        }
        isRunning = !isRunning;
        startBtn.innerText = isRunning ? "Pausar" : "Iniciar";
    }

    function reset() {
        clearInterval(interval);
        time = mode === "timer" ? presetTime * 1000 : 0;
        isRunning = false;
        updateDisplay();
        startBtn.innerText = "Iniciar";
    }

    function startTimerWithPreset(preset) {
        mode = "timer";
        time = preset * 1000;
        isRunning = true;
        updateDisplay();
        startStop();
    }

    function setMode(newMode) {
        mode = newMode;
        reset();
        document.getElementById("stopwatchBtn").classList.toggle("active", mode === "stopwatch");
        document.getElementById("timerBtn").classList.toggle("active", mode === "timer");
        document.getElementById("presetContainer").style.display = mode === "timer" ? "block" : "none";
    }

    updateDisplay();

    const startBtn = document.createElement("button");
    startBtn.innerText = "Iniciar";
    startBtn.className = "start-button";
    startBtn.onclick = startStop;

    const resetBtn = document.createElement("button");
    resetBtn.innerText = "Resetar";
    resetBtn.className = "reset-button";
    resetBtn.onclick = reset;

    const stopwatchBtn = document.createElement("button");
    stopwatchBtn.innerText = "Cronômetro";
    stopwatchBtn.id = "stopwatchBtn";
    stopwatchBtn.className = "mode-button active";
    stopwatchBtn.onclick = () => setMode("stopwatch");

    const timerBtn = document.createElement("button");
    timerBtn.innerText = "Timer";
    timerBtn.id = "timerBtn";
    timerBtn.className = "mode-button";
    timerBtn.onclick = () => setMode("timer");

    const presetContainer = document.createElement("div");
    presetContainer.className = "preset-container";
    presetContainer.id = "presetContainer";
    presetContainer.style.display = "none";
    [300, 600, 900, 1800, 2700, 3600].forEach((preset) => {
        const btn = document.createElement("button");
        btn.innerText = `${preset / 60} min`;
        btn.className = "preset-button";
        btn.onclick = () => startTimerWithPreset(preset);
        presetContainer.appendChild(btn);
    });

    document.body.appendChild(stopwatchBtn);
    document.body.appendChild(timerBtn);
    document.body.appendChild(presetContainer);
    document.body.appendChild(timerContainer);
    document.body.appendChild(startBtn);
    document.body.appendChild(resetBtn);
});
        return () => clearInterval(interval);
    }, [isRunning, mode]);

    const formatTime = (milliseconds) => {
        const mins = Math.floor(milliseconds / 60000);
        const secs = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor((milliseconds % 1000) / 10);
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
    };

    return (
        <div className="timer-container">
            <h2>{mode === "timer" ? "Timer" : "Cronômetro"}</h2>
            <p className="time-display">{formatTime(time)}</p>
            <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Pausar" : "Iniciar"}
            </button>
            <button onClick={() => setTime(0)}>Reset</button>
            <button onClick={() => setMode("stopwatch")}>Cronômetro</button>
            <button onClick={() => setMode("timer")}>Timer</button>
        </div>
    );
}

// ** Aqui é onde você monta o componente na página HTML **
ReactDOM.createRoot(document.getElementById("timer-container")).render(<Timer />);
