import React from "react";
import { Menu, Select } from "antd";
import type { MenuProps, SelectProps } from "antd";
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

const providerOptions: SelectProps["options"] = [
  { value: "provider1", label: "Provider 1" },
  { value: "provider2", label: "Provider 2" },
  { value: "provider3", label: "Provider 3" },
];

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [current, setCurrent] = React.useState("home");
  const { changeProvider } = useStore();
  const { selectedProvider } = useStoreSelector((state) => state.providers);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const handleProviderChange = (value: string) => {
    changeProvider(value);
  };

  return (
    <div className={`w-full bg-white shadow-md ${className || ""}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-red-600">Container App</div>
            <Select
              value={selectedProvider}
              onChange={handleProviderChange}
              options={providerOptions}
              style={{ width: 150 }}
              placeholder="Select Provider"
            />
          </div>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className="border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;