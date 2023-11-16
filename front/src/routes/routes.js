import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Inicio",
        component: Dashboard,
      },
      {
        path: "user",
        name: "Perfil",
        component: UserProfile,
      },
      {
        path: "table",
        name: "Libros",
        component: TableList,
      },
      {
        path: "typography",
        name: "Categorias",
        component: Typography,
      },
      {
        path: "icons",
        name: "Usuarios",
        component: Icons,
      },
      {
        path: "notifications",
        name: "Notificationes",
        component: Notifications,
      },
      {
        path: "upgrade",
        name: "Salir",
        component: UpgradeToPRO,
      },
    ],
  },
];

export default routes;
