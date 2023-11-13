import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Credit Card Manager
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const username = data.get("username") as string;
    try {
      const response = await fetch("http://localhost:3003/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.get("username"),
          pin: data.get("pin"),
        }),
      });
      const dataJson = await response.json();
      console.log(dataJson);
      if (response.ok) {
        localStorage.setItem("auth", dataJson.access_token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", dataJson.role);
        if (dataJson.role === "administrator") {
          navigate("/dashboard-admin");
        } else {
          navigate("/dashboard-user");
        }
        // La solicitud fue exitosa, puedes redirigir a la página deseada
      } else {
        // La solicitud no fue exitosa, maneja el error o muestra un mensaje
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setError("Error en la solicitud");
    }
  };

  return (
    <div className="login">
      <Box
        sx={{
          background: "white",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 16,
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" fontWeight="bold">
              PORTAL TARJETA
            </Typography>

            <Avatar sx={{ m: 1, bgcolor: "#FFA500" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              LOG IN
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="pin"
                label="Pin"
                type="pin"
                id="pin"
                autoComplete="pin"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot pin?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </div>
  );
}
