import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function CountryOptions() {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/hoangvantuan123/country_all/main/index.json"
        );
        const jsonData = await response.json();
        setData(jsonData);

        // Tìm quốc gia Việt Nam từ dữ liệu và thiết lập giá trị mặc định
        const defaultOption = jsonData.find(
          (option) => option.name === "Vietnam"
        );
        setSelectedCountry(defaultOption);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    // Thực hiện xử lý khi người dùng chọn quốc gia
    // console.log("Selected Country:", selectedOption);
  };
  const formatOptionLabel = ({ name, emoji }) => (
    <div>
      <span>{name}</span> {emoji}
    </div>
  );

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      height: "46px",
      borderColor: "#EFF0F3",
    }),
  };
  return (
    <Select
      options={data}
      value={selectedCountry}
      onChange={handleSelectChange}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.code}
      formatOptionLabel={formatOptionLabel}
      styles={customStyles}
    />
  );
}
