import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import useStore from "../hooks/useStore";
import { useStoreSelector } from "../hooks/useStoreSelector";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Home", "home"),
  getItem("Products", "products"),
  getItem("About", "about"),
  getItem("Contact", "contact"),
];

interface SideMenuProps {
  className?: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ className }) => {
  const { changeMenuItem } = useStore();
  const { selectedMenuItem } = useStoreSelector((state) => state.menu);

  const onClick: MenuProps["onClick"] = (e) => {
    changeMenuItem(e.key);
  };

  return (
    <div className={`bg-white shadow-md h-full ${className || ""}`}>
      <div className="py-4">
      <Menu
        onClick={onClick}
        selectedKeys={[selectedMenuItem]}
        mode="inline"
        items={items}
        className="border-0 h-full"
        style={{ width: 200 }}
        data-testid="menu"  // Adicionando um identificador para facilitar os testes
      />
      </div>
    </div>
  );
};

export default SideMenu;