import { Delete } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import StickyHeadTable, { Column } from "../../components/Table";
import PaymentIcon from "@mui/icons-material/Payment";
import PaymentsIcon from "@mui/icons-material/Payments";
import ResponsiveDrawerUser from "../../components/SidebarUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  { id: "amount", label: "Amount", minWidth: 100, align: "center" },
  { id: "old_balance", label: "Old Balance", minWidth: 100, align: "center" },
  {
    id: "current_balance",
    label: "Current Balance",
    minWidth: 100,
    align: "center",
  },
  { id: "type", label: "Type", minWidth: 100, align: "center" },
  { id: "create_at", label: "Date", minWidth: 100, align: "center" },
  {
    id: "account_number",
    label: "Account Number",
    minWidth: 100,
    align: "center",
  },
];

const rows = [
  {
    name: "India",
    code: "IN",
    population: 1324171354,
    size: 3287263,
    density: 403,
  },
  {
    name: "China",
    code: "CN",
    population: 1403500365,
    size: 9596961,
    density: 146,
  },
];

function AccountMovements() {
  const username = localStorage.getItem("username");
  const auth = localStorage.getItem("auth");
  const accountNumber = localStorage.getItem("accountNumber");
  const navigate = useNavigate();
  interface Accoount {
    id: number;
    amount: string;
    old_balance: string;
    current_balance: string;
    type: string;
    create_at: string;
    account_number: string;
  }
  const [history, setHistory] = useState<Accoount[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          "http://3.144.202.200:3016/api/report/movementsReport/" + accountNumber+"?limit=100",
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
          throw new Error("Error al cargar los historiales");
        }
        console.log(data);
        setHistory(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="appContainer">
      <ResponsiveDrawerUser />
      <StickyHeadTable
        columns={columns}
        rows={history}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default AccountMovements;
