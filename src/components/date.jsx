import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ar";

export default function DateComponent() {
  const [date, setdate] = useState("");
  useEffect(() => {
    dayjs.locale("ar");
    const currentDate = dayjs().format("DD MMMM YYYY");
    setdate(currentDate);
  }, []);
  return (
    <div style={{ textAlign: "center", fontSize: "1.5rem", margin: "20px" }}>
      {date}
    </div>
  );
}
