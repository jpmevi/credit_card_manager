import "./App.css";
import ResponsiveDrawer from "./components/Sidebar";
import BasicCard from "./components/Card";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BlockIcon from '@mui/icons-material/Block';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
function App() {
  return (
    <div className="appContainer">
      <ResponsiveDrawer />
      <div className="separator-y"></div>
      <div className="cardContainer">
        <BasicCard
          title="Movimientos"
          description="Ver reporte de todos los movimiento"
          icon={<ReceiptLongIcon />}
          iconColor="blue"
          baseColor="#FFA500"
          finalColor="#FFD700"
        />
        <BasicCard
          title="Detalle de Cuentas"
          description="Ver detalle de las cuentas"
          icon={<AccountBalanceIcon />}
          iconColor="skyblue"
          baseColor="#FFA500"
          finalColor="#FFD700"
        />
        <BasicCard
          title="Cuentas"
          description="Ver reporte de todas las cuentas"
          icon={<AccountBalanceWalletIcon />}
          iconColor="green"
          baseColor="#FFA500"
          finalColor="#FFD700"
        />
        <BasicCard
          title="Cuentas Bloqueadas"
          description="Ver reporte de cuentas bloqueadas"
          icon={<BlockIcon />}
          iconColor="red"
          baseColor="#FFA500"
          finalColor="#FFD700"
        />
        <BasicCard
          title="Cierre de cuentas"
          description="Ver Cuentas que fueron cerradas"
          icon={<HighlightOffIcon />}
          iconColor="orange"
          baseColor="#FFA500"
          finalColor="#FFD700"
        />
      </div>
    </div>
  );
}

export default App;
