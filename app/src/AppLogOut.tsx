import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import ResponsiveDrawerLogOut from "./components/SidebarLogOut";
import MessageIcon from "@mui/icons-material/Message";
import BasicCard from "./components/Card";
import { useNavigate } from "react-router-dom";

function AppLogout() {
  interface Comment {
    id: number;
    comment: string;
    rate: number;
    username: string;
    createdAt: string;
    updatedAt: string;
  }
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/api/review?limit=2"
        );
        const data = await response.json();
        if (data.statusCode === 401) {
          navigate("/login");
        }
        if (!response.ok) {
          throw new Error("Error al cargar los comentarios");
        }

        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="appContainer">
      <ResponsiveDrawerLogOut />
      <div className="elementsContainer">
        <Typography variant="h6" noWrap component="div" fontWeight="bold">
          MIRA LO QUE NUESTROS CLIENTES DICEN DE NOSOTROSS
        </Typography>
        <div className="comentarioContainer">
          {comments.map((comment, index) => (
            <BasicCard
              key={index}
              title={comment.username}
              description={comment.comment}
              icon={<MessageIcon />}
              iconColor="#647AF0"
              baseColor="#647AF0"
              finalColor="#E1E2F2"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppLogout;
