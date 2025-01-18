import React, { useState, useEffect } from 'react';

export const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = +new Date(targetDate) - now;

    let timeLeft = {};

    if (difference > 0) {
      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      timeLeft = {
        months,
        days,
        hours,
        minutes,
        seconds,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div className='font-mont flex flex-col justify-center items-center text-black' key={interval}>
        <h2 className='font-bold text-center text-[24px]'>{timeLeft[interval]}</h2>
        <p className='text-[14px] text-center'>{interval}{" "}</p>
         
      </div>
    );
  });

  return (
    <div className='w-full flex justify-between items-center'>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export function formatDate(inputDate) {
  // Parse the input date
  const date = new Date(inputDate);

  // Extract year, month, day, hours, minutes, and seconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format the date
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
