import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
    <Card sx={{ minWidth: 300, height:200, borderRadius:3 ,background: 'linear-gradient(185deg, #ffffff 0%, #caf5ff 100%);'}}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="left"
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
