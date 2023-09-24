import "./SearchBarComponent.css";
import React, {useState} from "react";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";

const SearchBarComponent= ({ onSearch,searchTerm,placeholder,onClear }) => {
    // const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        onSearch(event.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
        onSearch(searchTerm);
    };


    const handleClear = () => {
        onClear();
    };


    const inputStyle={
        width: '300px',
        paddingRight: "2.5rem", // Adjust the padding on the right to make space for the icon
        borderRadius: '5px 0 0 5px',
    };
  return (
    <div className="search-bar-component">
        <input
            type="text"
            style={inputStyle}
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            />
           <span className="clear-icon" >
              {searchTerm && (
                  <CloseOutlined onClick={handleClear}/>
              )}
           </span>

        <button className="srch" onClick={handleSearch}>
            <SearchOutlined />
        </button>
    </div>
  );
};

export default SearchBarComponent;
