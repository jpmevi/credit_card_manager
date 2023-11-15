import { Delete } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import ResponsiveDrawer from "../../components/Sidebar";
import StickyHeadTable, { Column } from "../../components/Table";
import PaymentIcon from "@mui/icons-material/Payment";
import PaymentsIcon from "@mui/icons-material/Payments";
const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170, align: "center" },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100, align: "center" },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
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

const actions = [
  {
    icon: <CreateIcon />,
    onClick: () => {
      // Handle edit action
      console.log("Edit clicked");
    },
  },
  {
    icon: <Delete />,
    onClick: () => {
      // Handle delete action
      console.log("Delete clicked");
    },
  },
  {
    icon: <PaymentIcon />,
    onClick: () => {
      // Handle edit action
      console.log("Payment clicked");
    },
  },
  {
    icon: <PaymentsIcon />,
    onClick: () => {
      // Handle edit action
      console.log("Payments clicked");
    },
  },
];

function AccountList() {
  return (
    <div className="appContainer">
      <ResponsiveDrawer />
      <StickyHeadTable
        columns={columns}
        rows={rows}
        actions={actions}
      />
      ;
    </div>
  );
}

export default AccountList;
