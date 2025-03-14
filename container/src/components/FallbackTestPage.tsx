import React from "react";
import { Button, Card, Typography, Space, Row, Alert } from "antd";
import { useStoreSelector } from "../hooks/useStoreSelector";
import useStore from "../hooks/useStore";

/**
 * Fallback component for when the remote TestPage is unavailable
 * This provides similar functionality to the remote TestPage but is part of the container
 */
const FallbackTestPage: React.FC = () => {
  const { decrementCounter, incrementByAmountCounter, incrementCounter, getProductList } = useStore();
  const {
    counter: { value },
    providers: { selectedProvider },
  } = useStoreSelector((state) => state);

  return (
    <Card title="Test Page (Local Fallback)" bordered>
      <Alert
        message={`Selected Provider: ${selectedProvider}`}
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
      />
      
      <Alert
        message="Remote application is currently unavailable. Using local fallback component."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      
      <Typography.Text strong>Counter value: {value}</Typography.Text>
      
      <Space style={{ marginTop: 16 }}>
        <Button danger onClick={decrementCounter}>Decrement</Button>
        <Button type="primary" onClick={incrementCounter}>Increment</Button>
        <Button type="default" onClick={() => incrementByAmountCounter(5)}>Increment by 5</Button>
        <Button type="dashed" onClick={() => incrementByAmountCounter(-5)}>Decrement by 5</Button>
        <Button type="primary" onClick={getProductList}>Get All Products</Button>
      </Space>

      <Row style={{ marginTop: 24 }}>
        <Typography.Paragraph>
          Product list functionality is limited in fallback mode.
        </Typography.Paragraph>
      </Row>
    </Card>
  );
};

export default FallbackTestPage;