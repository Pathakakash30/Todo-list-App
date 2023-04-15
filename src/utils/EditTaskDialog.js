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
import { Button } from "antd";
import { titleValidate, descriptionValidate } from "./Validator";

import TagMaker from "../Tags/TagComponent";

const EditTaskDialog = ({
  open,
  handleClose,
  setTaskList,
  id,
  taskList,
  itemToEdit,
}) => {
  const [title, setTitle] = useState(itemToEdit.title);
  const [description, setDescription] = useState(itemToEdit.description);
  const [status, setStatus] = useState(itemToEdit.status);
  const [dueDate, setDueDate] = useState(itemToEdit.dueDate);
  const [tags, setTags] = useState(itemToEdit.tags);
  const [created, setCreate] = useState(itemToEdit.created);

  const handleSubmit = (event) => {
    const tagsToGo = tags;
    const updatedList = taskList.map((item) => {
      if (item.id === id) {
        item.title = title;
        item.description = description;
        item.status = status;
        item.dueDate = dueDate;
        item.tags = tagsToGo;
      }

      return item;
    });
    setTaskList(updatedList);
    handleClose();
    setTitle("");
    setDescription("");
    setStatus("OPEN");
    setDueDate("");
    setTags("");
    Swal.fire("Added", "New Task added successfully", "success");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Task.</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <div>
          <TextField
            margin="dense"
            id="title"
            label="Enter Title "
            type="text"
            focused
            fullWidth
            variant="standard"
            value={title}
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
            focused
            InputProps={{ inputProps: { min: created } }}
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

          <TagMaker set={setTags} tagsInput={tags} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!(titleValidate(title) && descriptionValidate(description))}
        >
          Update task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
