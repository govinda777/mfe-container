import { Button, Card, Typography, Space, Row, Col, Alert } from "antd";
import useStore from "container/hooks/useStore";
import { useStoreSelector } from "container/hooks/useStoreSelector";
import React from "react";

export default function TestPage() {
  const { decrementCounter, incrementByAmountCounter, incrementCounter, getProductList, changeProvider } = useStore();
  const {
    counter: { value },
    product: { products },
    providers: { selectedProvider },
  } = useStoreSelector((state) => state);

  return (
    <Card title="Test Page From Remote Application" bordered>
      <Alert
        message={`Selected Provider: ${selectedProvider}`}
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

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.brand} src={product.images[0]} style={{ height: 120, objectFit: "contain" }} />}
            >
              <Typography.Text strong>{product.brand}</Typography.Text>
              <Typography.Paragraph>${product.price}</Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
}
