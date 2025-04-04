import Navigation from 'components/Navigation/Navigation';
import { Outlet } from "react-router-dom";
const UserDashboardLayout = () => {
  return (
    <main>
        <Navigation />
        <Outlet />
    </main>
  )
}

export default UserDashboardLayout