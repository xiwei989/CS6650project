
import { Card, List, Divider } from 'antd';
import { useState, useEffect } from 'react';
import {http} from "../utils/http";

const { Meta } = Card;

const DisplaySellerOrder = () => {

    const userId = localStorage.getItem('userId').replace("\"","");
    const [orders, setOrders] = useState([]);
    const fetchOrders = async() => {
        const response = await http.get(`/api/order/sellerorder/${userId}`);
        setOrders(response.data);
        console.log(response)
    };
    useEffect(() => {
        fetchOrders();
    },[])
    
    return (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 5,
            xl: 5,
            xxl: 5,
          }}
          dataSource={orders}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ width: 240 }}
              >
                <Meta title={<span>Product Name: {item.productName}</span>} description={<span>Seller ID: {item.sellerId}<br />BuyerId:{item.buyerId}<br />Price:{item.price} <br />Quantity:{item.quantity}</span>} />
              </Card>
            </List.Item>
          )}
        />
      );
  };
  const DisplayBuyerOrder = () => {
    const userId = localStorage.getItem('userId').replace("\"","");
  
    const [orders, setOrders] = useState([]);
    const fetchOrders = async() => {
        const response = await http.get(`/api/order/buyerorder/${userId}`);
        setOrders(response.data);
    };
    useEffect(() => {
        fetchOrders();
    },[])
    
    return (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 5,
            xl: 5,
            xxl: 5,
          }}
          dataSource={orders}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ width: 240 }}
              >
                <Meta title={<span>Product Name: {item.productName}</span>} description={<span>Seller ID: {item.sellerId}<br />BuyerId:{item.buyerId}<br />Price:{item.price} <br />Quantity:{item.quantity}</span>} />
              </Card>
            </List.Item>
          )}
        />
      );
  };

function DisplayOrder(){
  return (
    <div>
    <h1>Your Selling Orders</h1>
    <DisplaySellerOrder />
    <Divider />
    <h1>Your Purchase Orders</h1>
    <DisplayBuyerOrder />
  </div>
  );  
}

export default DisplayOrder;