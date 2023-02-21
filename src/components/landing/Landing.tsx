import { Grid, Paper } from "@mui/material";
import minecoLogo from "../../assets/images/logos/mineco.png";
import minfinLogo from "../../assets/images/logos/minfin.png";
export default function Landing() {
  return (
    <>
      <Paper className="jumbotron-title" elevation={12}>
        Bienvenido
      </Paper>
      <Paper className="jumbotron-content" sx={{ mt: 3 }} elevation={12}>
        Seleccione una opción la información pública disponible
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper
            className="jumbotron-content center clickable"
            sx={{ mt: 3 }}
            elevation={12}
          >
            <img className="landing-image-option" src={minecoLogo.src}></img>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className="jumbotron-content center clickable"
            sx={{ mt: 3 }}
            elevation={12}
          >
            <img className="landing-image-option" src={minfinLogo.src}></img>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
