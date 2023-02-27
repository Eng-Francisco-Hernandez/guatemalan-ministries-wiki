import { Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function Minfin({ publicItems = [] }) {
  const router = useRouter();
  return (
    <>
      <Paper className="jumbotron-title" elevation={12}>
        Ministerio de Finanzas Públicas
      </Paper>
      <Paper className="jumbotron-content" sx={{ mt: 3 }} elevation={12}>
        La informa pública disponible para este ministerio es la siguiente
      </Paper>
      <Grid container spacing={2}>
        {publicItems.map((item, i) => {
          return (
            <Grid item xs={4} key={i}>
              <Paper
                className="jumbotron-content center clickable"
                sx={{ mt: 3 }}
                elevation={12}
                onClick={() =>
                  router.push({
                    pathname: `/minfin/${(item as any).url.split("/").at(-1)}`,
                    query: { title: (item as any).title },
                  })
                }
              >
                <h5>{(item as any).title}</h5>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
