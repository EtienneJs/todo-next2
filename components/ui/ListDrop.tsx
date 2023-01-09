import { Card, CardActionArea, CardContent } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const ListDrop = () => {
  return (
    <>
      <Card
        sx={{
          transition: "all 1s",
          backgroundColor: "rgba(81, 72, 72, 0.4)",
          border: "1px dashed white",
        }}
      >
        <CardActionArea>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AddCircleOutlineIcon sx={{ width: "100px", height: "100px" }} />
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
