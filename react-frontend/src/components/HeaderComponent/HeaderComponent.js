import "./HeaderComponent.css";
import React, {useContext, useEffect, useState} from "react";
import {Avatar, Button, Col, Dropdown, Menu, message, Row} from "antd";
import {LogoutOutlined, MoreOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../pages/LoginPage/UserContext";


function HeaderComponent() {

    const navigate = useNavigate();
    const { nomComplet, jobTitle } = useContext(UserContext);
    console.log(nomComplet);
    const success = () => {
        message.open({
            type: 'success',
            content: 'Log out successful !! ',
        });
    };
    const handleLogout = () => {
        success(); // Call the success function
        setTimeout(() => {
            navigate("/"); // Redirect to login component after 1.5s
        }, 1500);
    };

    const items = [
        {
            label: 'LOG OUT',
            icon: <LogoutOutlined/>,
        }];
    const menuProps = {
        items,
        onClick: handleLogout,
    };

    return (
        <div className="header-container">
            <Row>
                <Col>
                   <Link to="/home"><h1>HGS SYSTEM</h1></Link>
                </Col>
                <Col className="text-end">
                    <Avatar size={43} icon={<UserOutlined/>} style={{backgroundColor: "white", color: "black"}}/>
                </Col>
                <div className="nom">
                    <h6>{nomComplet}</h6>
                    {jobTitle}
                </div>
                <Dropdown menu={menuProps}>
                    <MoreOutlined className="icon"/>
                </Dropdown>
            </Row>
        </div>
    );
};

export default HeaderComponent;
