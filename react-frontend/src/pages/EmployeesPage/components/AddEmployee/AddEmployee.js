import "./AddEmployee.css";
import React, {useState} from "react";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {Button, DatePicker, Form, Input, message, Modal, Upload} from "antd";
import axios from 'axios';

function AddEmployee() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    let formData= new FormData();
    const showPopUp = () => {
        setVisible(true);
    };

    const addEmployee = async (employeeData,formData) => {
        setConfirmLoading(true);

        // Make a POST request to add a new employee
        axios.post('http://localhost:8888/EMPLOYEE-SERVICE/employees',employeeData, formData)
            .then((response) => {
                setConfirmLoading(false);
                message.success('Employee added successfully!');
                form.resetFields();
                onCancel();
            })
            .catch((error) => {
                setConfirmLoading(false);
                message.error('Failed to add employee. Please try again.');
                console.error('Error adding employee:', error);
            });
    };
    const handleOk = () => {
        form.validateFields().then((employeeData) => {
            addEmployee(employeeData);
        });
    };

    const onCancel = () => {
            setVisible(false);
            form.resetFields();
            setFileList([]);
    };

    const onFileChange = (e) => {
        console.log(e.target.files[0])
        if (e.target && e.target.files[0]){
            formData.append('file',e.target.files[0])
        }
    };

    return (
        <>
        <div className="add-employee position-absolute end-0 ">
            <Button className="addButton"
                    onClick={showPopUp}
                    icon={<PlusOutlined />} >
                       New employee
            </Button>
        </div>
        <Modal
            title="Add new employee"
            centered
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width="1000px"
            confirmLoading={confirmLoading}
        >
            <Form
                form={form}
                layout="vertical"
                name="control-ref"
                className="new-employee"
            >

                <div className="row">
                    <div className="col-md-6">
                        <Form.Item
                            label="Full name"
                            name="nomComplet"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the full name!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter the full name" />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the email!",
                                },
                            ]}
                        >
                            <Input placeholder="example@example.com"  />
                        </Form.Item>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <Form.Item
                            label="Date of birth"
                            name="dateDeNaissance"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the date of birth !',
                                },
                            ]}
                        >
                            <Input  placeholder="dd/MM/yyyy"/>
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                <Form.Item
                    label="CNE"
                    name="cne"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the CNE!',
                        },
                    ]}
                >
                    <Input  placeholder="Enter the CNE"/>
                </Form.Item>
                        </div>
                    </div>

                <div className="row">
                    <div className="col-md-6">
                <Form.Item
                    label="Address"
                    name="adresse"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the address!',
                        },
                    ]}
                >
                    <Input placeholder="Enter the address" />
                </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item
                            label="Phone number"
                            name="tel"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the phone number!',
                                },
                            ]}
                        >
                            <Input  placeholder="e.g. 123-456-7890" />
                        </Form.Item>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                <Form.Item
                    label="Position held"
                    name="positionHeld"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the position !',
                        },
                    ]}
                >
                    <Input  placeholder="Enter the employee's position"/>
                </Form.Item>
                            </div>
                    <div className="col-md-6">
                        <Form.Item
                            label="Hiring date"
                            name="dateEmbauche"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your hiring date !',
                                },
                            ]}
                        >
                            <Input  placeholder="dd/MM/yyyy"/>
                        </Form.Item>
                    </div>
                </div>

                <div className="upload">
                    <Form.Item
                        name="contract"
                        label="Add the contact"
                        rules={[{ required: true, message: 'Please upload the internship agreement' }]}
                    >
                      <input type="file"  name="contract" onChange={onFileChange}/>
                    </Form.Item>
                </div>

            </Form>
        </Modal>
      </>
    );
};

export default AddEmployee;
