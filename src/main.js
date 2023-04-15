import { Button } from "antd";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Dialog from "./utils/Dialog";
import { ProTable } from "@ant-design/pro-components";
import { Tag } from "antd";
import EditStatusDialog from "./utils/EditStatusDialog";
import EditTaskDialog from "./utils/EditTaskDialog";
import {
  ClockCircleOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [temp] = useState(
    JSON.parse(localStorage.getItem("todo"))?.array
      ? JSON.parse(localStorage.getItem("todo")).array
      : []
  );
  const [taskList, setTaskList] = useState(temp);
  const [openStatusEdit, setOpenStatusEdit] = useState(false);
  const [openTaskEdit, setOpenTaskEdit] = useState(false);
  const [id, setId] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({});

  useEffect(() => {
    const setLocal = taskList;
    localStorage.setItem("todo", JSON.stringify({ array: setLocal }));
  }, [taskList]);

  const handleTaskEdit = (id) => {
    const itemToEditElemnt = taskList.find((item) => item.id === id);

    setId(id);
    setOpenTaskEdit(true);
    setItemToEdit(itemToEditElemnt);
  };


  const handleStatusEdit = (id) => {
    setId(id);
    setOpenStatusEdit(true);
  };

  const handleSearch = (value) => {
    if (value.length === 0) {
      setSearchResultList([]);
    }
    const filteredData = taskList.filter(
      (entry) =>
        entry.title.toLowerCase().includes(value.toLowerCase()) ||
        entry.description.toLowerCase().includes(value.toLowerCase()) ||
        entry.status.toLowerCase().includes(value.toLowerCase()) ||
        entry.dueDate.includes(value)
    );
    console.log(filteredData);
    console.log(taskList);
    setSearchResultList(filteredData);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredData = taskList.filter((item) => {
          return item.id !== id;
        });
        setTaskList(filteredData);

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const openHandler = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenStatusEdit(false);
    setOpenTaskEdit(false);
  };

  const columns = [
    {
      title: "Created on",
      dataIndex: "created",
      width: 130,
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",

      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "left",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      align: "right",
      width: 130,
      sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: 140,
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag.text.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "status",
      dataIndex: "status",
      align: "right",
      width: 170,
      render: (text) => {
        if (text === "WORKING") {
          return <Button loading={true}>WORKING</Button>;
        }
        if (text === "OVERDUE") {
          return (
            <Button danger icon={<ClockCircleOutlined />}>
              OVERDUE
            </Button>
          );
          // <FolderOpenOutlined />
        }
        if (text === "OPEN") {
          return <Button icon={<FolderOpenOutlined />}>OPEN</Button>;
          //<FileDoneOutlined />
        }
        if (text === "DONE") {
          return (
            <Button type="primary" icon={<FileDoneOutlined />}>
              DONE
            </Button>
          );
        }
      },
      filters: [
        {
          text: "Open",
          value: "OPEN",
        },
        {
          text: "Working",
          value: "WORKING",
        },
        {
          text: "Done",
          value: "DONE",
        },
        {
          text: "Overdue",
          value: "OVERDUE",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
    },

    {
      title: "Actions",
      key: "id",
      dataIndex: "id",
      width: 330,
      render: (_, { id }) => (
        <>
          <Button
            style={{ margin: "4px" }}
            variant="outlined"
            color="error"
            onClick={() => handleDelete(id)}
            type="primary"
            danger
          >
            Delete
          </Button>
          <Button
            type="primary"
            style={{ margin: "4px" }}
            onClick={() => handleTaskEdit(id)}
          >
            Edit Task
          </Button>
          <Button
            type="primary"
            style={{ margin: "4px" }}
            onClick={() => handleStatusEdit(id)}
          >
            Update Status
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          width: "84%",
          margin: "auto",
          padding: "8px",
          paddingTop: "30px",
        }}
      >
        <h2
          style={{
            fontFamily: "Schibsted Grotesk, sans-serif",
            textDecoration: "underline",
          }}
        >
          TO-DO APP
        </h2>
        <ProTable
          columns={columns}
          dataSource={searchResultList.length ? searchResultList : taskList}
          toolbar={{
            search: {
              onSearch: (value) => {
                handleSearch(value);
              },
            },
            actions: [
              <Button key="primary" type="primary" onClick={openHandler}>
                + Add Task
              </Button>,
            ],
          }}
          rowKey="key"
          search={false}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
          }}
        />
        <Dialog
          setTaskList={setTaskList}
          handleClose={handleClose}
          open={open}
        />
        {openStatusEdit && (
          <EditStatusDialog
            open={openStatusEdit}
            handleClose={handleClose}
            taskList={taskList}
            setTaskList={setTaskList}
            id={id}
          />
        )}
        {openTaskEdit && (
          <EditTaskDialog
            open={openTaskEdit}
            handleClose={handleClose}
            taskList={taskList}
            setTaskList={setTaskList}
            itemToEdit={itemToEdit}
            id={id}
          />
        )}
      </div>
      <Footer style={{ textAlign: "center", backgroundColor: "#eafafb" }}>
        TODO ©2023 Created by{" "}
        <a href="https://pathakakash30.github.io/My-Portfolio/">Akash Pathak</a>
        <br />
        Visit Portfolio to know more by clicking "Akash Pathak"
      </Footer>
    </>
  );
};

export default Main;
