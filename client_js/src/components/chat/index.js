import React from "react";
import { Container, SimpleGrid, useMantineTheme } from "@mantine/core";
import Grid from "@mui/material/Grid";
import Menu_chat_box1 from "./menu_chat_box1";
import Chat_box2 from "./chat_box2";
const Chat_UI = React.memo(() => {
  return (
    <div className="ml-10 ">
      <Grid container>
        <Grid item xs={2}>
          <div className="h-screen border-e bg-white overflow-auto scrollable-content px-1 overflow-y-auto scroll-container pt-2">
            <div className="p-2">
              <Menu_chat_box1 />
            </div>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="h-screen overflow-auto scrollable-content px-1 overflow-y-auto scroll-container pt-2">
            <div className="p-2">
              <Chat_box2 />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
});

export default Chat_UI;
