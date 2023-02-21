import Box from "@mui/material/Box";
import Navbar from "@/components/navbar/Navbar";
import { Container, CssBaseline, Paper } from "@mui/material";
import { useState } from "react";
import Landing from "@/components/landing/Landing";

export default function PrimarySearchAppBar() {
  const [searchValue, setSearchValue] = useState("");
  const onEnter = (e: any) => {
    if (e.key === "Enter") {
      console.log("Enter");
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar
        searchValue={searchValue}
        onChangeSearchValue={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => onEnter(e)}
      />
      <Box className="main-layout" component="main">
        <Container maxWidth="lg">
          <Landing />
        </Container>
      </Box>
    </Box>
  );
}
