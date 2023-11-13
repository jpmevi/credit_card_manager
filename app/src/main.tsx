import ReactDOM from "react-dom/client";
import "./index.css";
import SignIn from "./Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import AccountList from "./views/admin/AccountList.tsx";
import AppLogout from "./AppLogOut.tsx";
import AppUser from "./AppUser.tsx";
import PinReminder from "./views/logout/PinReminder.tsx";
import Comments from "./views/user/Comments.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLogout />} />
      <Route path="/pin-reminder" element={<PinReminder />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/dashboard-admin" element={<App />} />
      <Route path="/dashboard-user" element={<AppUser />} />
      <Route path="/accountList" element={<AccountList />} />
      <Route path="/comments" element={<Comments />} />
    </Routes>
  </BrowserRouter>
);
