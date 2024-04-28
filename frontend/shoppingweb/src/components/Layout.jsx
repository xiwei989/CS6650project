import { Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ContainerOutlined, PieChartOutlined, ShopOutlined } from '@ant-design/icons';
import "../Styles/layout.css";
import "../Styles/sidebar.css";
import Header from './Header';

const { Sider } = Layout

function Home (){
    const { pathname } = useLocation();
    const {colorBgContainer} = theme.useToken();
    const userId = localStorage.getItem('userId').replace("\"","");

    return (
        <Layout>
          <Header />
          <Layout>
            <Sider width={200} style={{background: colorBgContainer}}>
              <Menu
                mode="inline"
                defaultSelectedKeys={pathname}
                selectedKeys={pathname}
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item icon={<PieChartOutlined style={{color:'#50123c'}}/>} key="/products">
                  <Link to='/home/products' style={{textDecoration: 'none'}}>All Products</Link>
                </Menu.Item>

                  <Menu.Item icon={<ShopOutlined style={{color:'#50123c'}}/>} key="/addproduct">
                    <Link to="/home/addproduct" style={{textDecoration: 'none'}}>Add Product</Link>
                  </Menu.Item>
                  <Menu.Item icon={<ContainerOutlined style={{color:'#50123c'}}/>} key="/orders">
                    <Link to="/home/orders" state={{userId:userId}} style={{textDecoration: 'none'}}>My Orders</Link>
                  </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="layout-content" style={{ padding: 20 }}>
              <Outlet />
            </Layout>
          </Layout>
        </Layout>
      )
}

export default Home;