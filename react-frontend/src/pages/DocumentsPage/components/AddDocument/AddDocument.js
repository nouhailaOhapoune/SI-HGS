import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
function AddDocument() {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [etatDocumentEnums, setEtatDocumentEnums] = useState([]);
    const [typeDocumentEnums, setTypeDocumentEnums] = useState([]);

    useEffect(() => {
        const fetchEnums = async () => {
            try {
                const response1 = await axios.get('http://localhost:8888/DOCUMENT-SERVICE/etat-document');
                const response2 = await axios.get('http://localhost:8888/DOCUMENT-SERVICE/type-document');
                setEtatDocumentEnums(response1.data);
                setTypeDocumentEnums(response2.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching enums:", error);
                setLoading(false);
            }
        };
        // Invoke the inner function
        fetchEnums();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const showPopUp = () => {
        setVisible(true);
    };

    const addDocument = async (documentData) => {
        setConfirmLoading(true);

        // Make a POST request to add a new employee
        axios.post('http://localhost:8888/DOCUMENT-SERVICE/documents',documentData)
            .then((response) => {
                setConfirmLoading(false);
                message.success('Document request added successfully!');
                form.resetFields();
                onCancel();
            })
            .catch((error) => {
                setConfirmLoading(false);
                message.error('Failed to add document request. Please try again.');
                console.error('Error adding request:', error);
                form.resetFields();
            });
    };
    const handleOk = () => {
        form.validateFields().then((documentData) => {
            addDocument(documentData);
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
           title="Add new document request"
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
                   label="Document type"
                   name="typeDoc"
                   rules={[
                       {
                           required: true,
                           message: 'Please input the document type!',
                       },
                   ]}
               >
                   <Select
                       placeholder="Select an option"
                       allowClear
                   >
                       {typeDocumentEnums.map((typeDoc) => (
                           <Option key={typeDoc} value={typeDoc}>
                               {typeDoc}
                           </Option>
                       ))}
                   </Select>
               </Form.Item>

               <Form.Item
                   label="Request date"
                   name="dateDemande"
                   rules={[
                       {
                           required: true,
                           message: 'Please input the request date!',
                       },
                   ]}
               >
                   <Input  placeholder="Enter the request date"/>
               </Form.Item>

               <Form.Item
                   label="Request Document Status"
                   name="etatDemandeDocument"
                   rules={[
                       {
                           required: true,
                           message: 'Please input the Request Document Status!',
                       },
                   ]}
               >
                   <Select
                       placeholder="Select an option"
                       allowClear
                   >
                       {etatDocumentEnums.map((etat) => (
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

export default AddDocument;
