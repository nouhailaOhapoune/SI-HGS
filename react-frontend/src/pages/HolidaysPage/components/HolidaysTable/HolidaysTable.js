import React, {useEffect, useState} from "react";
import SearchBarComponent from "../../../../components/SearchBarComponent/SearchBarComponent";
import {Button, message, Popconfirm, Table} from "antd";
import axios from "axios";

function HolidaysTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalConges, setTotalConges] = useState(0);
    const [conges, setConges] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch employees data from the backend API using Axios
        fetchConges().then(r => 'ERROR!');
    }, []);

    const fetchConges = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8888/CONGE-SERVICE/conges");
            const data = response.data; // Assuming the API response has the list of employees in the 'data' property
            setConges(data);
            setTotalConges(data.length);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching holidays:", error);
        }
    };

    const handleDelete =async (id) => {
        try {
            // Make a DELETE request to the backend to delete the employee
            await axios.delete(`http://localhost:8888/CONGE-SERVICE/conges/${id}`);
            setConges((prevDataSource) =>
                prevDataSource.filter((record) => record.key !== id)
            );

            message.success('Holiday request deleted successfully!');
            console.log("Deleting holiday with key:", id);
        } catch (error) {
            console.error("Error deleting holiday:", error);
        }
    };
    const columns = [
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
        },
        {
            title: 'Type of leave',
            dataIndex: 'leaveType',
            key: 'leaveType',
        },
        {
            title: 'Leave period',
            dataIndex: 'dureeConge',
            key: 'dureeConge',
        },
        {
            title: 'Request status',
            dataIndex: 'etatDemandeConge',
            key: 'etatDemandeConge',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: 90,
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title={`Are you sure you want to delete the holiday request of  ${record.employeeName}?`}
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
            ? conges.filter((conge) =>
                conge.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                conge.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : conges;

        setTotalConges(filteredData.length);
        setConges(filteredData);
        // Make API request to fetch filtered data from the backend
        axios.get("http://localhost:8888/CONGE-SERVICE/conges", {
            params: {
                searchTerm: filteredData
            }
        })
            .then((response) => {
                const filteredDataFromAPI = response.data;
                setConges(filteredDataFromAPI);
                setTotalConges(filteredDataFromAPI.length);
            })
            .catch((error) => {
                console.error("Error fetching filtered data:", error);
            });
    };

    const handleClear = () => {
        setSearchTerm("");
        fetchConges().then(r => 'ERROR');
    };



    return (
      <>
          <h2>Holidays & Absences</h2>
          <SearchBarComponent placeholder="Search for a employee or absence type..."
                              searchTerm={searchTerm}
                              onSearch={handleSearch}
                              onClear={handleClear}
          />
          <div className="table position-absolute end-0">
              <Table
                  loading={loading}
                  columns={columns}
                  dataSource={conges}
                  pagination={{
                      current: currentPage,
                      pageSize: pageSize,
                      total: totalConges,
                      onChange: handlePageChange,
                      showSizeChanger: true, // To enable page size selection
                      pageSizeOptions: ['5', '10', '20'], // Available page sizes
                  }}
              />
          </div>
      </>
  );
};

export default HolidaysTable;
