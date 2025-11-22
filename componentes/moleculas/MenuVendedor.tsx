import { Menu } from "antd";
import { useNavigate } from "react-router";
import { DashboardOutlined, ShoppingCartOutlined, OrderedListOutlined,} from "@ant-design/icons";

const MenuVendedor = () => {
  const navigate = useNavigate();

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={({ key }) => navigate(key)}
      items={[
        {
          key: "/",
          icon: <DashboardOutlined />,
          label: "Dashboard",
        },
        {
          key: "/productos",
          icon: <ShoppingCartOutlined />,
          label: "Productos",
        },
        {
          key: "/ordenes",
          icon: <OrderedListOutlined />,
          label: "Órdenes",
        },
      ]}
    />
  );
};

export default MenuVendedor;
