import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, message, Popconfirm, Table} from "antd";
import SearchBarComponent from "../../../../components/SearchBarComponent/SearchBarComponent";

function LoanTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalLoans, setTotalLoans] = useState(0);
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch employees data from the backend API using Axios
        fetchLoans().then(r => 'ERROR!');
    }, []);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8888/PRET-SERVICE/prets");
            const data = response.data; // Assuming the API response has the list of employees in the 'data' property
            setLoans(data);
            setTotalLoans(data.length);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching loans:", error);
        }
    };

    const handleDelete =async (id) => {
        try {
            // Make a DELETE request to the backend to delete the employee
            await axios.delete(`http://localhost:8888/PRET-SERVICE/prets/${id}`);
            setLoans((prevDataSource) =>
                prevDataSource.filter((record) => record.key !== id)
            );
            message.success('Loan request deleted successfully!');
            console.log("Deleting loan with key:", id);
        } catch (error) {
            console.error("Error deleting loans:", error);
        }
    };

    const columns = [
        {
            title: 'Loan amount',
            dataIndex: 'montant',
            key: 'montant',
        },
        {
            title: 'Borrowing date',
            dataIndex: 'dateEmprunt',
            key: 'dateEmprunt',
        },
        {
            title: 'Reimbursement date',
            dataIndex: 'dateRembouserment',
            key: 'dateRembouserment',
        },
        {
            title: 'Loan Request Status',
            dataIndex: 'etatDemandePret',
            key: 'etatDemandePret',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: 90,
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title={`Are you sure you want to delete loan request with Id:${record.id}?`}
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button  className="delete-btn" type="danger">Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const searchedValue = parseFloat(searchTerm);
        // Filter the dataSource based on the search term
        const filteredData = loans.filter((loan) => loan.montant === searchedValue);

        setTotalLoans(filteredData.length);
        setLoans(filteredData);
        // Make API request to fetch filtered data from the backend
        axios.get("http://localhost:8888/PRET-SERVICE/prets", {
            params: {
                searchTerm: filteredData
            }
        })
            .then((response) => {
                const filteredDataFromAPI = response.data;
                setLoans(filteredDataFromAPI);
                setTotalLoans(filteredDataFromAPI.length);
            })
            .catch((error) => {
                console.error("Error fetching filtered data:", error);
            });
    };

    const handleClear = () => {
        setSearchTerm("");
        fetchLoans().then(r => 'ERROR');
    };


    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
      <>
          <h2>Loan Management</h2>
          <SearchBarComponent placeholder="Search for a loan amount ..."
                              searchTerm={searchTerm}
                              onSearch={handleSearch}
                              onClear={handleClear}
          />
          <div className="table position-absolute end-0">
              <Table
                  loading={loading}
                  columns={columns}
                  dataSource={loans}
                  pagination={{
                      current: currentPage,
                      pageSize: pageSize,
                      total: totalLoans,
                      onChange: handlePageChange,
                      showSizeChanger: true, // To enable page size selection
                      pageSizeOptions: ['5', '10', '20'], // Available page sizes
                  }}
              />
          </div>
      </>
  );
};

export default LoanTable;
