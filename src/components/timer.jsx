import React, { useEffect } from "react";
import dayjs from "dayjs";

export default function Timer({ time, setTime }) {
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(timer);
  }, [setTime]);
}
