import "./InternsTable.css";
import React, {useEffect, useState} from "react";
import {Button, message, Popconfirm, Table} from "antd";
import SearchBarComponent from "../../../../components/SearchBarComponent/SearchBarComponent";
import axios from "axios";

function InternsTable () {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [totalInterns, setTotalInterns] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [interns, setInterns] = useState([]);


    useEffect(() => {
        // Fetch employees data from the backend API using Axios
        fetchInterns().then(r => 'ERROR!');
    }, []);
    const fetchInterns = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8888/STAGIAIRE-SERVICE/stagiaires");
            const data = response.data; // Assuming the API response has the list of interns in the 'data' property
            setInterns(data);
            setTotalInterns(data.length);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching interns:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Make a DELETE request to the backend to delete the employee
            await axios.delete(`http://localhost:8888/STAGIAIRE-SERVICE/stagiaires/${id}`);
            setInterns((prevDataSource) =>
                prevDataSource.filter((record) => record.key !== id)
            );
            message.success('Intern deleted successfully!');
            console.log("Deleting intern with key:", id);
        } catch (error) {
            console.error("Error deleting intern:", error);
        }
    };
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'nom',
            key: 'nom',
        },
        {
            title: 'Birthday Date',
            dataIndex: 'dateDeNaissance',
            key: 'dateDeNaissance',
        },
        {
            title: 'Address',
            dataIndex: 'adresse',
            key: 'adresse',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'University name',
            dataIndex: 'nomUniversite',
            key: 'nomUniversite',
        },
        {
            title: 'University level',
            dataIndex: 'niveauUniv',
            key: 'niveauUniv',
        },
        {
            title: 'CNE',
            dataIndex: 'CNE',
            key: 'CNE',
        },
        {
            title: 'Internship period',
            dataIndex: 'durationStage',
            key: 'durationStage',
        },
        {
            title: 'Internship Agreement',
            dataIndex: 'conventionStage',
            key: 'conventionStage',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: 90,
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title={`Are you sure you want to delete intern ${record.nom}?`}
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

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        // Filter the dataSource based on the search term
        const filteredData = searchTerm
            ? interns.filter((intern) =>
                intern.nom.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : interns;

        setTotalInterns(filteredData.length);
        setInterns(filteredData);

        // Make API request to fetch filtered data from the backend
        axios.get("http://localhost:8888/STAGIAIRE-SERVICE/stagiares", {
            params: {
                searchTerm: filteredData
            }
        })
            .then((response) => {
                const filteredDataFromAPI = response.data;
                setInterns(filteredDataFromAPI);
                setTotalInterns(filteredDataFromAPI.length);
            })
            .catch((error) => {
                console.error("Error fetching filtered data:", error);
            });

    };

    const handleClear = () => {
        setSearchTerm("");
        fetchInterns().then(r => 'ERROR');
    };

    return (
        <>
            <h2>Interns</h2>
            <SearchBarComponent placeholder="Search for an intern..."
                                searchTerm={searchTerm}
                                onSearch={handleSearch}
                                onClear={handleClear}
            />
            <div className="table position-absolute end-0">
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={interns}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalInterns,
                        onChange: handlePageChange,
                        showSizeChanger: true, // To enable page size selection
                        pageSizeOptions: ['4', '8', '12'], // Available page sizes
                    }}
                />
            </div>
        </>
    );
};

export default InternsTable;
