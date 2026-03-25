import React from "react";
import { useTimer } from "../Hooks/useTimer";

export default function CountdownTimer() {
  const { timeLeft, formatTime } = useTimer({ days: 0, hours: 0, minutes: 26, seconds: 13 });

  return (
    <>
      <div className="text-sm font-bold text-gray-700 mb-1">До кінця акції:</div>
      <div className="flex gap-2 text-3xl font-bold text-gray-900 animate-pulse">
        <div className="flex flex-col items-center">
          <span>{formatTime(timeLeft.days)}</span>
          <span className="text-[10px] font-normal text-gray-500 uppercase">днів</span>
        </div>
        <span className="pb-3 text-gray-900">:</span>
        <div className="flex flex-col items-center">
          <span>{formatTime(timeLeft.hours)}</span>
          <span className="text-[10px] font-normal text-gray-500 uppercase">годин</span>
        </div>
        <span className="pb-3 text-gray-900">:</span>
        <div className="flex flex-col items-center">
          <span>{formatTime(timeLeft.minutes)}</span>
          <span className="text-[10px] font-normal text-gray-500 uppercase">хвилин</span>
        </div>
        <span className="pb-3 text-gray-900">:</span>
        <div className="flex flex-col items-center">
          <span>{formatTime(timeLeft.seconds)}</span>
          <span className="text-[10px] font-normal text-gray-500 uppercase">секунд</span>
        </div>
      </div>
    </>
  );
}