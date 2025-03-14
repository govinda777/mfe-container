import React from "react";
import { Row, Col, Typography, Select } from "antd";
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
    <div className={className} style={{ background: "#fff" }}>
      <Row align="middle">
        {/* 1ª Coluna: Título à esquerda */}
        <Col span={4}>
          <Title level={3} style={{ margin: 0, color: "red" }}>
            Container App
          </Title>
        </Col>

        {/* 2ª Coluna: combo no centro (textAlign: center) */}
        <Col span={2}>
          <Select
            value={selectedProvider}
            onChange={handleProviderChange}
            options={providerOptions}
            style={{ width: 150 }}
            placeholder="Select Provider"
          />
        </Col>

        {/* 3ª Coluna: vazia ou para outro conteúdo (permite combo ficar no centro real) */}
        <Col span={8} />
      </Row>
    </div>
  );
};

export default Navbar;
