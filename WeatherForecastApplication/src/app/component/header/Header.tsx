import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const header = {
  height: "3.5rem",
  backgroundColor: "#1976d2",
};
const Header = () => {
  return (
    <>
      <Box sx={header}>
        <Typography align="center" color="white" variant="h5" padding="10px">
          {"Weather Forecast"}
        </Typography>
      </Box>
    </>
  );
};
export default Header;
