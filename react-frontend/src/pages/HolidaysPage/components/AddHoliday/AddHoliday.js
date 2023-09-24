import React, {useEffect, useState} from "react";
import {AutoComplete, Button, Form, Input, message, Modal, Select} from "antd";
import axios from "axios";
import {PlusOutlined} from "@ant-design/icons";

const { Option } = Select;
function AddHoliday() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [etatCongeEnums, setEtatCongeEnums] = useState([]);
    const [typeCongeEnums, setTypeCongeEnums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [formData, setFormData] = useState({
        employeeId: ''
    });

    useEffect(() => {
        const fetchEnums = async () => {
            try {
                const response1 = await axios.get('http://localhost:8888/CONGE-SERVICE/etat-conge');
                const response2 = await axios.get('http://localhost:8888/CONGE-SERVICE/type-conge');
                setEtatCongeEnums(response1.data);
                setTypeCongeEnums(response2.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching enums:", error);
                setLoading(false);
            }
        };
        // Invoke the inner function
        fetchEnums();
    }, []);

    const getEmployeeIdByName = async (nomComplet) => {
        try {
            // Request employee data by name
            const response = await axios.get(`http://localhost:8888/EMPLOYEE-SERVICE/employees`, {
                params: { nomComplet: nomComplet }
            });

            if (response.data && response.data.length > 0) {
                // If matching employee is found, return the ID
                return response.data[0].id;
            } else {
                // If no employee is found, return null or some indication
                return message.error("employee doesn't exist");
            }
        } catch (error) {
            console.error("Error fetching employee by name:", error);
            return null;
        }
    };

    const onSearch = async (searchText) => {
        setInputValue(searchText);
        if (searchText) {
            try {
                const response = await axios.get('http://localhost:8888/EMPLOYEE-SERVICE/employees', {
                    params: { name: searchText } // assuming the API accepts a 'name' query parameter
                });
                const names = response.data.map(emp => emp.nomComplet);
                setOptions(names);
            } catch (error) {
                console.error("Error fetching employee names:", error);
            }
        } else {
            setOptions([]);
        }
    };



    const handleEmployeeNameChange = async (selectedName) => {
        setInputValue(selectedName);
        console.log(selectedName);
        console.log(inputValue);
        form.setFieldsValue({ employeeName: selectedName });

        const employeeId = await getEmployeeIdByName(selectedName);
        if (employeeId) {
            setFormData({
                employeeId: employeeId
            });
            console.log(employeeId);
        } else {
            // Handle the case where no matching employee is found
            setFormData({
                // Keeping the employeeId unchanged or setting it to null
                employeeId: null
            });
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }
    const showPopUp = () => {
        setVisible(true);
    };


    const addHoliday= async (dataToSend) => {
        setConfirmLoading(true);
        axios.post('http://localhost:8888/CONGE-SERVICE/conges',dataToSend)
            .then((response) => {
                setConfirmLoading(false);
                message.success('Holiday added successfully!');
                form.resetFields();
                onCancel();
            })
            .catch((error) => {
                setConfirmLoading(false);
                message.error('Failed to add holiday. Please try again.');
                console.error('Error adding holiday:', error);
                form.resetFields();
            });
    };

    const handleOk = () => {
        form.validateFields().then((holidayData) => {
            console.log(holidayData);
            const combinedData = {
                ...holidayData,
                employeeId: formData.employeeId,
            };
            addHoliday(combinedData);
        }).catch((errorInfo) => {
            console.error("Validation failed:", errorInfo);
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
            title="Add new absence request"
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
                            label="Employee name"
                            name="employeeName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the employee name!",
                                },
                            ]}
                        >
                            <AutoComplete
                                options={options.map(option => ({ value: option }))}
                                onSearch={onSearch}
                                placeholder="Enter the employee name"
                                value={inputValue}
                                onChange={handleEmployeeNameChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Type of leave"
                            name="leaveType"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the type of absence!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select an option"
                                allowClear
                            >
                                {typeCongeEnums.map((leaveType) => (
                                    <Option key={leaveType} value={leaveType}>
                                        {leaveType}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Leave period"
                            name="dureeConge"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the leave period !',
                                },
                            ]}
                        >
                            <Input  placeholder="Enter the leave period"/>
                        </Form.Item>

                        <Form.Item
                            label="Request status"
                            name="etatDemandeConge"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the request status!',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select an option"
                                allowClear
                            >
                                {etatCongeEnums.map((etat) => (
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
};

export default AddHoliday;
