import "../../App.css";
import { useEffect, useState } from "react";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import ResponsiveDrawerUser from "../../components/SidebarUser";
import 'react-toastify/dist/ReactToastify.css';
import Comment from "../../components/Comment";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Comments() {
  const username = localStorage.getItem("username");
  const auth = localStorage.getItem("auth");
  const navigate = useNavigate();
  interface Comment {
    id: number;
    comment: string;
    rate: number;
    username: string;
    createdAt: string;
    updatedAt: string;
  }
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<number | null>(2);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);

    try {
      const response = await fetch("http://localhost:3003/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify({
          username: username,
          comment: data.get("comment"),
          rate: value,
        }),
      });
      const dataResponse = await response.json();
      console.log(dataResponse);
      if (dataResponse.statusCode === 401) {
        navigate("/login");
      }
      if (response.ok) {
        toast.success("Comentario creado exitosamente");
        window.location.reload();
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setError("Error en la solicitud");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/api/review?limit=100"
        );
        if (!response.ok) {
          throw new Error("Error al cargar los comentarios");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);
  return (
    <div className="commentsContainer">
      <ToastContainer />
      <ResponsiveDrawerUser />
      <div className="tittleContainer">
        <Typography variant="h6" noWrap component="div" fontWeight="bold">
          COMENTARIOS DESTACADOS
        </Typography>
        <div className="commentsListContainer">
          {comments.map((comment, index) => (
            <Comment
              key={index}
              title={comment.username}
              description={comment.comment}
              baseColor="white"
              finalColor="#E1E2F2"
              rate={comment.rate}
            />
          ))}
        </div>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <div className="inputsContainer">
            <TextField
              margin="normal"
              required
              fullWidth
              id="comment"
              label="Comment"
              name="comment"
              autoComplete="comment"
              autoFocus
              error={Boolean(error)}
              helperText={error}
            />
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear Comentario
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Comments;
