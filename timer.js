const { useState, useEffect } = React;

function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("stopwatch"); // 'timer' or 'stopwatch'
    const alertSound = new Audio("/alert.mp3");

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
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

ReactDOM.createRoot(document.getElementById("timer-container")).render(<Timer />);
