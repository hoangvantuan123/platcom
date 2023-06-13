import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Form, Radio, Space, Switch, Table } from "antd";

const { ColumnsType } = Table;

const DataTable_UI = () => {
  const [bordered, setBordered] = useState(true);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("middle");
  const [expandable, setExpandable] = useState({
    expandedRowRender: (record) => <p>{record?.description}</p>,
  });

  const [showTitle, setShowTitle] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomCenter");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(undefined);

  const handleBorderChange = (enable) => {
    setBordered(enable);
  };

  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleTableLayoutChange = (e) => {
    setTableLayout(e.target.value);
  };

  const handleExpandChange = (enable) => {
    setExpandable(
      enable
        ? { expandedRowRender: (record) => <p>{record?.description}</p> }
        : undefined
    );
  };
  console.log(expandable);

  const handleEllipsisChange = (enable) => {
    setEllipsis(enable);
  };

  const handleTitleChange = (enable) => {
    setShowTitle(enable);
  };

  const handleHeaderChange = (enable) => {
    setShowHeader(enable);
  };

  const handleFooterChange = (enable) => {
    setShowFooter(enable);
  };

  const handleRowSelectionChange = (enable) => {
    setRowSelection(enable ? {} : undefined);
  };

  const handleYScrollChange = (enable) => {
    setYScroll(enable);
  };

  const handleXScrollChange = (e) => {
    setXScroll(e.target.value);
  };

  const handleDataChange = (newHasData) => {
    setHasData(newHasData);
  };

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: () => (
        <Space size="middle">
          <a>Delete</a>
          <a>
            <Space>
              More actions
              <DownOutlined />
            </Space>
          </a>
        </Space>
      ),
    },
  ];

  const data = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      key: i,
      name: "John Brown",
      age: Number(`${i}2`),
      address: `New York No. ${i} Lake Park`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }

  const defaultTitle = () => "Here is title";
  const defaultFooter = () => "Here is footer";

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }

  const tableProps = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showFooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout,
  };

  return (
    <div className="ml-64 p-2">
  
      <Table
        {...tableProps}
        pagination={{ position: [top, bottom] }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
      />
    </div>
  );
};

export default DataTable_UI;
