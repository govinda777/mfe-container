import React from "react";
import { Row, Col, Select, Typography } from "antd";
import type { SelectProps } from "antd";
import useStore from "../hooks/useStore";
import { useStoreSelector } from "../hooks/useStoreSelector";

const { Title } = Typography;

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
    <div className={className} style={{ background: "#fff", padding: "16px" }}>
      <Row justify="space-between" align="middle">
        {/* Título à esquerda */}
        <Col>
          <Title level={4} style={{ margin: 0, color: "red" }}>
            Container App
          </Title>
        </Col>

        {/* Combo à direita */}
        <Col>
          <Select
            value={selectedProvider}
            onChange={handleProviderChange}
            options={providerOptions}
            style={{ width: 150 }}
            placeholder="Select Provider"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
