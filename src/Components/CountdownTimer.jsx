import React from "react";
import { useTimer } from "../Hooks/useTimer";

export default function CountdownTimer() {
  const { timeLeft, formatTime } = useTimer({ days: 0, hours: 0, minutes: 26, seconds: 13 });

  return (
    <div className="flex flex-col items-center leading-none">
      <div className="text-xs font-bold text-gray-700 mb-1">До кінця акції:</div>
      <div className="flex gap-1.5 text-2xl font-bold text-gray-900 animate-pulse">
        <div className="flex flex-col items-center">
          <span>{formatTime(timeLeft.days)}</span>
          <span className="text-[9px] font-normal text-gray-500 uppercase mt-0.5">днів</span>
        </div>
        <span className="text-gray-900 -mt-0.5">:</span>
        <div className="flex flex-col items-center">
          <span>{formatTime(timeLeft.hours)}</span>
          <span className="text-[9px] font-normal text-gray-500 uppercase mt-0.5">годин</span>
        </div>
        <span className="text-gray-900 -mt-0.5">:</span>
        <div className="flex flex-col items-center">
          <span>{formatTime(timeLeft.minutes)}</span>
          <span className="text-[9px] font-normal text-gray-500 uppercase mt-0.5">хвилин</span>
        </div>
        <span className="text-gray-900 -mt-0.5">:</span>
        <div className="flex flex-col items-center">
          <span>{formatTime(timeLeft.seconds)}</span>
          <span className="text-[9px] font-normal text-gray-500 uppercase mt-0.5">секунд</span>
        </div>
      </div>
    </div>
  );
}