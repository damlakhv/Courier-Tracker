import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css';
import {
    DashboardOutlined,
    UserOutlined,
    ShopOutlined,
    HistoryOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Couriers from './components/Couriers';
import Stores from './components/Stores';
import StoreVisits from './components/StoreVisits';
import MapView from './components/MapView';

const { Sider, Content } = Layout;

const menuItems = [
    { key: '/',         icon: <DashboardOutlined />,  label: 'Dashboard' },
    { key: '/couriers', icon: <UserOutlined />,       label: 'Couriers' },
    { key: '/stores',   icon: <ShopOutlined />,       label: 'Stores' },
    { key: '/visits',   icon: <HistoryOutlined />,    label: 'Store Visits' },
    { key: '/map',      icon: <EnvironmentOutlined />,label: 'Map' },
];

export default function App() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible
                   style={{ background: 'rgba(74,35,104,0.3)' }}
                   >
                <div style={{ height: 32, margin: 16, background: 'rgba(74,35,104,0)'
                                , display:'flex', alignItems: 'center',  justifyContent: 'center',
                    fontSize: 'x-large'
                }}> My App </div>
                <Menu

                    style={{ background: 'rgba(63,75,128,0)' }}
                    mode="inline"
                    selectedKeys={[pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>

            <Layout>
                <Content style={{ margin: 16, padding: 24, background: '#fff' }}>
                    <Routes>
                        <Route path="/"        element={<Dashboard />} />
                        <Route path="/couriers" element={<Couriers />} />
                        <Route path="/stores"   element={<Stores />} />
                        <Route path="/visits"   element={<StoreVisits />} />
                        <Route path="/map"      element={<MapView />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}
