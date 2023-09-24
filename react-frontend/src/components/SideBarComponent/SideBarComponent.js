import React, {useState} from 'react';
import "./SideBarComponent.css";
import {
    ArrowLeftOutlined, ArrowRightOutlined,
    DollarOutlined,
    FolderOpenOutlined,
    ScheduleOutlined,
    TeamOutlined
} from "@ant-design/icons";
import {Button, Menu} from "antd";
import {FaUserGraduate} from "react-icons/fa";
import privateRoutes from "../../privateRoutes";

function getItem(label, key, icon,path) {
    return {
        key,
        icon,
        label,
        path
    };
}
const MenuItems = [
    getItem('Employees', '1', <TeamOutlined />,privateRoutes.employees.path),
    getItem('Interns','2',<FaUserGraduate />,privateRoutes.interns.path),
    getItem('Holidays & Absences','3',<ScheduleOutlined />,privateRoutes.absences.path),
    getItem('Loan Management','4',<DollarOutlined />,privateRoutes.loanManagement.path),
    getItem('Documents','5',<FolderOpenOutlined />,privateRoutes.documents.path)
];
function SideBarComponent({ defaultSelectedKeys }) {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuClick = ({ key }) => {
        setSelectedKeys([key]);
    };
    return (
        <div className="sidebar-container">
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <Menu
                    mode="inline"
                    inlineCollapsed={collapsed}
                    selectedKeys={selectedKeys}
                    onClick={handleMenuClick}
                >
                    {MenuItems.map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <a href={item.path} className="menu-link">{item.label}</a>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
            <Button
                onClick={toggleCollapsed}
                className={`collapse-button ${collapsed ? 'collapsed' : ''}`}
            >
                {collapsed ?  <ArrowRightOutlined /> : <ArrowLeftOutlined />}
            </Button>
        </div>
    );
}
export default SideBarComponent;