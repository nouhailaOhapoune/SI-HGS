import "./EmployeesTable.css";
import React, {useEffect, useState} from "react";
import {Button, message, Popconfirm, Table} from "antd";
import SearchBarComponent from "../../../../components/SearchBarComponent/SearchBarComponent";
import axios from "axios";


const EmployeesTable = ({dataSource}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch employees data from the backend API using Axios
        fetchEmployees().then(r => 'ERROR!');
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8888/EMPLOYEE-SERVICE/employees");
            const data = response.data; // Assuming the API response has the list of employees in the 'data' property
            setEmployees(data);
            setTotalEmployees(data.length);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleDelete =async (id) => {
        try {
            // Make a DELETE request to the backend to delete the employee
            await axios.delete(`http://localhost:8888/EMPLOYEE-SERVICE/employees/${id}`);
            setEmployees((prevDataSource) =>
                prevDataSource.filter((record) => record.key !== id)
            );
            message.success('Employee deleted successfully!');
            console.log("Deleting employee with key:", id);
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'nomComplet',
            key: 'nomComplet',
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
            title: 'Phone Number',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: 'Position Held',
            dataIndex: 'positionHeld',
            key: 'positionHeld',
        },
        {
            title: 'CNE',
            dataIndex: 'cne',
            key: 'cne',
        },
        {
            title: 'Hiring Date',
            dataIndex: 'dateEmbauche',
            key: 'dateEmbauche',
        },
        {
            title: 'Contract',
            dataIndex: 'contract',
            key: 'contract',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: 90,
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title={`Are you sure you want to delete employee ${record.nomComplet}?`}
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
            ? employees.filter((employee) =>
                employee.nomComplet.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : employees;

        setTotalEmployees(filteredData.length);
        setEmployees(filteredData);
        // Make API request to fetch filtered data from the backend
        axios.get("http://localhost:8888/EMPLOYEE-SERVICE/employees", {
            params: {
                searchTerm: filteredData
            }
        })
            .then((response) => {
                const filteredDataFromAPI = response.data;
                setEmployees(filteredDataFromAPI);
                setTotalEmployees(filteredDataFromAPI.length);
            })
            .catch((error) => {
                console.error("Error fetching filtered data:", error);
            });
    };

    const handleClear = () => {
        setSearchTerm("");
        fetchEmployees().then(r => 'ERROR');
    };


  return (
      <>
          <h2>Employees</h2>
          <SearchBarComponent placeholder="Search for an employee..."
                              searchTerm={searchTerm}
                              onSearch={handleSearch}
                              onClear={handleClear}
          />
          <div className="table position-absolute end-0">
              <Table
                  loading={loading}
                  columns={columns}
                  dataSource={employees}
                  pagination={{
                      current: currentPage,
                      pageSize: pageSize,
                      total: totalEmployees,
                      onChange: handlePageChange,
                      showSizeChanger: true, // To enable page size selection
                      pageSizeOptions: ['5', '10', '20'], // Available page sizes
                  }}
              />
          </div>
      </>
  );
};

export default EmployeesTable;
