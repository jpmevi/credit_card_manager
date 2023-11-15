import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "../../App.css";
import ResponsiveDrawerLogOut from "../../components/SidebarLogOut";
import { useNavigate } from "react-router-dom";
import PinIcon from "@mui/icons-material/Pin";
import React from "react";
function PinReminder() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);

    try {
      const response = await fetch(
        "http://localhost:3003/api/user/reminder/" + data.get("email"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        // La solicitud fue exitosa, puedes redirigir a la página deseada
        navigate("/login");
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
    <div className="appContainer">
      <ResponsiveDrawerLogOut />
      <div className="elementsContainer">
        <div className="pinReminder">
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
                  RECUPERAR PIN
                </Typography>

                <Avatar sx={{ m: 1, bgcolor: "#647AF0" }}>
                  <PinIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Ingrese un correo para enviar el pin
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
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={Boolean(error)} // Highlight the field if there's an error
                    helperText={error || "Email Requerido "}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Enviar Email
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item></Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default PinReminder;
