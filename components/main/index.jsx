import { Typography, Paper, Grid, Button, Link } from "@material-ui/core";
import Image from "next/image";
const main = () => {
  return (
    <>
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            <div>
              <Image
                src="/duck-banner.png"
                alt="Duck"
                width={800}
                height={600}
              />
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Duck Fed
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                We're trying to understand how ducks are being fed in parks
                around the world. Good to prepare your duck fed information and
                help us to improve our duck's life!
              </Typography>
              <Link href="/add">
                <Button variant="contained" color="primary">
                  Add Duck Fed Information
                </Button>
              </Link>
              <Link href="/view">
                <Button variant="contained" color="secondary">
                  View Duck Fed Information
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default main;
