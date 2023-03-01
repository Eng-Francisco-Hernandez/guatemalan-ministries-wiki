import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavbarLayout from "@/components/layout/NavbarLayout";
import {
  Paper,
  Grid,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";

export default function Index() {
  const { query, push } = useRouter();
  const [publicItems, setPublicItems] = useState([]);

  useEffect(() => {
    async function fetchPublicItems() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/public-finances-ministry/public-information`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: query.title,
              category: query.path,
              querySelector: "ul.collection > li.collection-item.avatar",
            }),
          }
        );
        const parsedResponse = await res.json();
        setPublicItems(parsedResponse);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPublicItems();
  }, []);

  return (
    <NavbarLayout showHomeIcon>
      <>
        <Paper className="jumbotron-title" elevation={12} sx={{ mb: 2 }}>
          {query.title}
        </Paper>
        <Grid container spacing={2}>
          {publicItems.map((item, i) => {
            return (
              <Grid item xs={12} key={i}>
                <Paper className="jumbotron-content" elevation={12}>
                  <h5 style={{ margin: "10px" }}>{(item as any).title}</h5>
                  <List disablePadding>
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        href={(item as any).downloadUrl}
                        target="_blank"
                      >
                        <ListItemText primary="Descargar archivo" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        component="a"
                        href={(item as any).url}
                        target="_blank"
                      >
                        <ListItemText primary="Ver respuesta JSON en sitio web original" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </>
    </NavbarLayout>
  );
}
