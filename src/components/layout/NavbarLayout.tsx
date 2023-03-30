import React from "react";
import Box from "@mui/material/Box";
import Navbar from "@/components/navbar/Navbar";
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { NavbarLayoutProps } from "@/types/components";
import { useRouter } from "next/router";
import { Ministries } from "@/utils/util-constants/ministries";

export default function NavbarLayout(props: NavbarLayoutProps) {
  const { children, showHomeIcon = false } = props;
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEnter = async (e: any) => {
    if (e.key === "Enter") {
      if(searchValue.trim() === '') return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/global`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: searchValue,
            }),
          }
        );
        const parsedResponse = await res.json();
        setSearchResults(parsedResponse);
        handleClickOpen();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar
        searchValue={searchValue}
        onChangeSearchValue={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => onEnter(e)}
        showHomeIcon={showHomeIcon}
      />
      <Box className="main-layout" component="main">
        <Container maxWidth="lg">
          {children}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
          >
            <DialogTitle id="alert-dialog-title">
              {"Resultados encontrados"}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {!searchResults.length ? (
                  <h5>No se encontraron resultados para su búsqueda</h5>
                ) : (
                  <List>
                    {searchResults.map((item: any, i) => {
                      return (
                        <ListItem key={i} disablePadding>
                          <ListItemButton
                            component="a"
                            href={
                              item.ministry
                                ? `/${item.ministry.toLowerCase()}`
                                : item.parentMinistry === Ministries.MINFIN
                                ? item.downloadUrl
                                : item.url.startsWith("https://")
                                ? item.url
                                : `${process.env.NEXT_PUBLIC_MINECO_BASE_URL}/${item.url}`
                            }
                            target="_blank"
                          >
                            <ListItemText primary={(item as any).title} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
