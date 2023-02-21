import { Paper } from "@mui/material";
export default function Landing() {
  return (
    <>
      <Paper className="jumbotron-title" elevation={12}>
        Bienvenido
      </Paper>
      <Paper className="jumbotron-content" sx={{ mt: 3 }} elevation={12}>
        Seleccione una opción para ver más información
      </Paper>
    </>
  );
}
