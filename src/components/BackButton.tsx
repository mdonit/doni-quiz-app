import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const buttonOnClick = () => navigate("/");

  return (
    <Button onClick={buttonOnClick} variant="outlined" color="secondary" sx={{ marginTop: "2rem", width: 200, "&:hover": { backgroundColor: "secondary.dark", color: "secondary.contrastText" } }}>
      Back
    </Button>
  );
};

export default BackButton;
