import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("stopwatch"); // 'timer' or 'stopwatch'
  const [presetTime, setPresetTime] = useState(0);
  const alertSound = new Audio("/alert.mp3"); // Substituir pelo caminho correto do áudio
  const minuteAlertSound = new Audio("/minute-alert.mp3"); // Som a cada minuto
  const hourAlertSound = new Audio("/hour-alert.mp3"); // Som ao atingir uma hora

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
    const hours = Math.floor(milliseconds / 3600000);
    const mins = Math.floor((milliseconds % 3600000) / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10); // Apenas dois dígitos para milissegundos
    return (
      <span>
        {hours > 0 ? String(hours).padStart(2, "0") + ":" : ""}
        {String(mins).padStart(2, "0")}:
        {String(secs).padStart(2, "0")}<span className="text-3xl">:</span>
        <span className="text-3xl">{String(ms).padStart(2, "0")}</span>
      </span>
    );
  };

  const startTimerWithPreset = (preset) => {
    setMode("timer");
    setTime(preset * 1000);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">{mode === "timer" ? "Timer" : "Cronômetro"}</h1>
      <div className="flex gap-4 mb-4">
        <button 
          className={`px-4 py-2 border-2 rounded ${mode === "stopwatch" ? "border-white bg-gray-800" : "border-transparent"}`}
          onClick={() => setMode("stopwatch")}>Cronômetro</button>
        <button 
          className={`px-4 py-2 border-2 rounded ${mode === "timer" ? "border-white bg-gray-800" : "border-transparent"}`}
          onClick={() => setMode("timer")}>Timer</button>
      </div>
      <p className="text-6xl font-mono mb-6">{formatTime(time)}</p>
      <div className="h-16 mb-4 flex items-center justify-center">
        {mode === "timer" && (
          <div className="flex gap-2">
            {[300, 600, 900, 1800, 2700, 3600].map((preset) => (
              <Button key={preset} onClick={() => startTimerWithPreset(preset)}>
                {preset / 60} min
              </Button>
            ))}
          </div>
        )}
      </div>
      <button 
        className="w-24 h-24 bg-white text-gray-900 text-xl font-bold rounded-full flex items-center justify-center shadow-lg mb-2"
        onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <p className="text-gray-400 cursor-pointer mt-2" onClick={() => { setIsRunning(false); setTime(mode === "timer" ? presetTime * 1000 : 0); }}>
        Reset
      </p>
    </div>
  );
}
