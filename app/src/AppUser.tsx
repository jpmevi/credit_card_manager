import "./App.css";
import BasicCard from "./components/Card";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ResponsiveDrawerUser from "./components/SidebarUser";
import { useEffect, useState } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
function AppUser() {
  const username = localStorage.getItem("username");
  const auth = localStorage.getItem("auth");
  interface Accoount {
    number: string;
    doe: string;
    balance: string;
  }
  const [accounts, setAccount] = useState<Accoount[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/api/account/" + username,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth,
            },
          }
        );
        const data = await response.json();
        if (data.statusCode === 401) {
          navigate("/login");
        }
        if (!response.ok) {
          throw new Error("Error al cargar las cuentas");
        }
        console.log(data);
        setAccount(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);
  return (
    <div className="appUserContainer">
      <ResponsiveDrawerUser />
      <Typography variant="h6" noWrap component="div" fontWeight="bold">
        TUS CUENTAS
      </Typography>
      <div className="creditCardContainer">
        {accounts.map((account, index) => (
          <BasicCard
            key={index}
            title={account.number}
            description={account.doe}
            icon={<CreditCardIcon />}
            iconColor="black"
            baseColor="#CD5C5C"
            finalColor="#FFA07A"
          />
        ))}
      </div>
      <Typography variant="h6" noWrap component="div" fontWeight="bold">
        ACCIONES
      </Typography>
      <div className="cardContainer">
        <BasicCard
          title="Comentarios"
          description="Ver todos los comentarios"
          icon={<ReceiptLongIcon />}
          iconColor="blue"
          baseColor="#647AF0"
          finalColor="#E1E2F2"
        />
        <BasicCard
          title="Historial de Movimientos"
          description="Ver detalle de movimientos en todas las cuentas"
          icon={<AccountBalanceIcon />}
          iconColor="skyblue"
          baseColor="#647AF0"
          finalColor="#E1E2F2"
        />
      </div>
    </div>
  );
}

export default AppUser;
