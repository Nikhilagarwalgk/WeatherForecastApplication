import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const footer = {
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  height: "3.5rem",
  backgroundColor: "#1976d2",
};

const Footer = () => {
  return (
    <>
      <Box sx={footer}>
        <Typography
          align="center"
          color="white"
          variant="subtitle2"
          padding="16px"
        >
          {"Powered By Openweathermap"}
        </Typography>
      </Box>
    </>
  );
};
export default Footer;
