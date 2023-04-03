import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import sunny from "./../../../asset/img/sunny.png";

interface myobj {
  main: {
    humidity: 0;
    pressure: 0;
    temp: 0;
  };
}

const Weather = () => {
  const [search, setSearch] = useState("Jaipur");
  const [error, setError] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    name: "",
    main: {
      humidity: 0,
      pressure: 0,
      temp: 0,
    },
  });
  const [futureWeather, setFutureWeather] = useState({
    data: {
      list: [],
    },
  });

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    searchWeather();
  }, []);

  const searchWeather = async () => {
    let lat, lon;
    let baseUrl = "https://openweathermap.org/data/2.5";
    var config = {
      method: "get",
      url: `${baseUrl}/find?q=${search}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`,
    };
    var futureConfig = {
      method: "get",
      url: `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`,
    };
    try {
      const response = await axios(config);
      lat = response?.data?.list[0]?.coord?.lat;
      lon = response?.data?.list[0]?.coord?.lon;
      if (response?.data?.list.length !== 0) {
        setCurrentWeather(response?.data?.list[0]);
        setFutureWeather(lat);
        if (lat != null && lon != null) {
          const futureDate = await axios(futureConfig);
          setFutureWeather(futureDate);
        }
      } else {
        setError(true);
      }
    } catch {
      console.log("err", Error);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ padding: "10px" }}>
        <TextField
          id="outlined-basic"
          label="Search City"
          variant="outlined"
          value={search}
          error={error}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setSearch(e.target.value)}
          helperText={error ? "Please enter a valid city name." : null}
        />
        <Button
          variant="contained"
          sx={{ height: "3.5rem" }}
          onClick={searchWeather}
        >
          search
        </Button>
      </Stack>

      {Object.keys(currentWeather).length ? (
        <Box sx={{ paddingLeft: "3rem" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {currentWeather?.name}
            </Typography>
            <img src={sunny} alt="weather" height="50px" />
            <Typography variant="body2">
              {"Humidity - " + currentWeather?.main?.humidity}
            </Typography>
            <Typography variant="body2">
              {"Pressure - " + currentWeather?.main?.pressure}
            </Typography>
            <Typography variant="body2">
              {"Temperatue - " +
                Math.floor(currentWeather?.main?.temp - 273.15) +
                " °C"}
            </Typography>
          </CardContent>
        </Box>
      ) : null}

      <Stack direction="row" justifyContent="space-evenly">
        {futureWeather?.data?.list.map((item: myobj, index: number) => {
          if (index !== 0 && index % 5 === 0) {
            return (
              <Box key={index}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    {weekdays[index / 5 - 1]}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {currentWeather?.name}
                  </Typography>
                  <img src={sunny} alt="weather" height="50px" />
                  <Typography variant="body2">
                    {"Humidity - " + item?.main?.humidity}
                  </Typography>
                  <Typography variant="body2">
                    {"Pressure - " + item?.main?.pressure}
                  </Typography>
                  <Typography variant="body2">
                    {"Temperatue - " + item?.main?.temp + " °C"}
                  </Typography>
                </CardContent>
              </Box>
            );
          }
        })}
      </Stack>
    </>
  );
};
export default Weather;
