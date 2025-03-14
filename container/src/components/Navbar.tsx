import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import useStore from "../hooks/useStore";
import { useStoreSelector } from "../hooks/useStoreSelector";

const providerOptions: SelectProps["options"] = [
  { value: "provider1", label: "Provider 1" },
  { value: "provider2", label: "Provider 2" },
  { value: "provider3", label: "Provider 3" },
];

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { changeProvider } = useStore();
  const { selectedProvider } = useStoreSelector((state) => state.providers);

  const handleProviderChange = (value: string) => {
    changeProvider(value);
  };

  return (
    <div className={`w-full bg-white shadow-md ${className || ""}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-red-600">Container App</div>
          <Select
            value={selectedProvider}
            onChange={handleProviderChange}
            options={providerOptions}
            style={{ width: 150 }}
            placeholder="Select Provider"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;