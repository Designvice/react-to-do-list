import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import CssBaseline from "@mui/material/CssBaseline";

import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    color: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "error", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "primary", "Todo Changed");
    } else {
      showAlert(true, "primary", "Todo Added to the List");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, color = "", msg = "") => {
    setAlert({ show, color, msg });
  };

  const clearList = () => {
    showAlert(true, "error", "empty List");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "primary", "Todo removed Successfully");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "lightblue",
          height: "100vh",
        }}
      >
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <Typography variant='h4' gutterBottom>
          To Do List
        </Typography>
        <Paper
          component='form'
          onSubmit={handleSubmit}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "500px",
          }}
        >
          <InputBase
            value={name}
            type='text'
            onChange={(e) => setName(e.target.value)}
            sx={{ ml: 1, width: "100%", borderRadius: 3 }}
            placeholder='Add To Do'
          ></InputBase>
          <IconButton
            type='submit'
            color='primary'
            sx={{ p: "10px", ml: "auto" }}
          >
            {isEditing ? (
              <ModeEditOutlineIcon fontSize='large' />
            ) : (
              <AddBoxIcon fontSize='large' />
            )}
          </IconButton>
        </Paper>
        {list.length > 0 && (
          <Box
            component='div'
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <Button variant='contained' onClick={clearList} sx={{ my: 4 }}>
              Clear Todos
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default App;
