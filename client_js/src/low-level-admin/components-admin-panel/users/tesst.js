import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, selectData } from "../../../slices/dataSlice";
import { Checkbox, Badge, Dropdown, Space, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Header_Users from "./header";
import ViewUserAccount from "./viewUserAccount";

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

export default function Users() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authAdmin.token);
  const data = useSelector(selectData);
  const { loading, error } = useSelector((state) => state.data);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandedData, setExpandedData] = useState({});
  const [userState, setUserState] = useState(null);
  
  useEffect(() => {
    if (token) {
      dispatch(fetchData(token));
    }
  }, [dispatch]);

 
  useEffect(() => {
    if (data) {
      setUserState(data.app_useraccount); // Gán giá trị data vào userState
    }
  }, [data]);

  console.log("userstae", userState);

  useEffect(() => {
    if (data && data.length > 0) {
      if (isSelectAll) {
        const allRowKeys = data.map((record) => record.id);
        setSelectedRowKeys(allRowKeys);
      } else {
        setSelectedRowKeys([]);
      }
    }
  }, [isSelectAll, data]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  ////////
  /// Dùng để hiển thị bảng  expandedColumns
  const handleRowSelectionData = (record) => {
    if (expandedData[record.id]) {
      const updatedExpandedData = { ...expandedData };
      delete updatedExpandedData[record.id];
      setExpandedData(updatedExpandedData);
    } else {
      setExpandedData({ ...expandedData, [record.id]: true });
    }
  };

  const expandedRowRender = (record) => {
    if (expandedData[record.id]) {
      return (
        <Table
          columns={expandedColumns}
          dataSource={[record]}
          pagination={false}
        />
      );
    }
    return null;
  };

  ////////////////////////////
  /*   useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]); */

  // Lựa chọn tất cả các ô

  // Hiển  thị toàn bộ ô chọn
  //console.log(selectedRowKeys)

  // Lựa chọn từng ô
  const handleRowSelection = (record) => {
    const selectedKeys = [...selectedRowKeys];
    const index = selectedKeys.indexOf(record.id);

    if (index === -1) {
      selectedKeys.push(record.id);
    } else {
      selectedKeys.splice(index, 1);
    }

    setSelectedRowKeys(selectedKeys);
    console.log(selectedKeys);
  };

  // Dùng để show ra dòng được bấm
  const handleExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRows((prevExpandedRows) => [...prevExpandedRows, record.id]);
    } else {
      setExpandedRows((prevExpandedRows) =>
        prevExpandedRows.filter((rowId) => rowId !== record.id)
      );
    }
  };

  const handleSelectAll = (e) => {
    setIsSelectAll(e.target.checked);
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedRowKeys.length === data?.length}
          indeterminate={
            selectedRowKeys.length > 0 &&
            selectedRowKeys.length < (data?.length || 0)
          }
          onChange={handleSelectAll}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={() => handleRowSelection(record)}
        />
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    { title: "Phone", dataIndex: "phone_number", key: "phone_number" },
    {
      title: "Memory Status",
      dataIndex: "memory_status",
      key: "memory_status",
    },
    {
      title: "Action",
      dataIndex: "user_status",
      key: "user_status",
      render: (text, record) => (
        <Badge status="success" text={record.user_status} />
      ),
    },
  ];

  const expandedColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },

    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Action",
      key: "operation",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleRowSelection(record)}>Publish</a>
          <a>Pause</a>
          <a>Stop</a>
          <Dropdown menu={{ items }}>
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];
  return (
    <div className="ml-64 p-4">
      <Header_Users />

      <Table
        className="mt-4"
        columns={columns}
        rowKey="id"
        expandedRowRender={expandedRowRender}
        onExpand={(_, record) => handleRowSelectionData(record)}
        dataSource={data}
        size="middle"
      />
    </div>
  );
}
