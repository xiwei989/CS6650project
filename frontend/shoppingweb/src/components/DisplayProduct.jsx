import { useState, useEffect } from 'react';
import { Card, List} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {http} from "../utils/http";

const { Meta } = Card;

function DisplayProducts(){
    const [products, setProducts] = useState([]);
    const fetchProducts = async() => {
        const response = await http.get("/api/product/allproducts");
        setProducts(response.data);
    };
    useEffect(() => {
        fetchProducts();
    },[])
  
    const navigate = useNavigate();
    const handleClick = (data) => {
      navigate("/home/addorder", {state: {productId: data.id, sellerId: data.sellerId, price: data.price, productName:data.name}});
    };
  
    
    return (
      <div>
      <h1>Products for Selling</h1>
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
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ width: 240 }}
                onClick={() => handleClick(item)}
              >
                <Meta title={item.name} description={<span>Seller ID: {item.sellerId}<br />Description:{item.description}<br />Price:{item.price} <br />Inventory:{item.inventory}</span>} />
              </Card>
            </List.Item>
          )}
        />
        </div>
      );
  };

  export default DisplayProducts;