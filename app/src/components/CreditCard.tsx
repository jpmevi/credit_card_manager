import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { FcSimCardChip } from "react-icons/fc";

interface BasicCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  iconColor: string;
  baseColor: string;
  finalColor: string;
}

export default function BasicCreditCard(props: BasicCardProps) {
  const { title, description, icon, iconColor, baseColor, finalColor } = props;

  return (
    <Card sx={{ minWidth: 220, maxWidth:250, height:230, paddingTop:1,  borderRadius:6, background:  ` linear-gradient(0deg, #4776e6 0%, #8e54e9 100%); `}}>
      
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
        <span className="credit-card-text">Tarjeta de credito</span>
        <Typography sx={{ fontSize: 16 }} color="white" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <div className="credit-card-date">
        <FcSimCardChip size={40} />
          <Typography variant="body2">{description}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
