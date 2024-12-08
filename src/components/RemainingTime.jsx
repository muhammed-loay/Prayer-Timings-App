import React, { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ar";

export default function App({ timings, time }) {
  const timings_arr = useMemo(() => {
    return Object.entries(timings)
      .filter(([key]) =>
        ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(key)
      )
      .map(([key, value]) => {
        const cleanValue = value.trim();
        const parsedTime = dayjs(cleanValue, "HH:mm");
        if (parsedTime.isValid()) {
          return { key, value: parsedTime.format("HH:mm") };
        } else {
          console.error("Invalid time format for ${key}", value);
          return { key, value };
        }
      });
  }, [timings]);

  const [timeRemaining, setTimeRemaining] = useState("00:00:00");
  const [nextPray, setNextPray] = useState(null);

  const prayers = [
    { apiname: "Fajr", displayname: "الفجر" },
    { apiname: "Dhuhr", displayname: "الظهر" },
    { apiname: "Asr", displayname: "العصر" },
    { apiname: "Maghrib", displayname: "المغرب" },
    { apiname: "Isha", displayname: "العشاء" },
  ];

  useEffect(() => {
    if (timings_arr.length === 0) return;

    const calculateRemainingTime = () => {
      const now = dayjs();
      const nextPrayerIndex = timings_arr.findIndex((timing) => {
        if (!timing.value) return false;

        const currentTimeInMinutes = +now.format("HH") * 60 + +now.format("mm");

        const [prayerHour, prayerMinutes] = timing.value.split(":").map(Number);
        const prayerTimeInMinutes = prayerHour * 60 + prayerMinutes;

        return prayerTimeInMinutes > currentTimeInMinutes;
      });

      const finalNextPrayerIndex = nextPrayerIndex === -1 ? 0 : nextPrayerIndex;

      if (finalNextPrayerIndex !== nextPray) {
        setNextPray(finalNextPrayerIndex);
      }

      const nextPrayerTime = dayjs(
        `${now.format("YYYY-MM-DD")} ${
          timings_arr[finalNextPrayerIndex].value
        }`,
        "YYYY-MM-DD HH:mm"
      );

      const adjustedNextPrayerTime = nextPrayerTime.isBefore(now)
        ? nextPrayerTime.add(1, "day")
        : nextPrayerTime;

      if (adjustedNextPrayerTime && adjustedNextPrayerTime.isValid()) {
        const diffInSeconds = adjustedNextPrayerTime.diff(now, "second");
        const hours = Math.floor(diffInSeconds / 3600)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((diffInSeconds % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const seconds = (diffInSeconds % 60).toString().padStart(2, "0");

        const formattedTime = `${hours}:${minutes}:${seconds}`;
        if (formattedTime !== timeRemaining) {
          setTimeRemaining(formattedTime);
        }
      }
    };

    const interval = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [timings_arr, nextPray, timeRemaining]);

  return (
    <div>
      <h3>الوقت الحالي: {dayjs().format("HH:mm:ss")}</h3>
      {timings_arr.length > 0 && (
        <h4>
          الوقت المتبقي حتى صلاة{" "}
          {
            prayers.find(
              (prayer) => prayer.apiname === timings_arr[nextPray]?.key
            )?.displayname
          }{" "}
          : {timeRemaining}
        </h4>
      )}
    </div>
  );
}
