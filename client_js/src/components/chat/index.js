import React from "react";
import { Container, SimpleGrid, useMantineTheme } from "@mantine/core";
import Grid from "@mui/material/Grid";
import Menu_chat_box1 from "./menu_chat_box1";
import Chat_box2 from "./chat_box2";
const Chat_UI = React.memo(() => {
  return (
    <div className="ml-14 ">
      <Grid container>
        <Grid item xs={2}>
          <div className="h-screen border-e bg-white overflow-auto scrollable-content pl-2 overflow-y-auto scroll-container pt-2">
            <div className="">
              <Menu_chat_box1 />
            </div>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="">
            <div className="">
              <Chat_box2 />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
});

export default Chat_UI;
