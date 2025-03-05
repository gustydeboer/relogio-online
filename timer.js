const { useState, useEffect } = React;

function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("stopwatch"); // 'timer' or 'stopwatch'
    const alertSound = new Audio("/alert.mp3");
    const minuteAlertSound = new Audio("/minute-alert.mp3");
    const hourAlertSound = new Audio("/hour-alert.mp3");

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
                    if (newTime % 60000 === 0 && newTime !== 0) {
                        minuteAlertSound.play();
                    }
                    if (newTime === 3600000) {
                        hourAlertSound.play();
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-6">Cronômetro e Timer Online</h1>
            
            <div className="flex gap-4 mb-4">
                <button 
                    className={`px-6 py-3 text-lg rounded-lg ${mode === "stopwatch" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                    onClick={() => setMode("stopwatch")}>Cronômetro</button>
                <button 
                    className={`px-6 py-3 text-lg rounded-lg ${mode === "timer" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                    onClick={() => setMode("timer")}>Timer</button>
            </div>
            
            <p className="text-6xl font-mono mb-6">{formatTime(time)}</p>
            
            <button 
                className="w-24 h-24 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-full flex items-center justify-center shadow-lg mb-2"
                onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Pausar" : "Iniciar"}
            </button>
            
            <p 
                className="text-gray-400 cursor-pointer mt-2" 
                onClick={() => { setIsRunning(false); setTime(0); }}>
                Reset
            </p>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("timer-container")).render(<Timer />);
