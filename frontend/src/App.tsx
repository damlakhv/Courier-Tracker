import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css';
import {DashboardOutlined, UserOutlined, ShopOutlined, HistoryOutlined, EnvironmentOutlined} from '@ant-design/icons';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Dashboard from './components/Dashboard';
import Couriers from './components/Couriers';
import Stores from './components/Stores';
import StoreVisits from './components/StoreVisits';
import MapView from './components/MapView';

const { Sider, Content } = Layout;

export default function App() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: '/couriers', icon: <UserOutlined />, label: 'Couriers' },
        { key: '/stores', icon: <ShopOutlined />, label: 'Stores' },
        { key: '/visits', icon: <HistoryOutlined />, label: 'Store Visits' },
        { key: '/map', icon: <EnvironmentOutlined />, label: 'Map' }
    ];

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                breakpoint="md"
                collapsedWidth={0}
                width={200}
                style={{ background: 'rgba(74,35,104,0.3)' }}
                trigger={
                    collapsed
                        ? <MenuUnfoldOutlined style={{ fontSize: 18, color: '#8c7fa5' }} />
                        : <MenuFoldOutlined   style={{ fontSize: 18, color: '#8c7fa5' }} />
                }
            >
                <div style={{ height: 48, margin: 40, textAlign: 'center', color: '#fff', fontSize: '1.2rem' }}>
                    Courier Tracking App
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                    style={{ height: 'auto', border: 'none', background: 'transparent' }}
                />
            </Sider>
            <Layout style={{ flex: 1, minHeight: 0 }}>
                <Content style={{
                    margin: 16,
                    padding: 24,
                    background: '#fff',
                    overflow: 'auto',
                    minHeight: 0,
                    height: 'auto'
                }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/couriers" element={<Couriers />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/visits" element={<StoreVisits />} />
                        <Route path="/map" element={<MapView />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}