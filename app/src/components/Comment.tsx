import { Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface BasicCardProps {
  title: string;
  description: string;
  baseColor: string;
  finalColor: string;
  rate: number;
}

export default function Comment(props: BasicCardProps) {
  const { title, description, baseColor, finalColor, rate } = props;

  return (
    <Card
      sx={{
        minHeight: 60,
        minWidth: 1500,
        background: `linear-gradient(to top right, ${baseColor}, ${finalColor}) `,
        marginBottom: 1,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="16px"
        ></Box>
        <Typography
          sx={{ fontSize: 12 }}
          color="text.secondary"
          gutterBottom
          fontWeight="bold"
        >
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
        <Rating name="simple-controlled" value={rate} />
      </CardContent>
    </Card>
  );
}
