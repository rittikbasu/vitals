import React, { useState, useEffect, useRef } from "react";

function TimePicker() {
  const date = new Date();
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();
  const currentAmpm = currentHour >= 12 ? "PM" : "AM";

  const [hour, setHour] = useState(
    currentHour > 12 ? currentHour - 12 : currentHour
  );
  const [minute, setMinute] = useState(currentMinute);
  const [ampm, setAmpm] = useState(currentAmpm);
  const [isOpen, setIsOpen] = useState(false);

  const clearTime = () => {
    setHour(currentHour > 12 ? currentHour - 12 : currentHour);
    setMinute(currentMinute);
    setAmpm(currentAmpm);
  };

  const hourRefs = useRef([]);
  const minuteRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      hourRefs.current[hour - 1]?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
      minuteRefs.current[minute]?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
    }
  }, [isOpen, hour, minute]);

  const closeModal = () => setIsOpen(false);
  const stopPropagation = (e) => e.stopPropagation();
  return (
    <div>
      <button
        className="bg-zinc-900 border border-zinc-800 h-[38px] px-8 w-full text-zinc-300 rounded-lg whitespace-nowrap"
        onClick={() => setIsOpen(true)}
      >
        {`${hour}:${minute.toString().padStart(2, "0")} ${ampm}`}
      </button>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed top-[4.6rem] left-20 lg:left-32 w-full h-full flex items-center justify-center"
        >
          <div
            onClick={stopPropagation}
            className="bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-2"
          >
            <div className="pb-2">
              {hour && minute && ampm
                ? `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`
                : "Time"}
            </div>
            <div className="flex justify-between space-x-4 font-mono text-xs">
              <div>
                <label className="text-blue-400">Hour</label>
                <div className="h-[7rem] overflow-auto flex flex-col items-center">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <button
                      ref={(el) => (hourRefs.current[h - 1] = el)}
                      className={`block ${
                        h === hour ? "text-blue-500" : "text-white"
                      }`}
                      key={h}
                      onClick={() => {
                        setHour(h);
                      }}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-blue-400">Minute</label>
                <div className="h-[7rem] overflow-auto flex flex-col items-center">
                  {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                    <button
                      ref={(el) => (minuteRefs.current[m] = el)}
                      className={`block ${
                        m === minute ? "text-blue-500" : "text-white"
                      }`}
                      key={m}
                      onClick={() => {
                        setMinute(m);
                      }}
                    >
                      {m.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-blue-400">AM/PM</label>
                <div className="flex flex-col items-center">
                  {["AM", "PM"].map((a, i) => (
                    <button
                      key={a}
                      className={`block ${
                        a === ampm ? "text-blue-500" : "text-white"
                      }`}
                      onClick={() => {
                        setAmpm(a);
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimePicker;
