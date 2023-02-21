import React from "react";
import Box from "@mui/material/Box";
import Navbar from "@/components/navbar/Navbar";
import { Container, CssBaseline } from "@mui/material";
import { useState } from "react";
import { NavbarLayoutProps } from "@/types/components";

export default function NavbarLayout(props: NavbarLayoutProps) {
  const { children } = props;
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
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
}
