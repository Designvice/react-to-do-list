import { Box, IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";

const List = ({ items, removeItem, editItem }) => {
  return (
    <Box component='div'>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <Box
            component='article'
            key={id}
            sx={{
              display: "flex",
              alignItems: "center",
              background: "white",
              width: "500px",
              my: 1,
              p: 1,
              borderRadius: 3,
            }}
          >
            <Typography variant='h5'>{title}</Typography>
            <IconButton
              type='submit'
              color='primary'
              sx={{ p: "10px", ml: "auto" }}
            >
              <ModeEditIcon onClick={() => editItem(id)} fontSize='medium' />

              <DeleteForeverIcon
                onClick={() => removeItem(id)}
                fontSize='medium'
                color='error'
              />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default List;
