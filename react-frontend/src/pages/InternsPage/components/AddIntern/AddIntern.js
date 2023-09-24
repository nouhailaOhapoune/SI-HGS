import "./AddIntern.css";
import React, {useState} from "react";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {Button, DatePicker, Form, Input, message, Modal, Upload} from "antd";
import axios from "axios";

function AddIntern() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [modified, setModified] = useState(false);
    const [visiblePopUp, setVisiblePopUp] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    let formData= new FormData();
    const showPopUp = () => {
        setVisible(true);
    };
    const  addIntern = async (internData,formData) => {
        setConfirmLoading(true);
        axios.post('http://localhost:8888/STAGIAIRE-SERVICE/stagiaires',internData, formData)
            .then((response) => {
                setConfirmLoading(false);
                message.success('Intern added successfully!');
                form.resetFields();
                onCancel();
            })
            .catch((error) => {
                setConfirmLoading(false);
                message.error('Failed to add intern. Please try again.');
                console.error('Error adding intern:', error);
            });
    };

    const handleOk = () => {
        form.validateFields().then((internData) => {
            addIntern(internData);
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
        <div className="add-intern position-absolute end-0 ">
            <Button className="addButton"
                    onClick={showPopUp}
                    icon={<PlusOutlined />} >
                       New intern
            </Button>
        </div>
        <Modal
            title="Add new intern"
            centered
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width="1000px"
        >
            <Form
                form={form}
                layout="vertical"
                name="control-ref"
                className="new-intern"

            >
                <div className="row">
                    <div className="col-md-6">
                        <Form.Item
                            label="Full name"
                            name="nom"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the full name!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter the full name"  />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input placeholder="example@example.com"/>
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
                    <Input placeholder="Enter the CNE" />
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
                    <Input  placeholder="Enter the address"/>
                </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item
                            label="University name"
                            name="nomUniversite"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the name of the university!',
                                },
                            ]}
                        >
                            <Input placeholder="Input the name of the university" />
                        </Form.Item>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <Form.Item
                            label="University level"
                            name="niveauUniv"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the level of the intern',
                                },
                            ]}
                        >
                            <Input placeholder="Input the level of the intern" />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                <Form.Item
                    label="Internship period"
                    name="durationStage"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the period of the intership!',
                        },
                    ]}
                >
                    <Input  placeholder="Input the period of the intership"/>
                </Form.Item>
                    </div>
                </div>

                <div className="upload">
                    <Form.Item
                        name="conventionStage"
                        label="Upload Internship Agreement"
                        rules={[{ required: true, message: 'Please upload the internship agreement' }]}
                    >
                        <input type="file"  name="conventionStage" onChange={onFileChange}/>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
      </>
    );
};

export default AddIntern;
