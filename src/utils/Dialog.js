import Swal from "sweetalert2";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import uuid4 from "uuid4";
import { Button } from "antd";
import { titleValidate, descriptionValidate } from "./Validator";

import TagMaker from "../Tags/TagComponent";

const DialogComponent = ({ open, handleClose, setTaskList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("OPEN");
  const [dueDate, setDueDate] = useState("");

  const [tags, setTags] = useState([]);
  let currentDate = new Date().toJSON().slice(0, 10);

  const handleSubmit = (event) => {
    const addObject = {
      id: uuid4(),
      created: currentDate,
      title,
      description,
      status,
      dueDate,
      currentDate,
      tags,
    };
    setTaskList((prev) => [...prev, addObject]);
    handleClose();
    setTitle("");
    setDescription("");
    setStatus("OPEN");
    setDueDate("");
    setTags([]);
    Swal.fire("Added", "New Task added successfully", "success");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Task.</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <div>
          <TextField
            margin="dense"
            id="title"
            label="Enter Title "
            type="text"
            fullWidth
            variant="standard"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Enter Description "
            type="text"
            fullWidth
            variant="standard"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            style={{ marginTop: "15px" }}
            margin="dense"
            id="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            variant="standard"
            InputProps={{ inputProps: { min: currentDate } }}
            focused
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

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
            required
          >
            <MenuItem value="OPEN">OPEN</MenuItem>
            <MenuItem value="WORKING">WORKING</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
            <MenuItem value="OVERDUE">OVERDUE</MenuItem>
          </Select>

          <TagMaker set={setTags} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!(titleValidate(title) && descriptionValidate(description))}
        >
          Add task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
