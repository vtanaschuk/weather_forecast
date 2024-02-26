import React, { useState, useEffect } from "react";

const Timer = ({ dateFrom }) => {
  const [timeDifference, setTimeDifference] = useState({});

  useEffect(() => {
    const updateTimer = () => {
      const currentDate = new Date();
      const dateFromObj = new Date(dateFrom);

      const currentTimeStamp = currentDate.getTime();
      const dateFromTimeStamp = dateFromObj.getTime();

      const timeDifference = dateFromTimeStamp - currentTimeStamp;

      const seconds = Math.floor((timeDifference / 1000) % 60);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      setTimeDifference({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [dateFrom]);
  return (
    <div className="timer">
      <div className="timer-bloc">
        <div className="count">{timeDifference.days}</div>
        <div className="timer-title">Days</div>
      </div>
      <div className="timer-bloc">
        <div className="count">{timeDifference.hours}</div>
        <div className="timer-title">Hours</div>
      </div>
      <div className="timer-bloc">
        <div className="count">{timeDifference.minutes}</div>
        <div className="timer-title">Minutes</div>
      </div>
      <div className="timer-bloc">
        <div className="count">{timeDifference.seconds}</div>
        <div className="timer-title">Seconds</div>
      </div>
    </div>
  );
};

export default Timer;
