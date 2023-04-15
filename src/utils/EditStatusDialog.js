import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import { Button } from "antd";

const EditStatusDialog = ({ open, handleClose, setTaskList, id, taskList }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const taskToEdit = taskList.find((task) => task.id === id);
    setStatus(taskToEdit.status);
  }, [id, open, taskList]);

  const handleSubmit = (event) => {
    const newList = taskList.map((item) => {
      if (item.id === id) {
        item.status = status;
      }
      return item;
    });

    setTaskList(newList);
    handleClose();
    Swal.fire("Done", "Status Edit successfully!", "success");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Status.</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <div style={{ width: "300px", height:"100px" }}>
          <InputLabel
            id="demo-simple-select-standard-label"
            style={{ marginTop: "10px" }}
          >
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Age"
            variant="standard"
            fullWidth
          >
            <MenuItem value="OPEN">OPEN</MenuItem>
            <MenuItem value="WORKING">WORKING</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
            <MenuItem value="OVERDUE">OVERDUE</MenuItem>
          </Select>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="primary" onClick={handleSubmit}>Update Status</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStatusDialog;
