import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
function AddLoan() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [etatPretEnums, setEtatPretEnums] = useState([]);
    const [loading, setLoading] = useState(true);
    const showPopUp = () => {
        setVisible(true);
    };

    useEffect(() => {
        const fetchEnums = async () => {
            try {
                const response = await axios.get('http://localhost:8888/PRET-SERVICE/etat-pret');
                setEtatPretEnums(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching enums:", error);
                setLoading(false);
            }
        };
        // Invoke the inner function
        fetchEnums();
    }, []);
    const addLoan = async (loanData) => {
        setConfirmLoading(true);

        // Make a POST request to add a new employee
        axios.post('http://localhost:8888/PRET-SERVICE/prets',loanData)
            .then((response) => {
                setConfirmLoading(false);
                message.success('Loan request added successfully!');
                form.resetFields();
                onCancel();
            })
            .catch((error) => {
                setConfirmLoading(false);
                message.error('Failed to add loan request. Please try again.');
                console.error('Error adding request:', error);
                form.resetFields();
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    const handleOk = () => {
        form.validateFields().then((loanData) => {
            addLoan(loanData);
        });
    };

    const onCancel = () => {
        setVisible(false);
        form.resetFields();
    };
    return (
        <>
            <div className="add-employee position-absolute end-0 ">
                <Button className="addButton"
                        onClick={showPopUp}
                        icon={<PlusOutlined />} >
                    New request
                </Button>
            </div>
            <Modal
                title="Add new loan request"
                centered
                visible={visible}
                onOk={handleOk}
                onCancel={onCancel}
                width="500px"
                confirmLoading={confirmLoading}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="control-ref"
                >
                    <Form.Item
                        label="Loan amount"
                        name="montant"
                        rules={[
                            {
                                required: true,
                                message: "Please input the Loan amount!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter the Loan amount" />
                    </Form.Item>

                    <Form.Item
                        label="Borrowing date"
                        name="dateEmprunt"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the borrowing date!',
                            },
                        ]}
                    >
                        <Input  placeholder="Enter the borrowing date"/>
                    </Form.Item>

                    <Form.Item
                        label="Reimbursement date"
                        name="dateRembouserment"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Reimbursement date!',
                            },
                        ]}
                    >
                        <Input  placeholder="Enter the Reimbursement date"/>
                    </Form.Item>

                    <Form.Item
                        label="Loan Request Status"
                        name="etatDemandePret"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the loan Request Status!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select an option"
                            allowClear
                        >
                            {etatPretEnums.map((etat) => (
                                <Option key={etat} value={etat}>
                                    {etat}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AddLoan;
