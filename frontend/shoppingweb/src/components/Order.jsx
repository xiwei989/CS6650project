import { Card, Form, Button, Input, Space} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {http} from "../utils/http";

function Order() {
    const location = useLocation();
    const { productId, sellerId, price, productName } = location.state || {};
    console.log(productName)
    const buyerId = localStorage.getItem('userId').replace(/\\/g, "").replace(/\"/g, '');

    const navigate = useNavigate();
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const orderdate = `${year}-${month}-${date}`;

  const onFinish = async (values) => {
    const { quantity } = values
    try {
      console.log(buyerId);
      await http.post("/api/order/addorder", {
        sellerId: sellerId,
        buyerId: buyerId,
        productId: productId,
        productName: productName,
        orderDate: orderdate,
        quantity: quantity,
        price: price
        }).then((res) => 
        {
            navigate("/home/orders");
      }, fail => {
        console.error(fail);
      });
    }
    catch (err) {
      alert(err);
    }
    navigate('/home/products');
  }
    

    return (
        <div>
        <Card title="Please Input Number of Products">
        <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'Please input quantity.' }]}
      >
        <Input placeholder="Quantity..." style={{ width: 400 }} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space>
          <Button size="large" type="primary" htmlType="submit">
            {'Submit'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </Card>
        </div>
        );
    }

export default Order;