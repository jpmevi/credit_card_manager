import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

interface BasicCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  iconColor: string;
  baseColor: string;
  finalColor: string;
}

export default function BasicCard(props: BasicCardProps) {
  const { title, description, icon, iconColor, baseColor, finalColor } = props;

  return (
    <Card sx={{ minWidth: 275,  background:  `linear-gradient(to top right, ${baseColor}, ${finalColor}) `}}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={2}
          borderRadius="16px"
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              fontSize: 28,
              bgcolor: iconColor,
            }}
          >
            {icon}
          </Avatar>
        </Box>
        <Typography sx={{ fontSize: 21 }} color="text.secondary" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}
