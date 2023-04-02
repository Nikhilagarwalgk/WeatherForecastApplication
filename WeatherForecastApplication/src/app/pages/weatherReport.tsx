import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import Weather from "../component/weather/Weather";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const WeatherReport = () => {
  return (
    <>
      <Box>
        <Stack justifyContent="center">
          <Header />
          <Weather />
          <Footer />
        </Stack>
      </Box>
    </>
  );
};
export default WeatherReport;
