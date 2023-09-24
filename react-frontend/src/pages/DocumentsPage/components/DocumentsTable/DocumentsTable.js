import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, message, Popconfirm, Table} from "antd";

function DocumentsTable(){
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch employees data from the backend API using Axios
        fetchDocuments().then(r => 'ERROR!');
    }, []);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8888/DOCUMENT-SERVICE/documents");
            const data = response.data; // Assuming the API response has the list of employees in the 'data' property
            setDocuments(data);
            setTotalDocuments(data.length);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };
    const handleDelete =async (id) => {
        try {
            // Make a DELETE request to the backend to delete the employee
            await axios.delete(`http://localhost:8888/DOCUMENT-SERVICE/documents/${id}`);
            setDocuments((prevDataSource) =>
                prevDataSource.filter((record) => record.key !== id)
            );
            message.success('Document request deleted successfully!');
            console.log("Deleting document with key:", id);
        } catch (error) {
            console.error("Error deleting documents:", error);
        }
    };

    const columns = [
        {
            title: 'Document type',
            dataIndex: 'typeDoc',
            key: 'typeDoc',
        },
        {
            title: 'Request date',
            dataIndex: 'dateDemande',
            key: 'dateDemande',
        },
        {
            title: 'Request Document Status',
            dataIndex: 'etatDemandeDocument',
            key: 'etatDemandeDocument',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: 90,
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title={`Are you sure you want to delete document request with Id:${record.id}?`}
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button  className="delete-btn" type="danger">Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };


    return(
        <>
            <h2>Documents</h2>

            <div className="table position-absolute end-0">
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={documents}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalDocuments,
                        onChange: handlePageChange,
                        showSizeChanger: true, // To enable page size selection
                        pageSizeOptions: ['5', '10', '20'], // Available page sizes
                    }}
                />
            </div>
        </>
    );

}
export default DocumentsTable;