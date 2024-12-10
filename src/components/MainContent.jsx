import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Date from "./date";
import Timer from "./timer";
import RemainingTime from "./RemainingTime";

export default function MainContent() {
  const [time, setTime] = useState(0);

  const [timings, setTimings] = useState({});
  const [cityname, setcityname] = useState({
    displayname: "القاهرة",
    apiname: "cairo",
  });
  const availablecities = [
    { displayname: "القاهرة", apiname: "cairo" },
    { displayname: "الجيزة", apiname: "giza" },
    { displayname: "الإسكندرية", apiname: "alexandria" },
    { displayname: "المنصورة", apiname: "mansoura" },
    { displayname: "الأقصر", apiname: "luxor" },
    { displayname: "أسوان", apiname: "aswan" },
    { displayname: "طنطا", apiname: "tanta" },
    { displayname: "السويس", apiname: "suez" },
    { displayname: "بورسعيد", apiname: "port-said" },
    { displayname: "الفيوم", apiname: "faiyum" },
    { displayname: "سوهاج", apiname: "sohag" },
    { displayname: "قنا", apiname: "qena" },
    { displayname: "الزقازيق", apiname: "zagazig" },
    { displayname: "دمياط", apiname: "damietta" },
    { displayname: "شرم الشيخ", apiname: "sharm-el-sheikh" },
    { displayname: "الغردقة", apiname: "hurghada" },
    { displayname: "الإسماعيلية", apiname: "ismailia" },
    { displayname: "بني سويف", apiname: "bani-sweif" },
    { displayname: "أسيوط", apiname: "asyut" },
    { displayname: "المنيا", apiname: "minya" },
    { displayname: "مطروح", apiname: "matrouh" },
    { displayname: "كفر الشيخ", apiname: "kafr-el-sheikh" },
    { displayname: "العريش", apiname: "arish" },
    { displayname: "دمنهور", apiname: "damanhour" },
  ];

  const getTiming = async () => {
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${cityname.apiname}&country=Egypt`
    );
    setTimings(data.data.data.timings);
  };
  useEffect(() => {
    getTiming();
  }, [cityname]);
  const handleCityChange = (event) => {
    const cityobject = availablecities.find(
      (city) => city.displayname === event.target.value
    );
    console.log("the city is", event.target.value);
    setcityname(cityobject);
  };
  const timings_arr = Object.entries(timings).map(([key, value]) => ({
    key,
    value,
  }));
  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{ textAlign: "center", width: "100%" }}
      >
        <Grid item xs={12} md={5}>
          <h4>
            {timings_arr.length === 0 ? (
              <h6>جاري تحميل مواقيت الصلاة...</h6>
            ) : (
              <RemainingTime
                timings_arr={timings_arr}
                time={time}
                timings={timings}
              />
            )}
          </h4>
        </Grid>
        <Grid item xs={12} md={2}>
          <h1>
            <Timer time={time} setTime={setTime} timings={timings} />
          </h1>
        </Grid>
        <Grid item xs={12} md={5}>
          <h4>
            <Date />
          </h4>
          <h2>{cityname.displayname}</h2>
        </Grid>
      </Grid>
      <Divider />
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-around"
        spacing={2}
        style={{ marginTop: "20px" }}
      >
        <Prayer
          style={{ marginLeft: "16px" }}
          name="الفجر"
          time={timings.Fajr}
          image="./src/assets/5.jpg"
        />

        <Prayer name="الظهر" time={timings.Dhuhr} image="./src/assets/1.jpg" />
        <Prayer name="العصر" time={timings.Asr} image="./src/assets/2.jpg" />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image="./src/assets/3.jpg"
        />
        <Prayer name="العشاء" time={timings.Isha} image="./src/assets/4.jpg" />
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginTop: "30px" }}
      >
        <FormControl style={{ width: "90%" }}>
          <InputLabel id="city-select-label">المدينة</InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            label="المدينه"
            onChange={handleCityChange}
          >
            {availablecities.map((city) => (
              <MenuItem key={city.displayname} value={city.displayname}>
                {city.displayname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <a
          href="https://alfaroksoft.com/quran/index.php"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textAlign: "center",
            backgroundColor: "#f0f0f0",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          القرآن الكريم
        </a>
      </Stack>
      <style jsx>{`
        @media (max-width: 768px) {
          h4 {
            font-size: 1rem;
          }
          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
