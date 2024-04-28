import {http} from "../utils/http";
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Input, Space} from 'antd';

function Product() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
      const { name, description, price, inventory } = values
      const userId = localStorage.getItem('userId').replace(/\\/g, "").replace(/\"/g, '');

      try {
        await http.post("/api/product/addproduct", {
        name: name,
        description: description,
        price: price,
        inventory: inventory,
        sellerId: userId
        }, {mode: 'cors'});
        alert("Product Add Successfully");
      } catch (err) {
        alert(err);
      }
      navigate('/home/products');
    }

    return (
      <div className="publish">
        <Card title="Please Input Product Information">
        <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Please input product name.' }]}
      >
        <Input placeholder="Product name..." style={{ width: 400 }} />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input sale price.' }]}
      >
        <Input placeholder="Price..." style={{ width: 400 }} />
      </Form.Item>

      <Form.Item
        label="Inventory"
        name="inventory"
        rules={[{ required: true, message: 'Please input the inventory the product.' }]}
      >
        <Input placeholder="Inventory..." style={{ width: 400 }} />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input description for the product.' }]}
      >
        <Input placeholder="Description..." style={{ width: 400 }} />
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

export default Product;