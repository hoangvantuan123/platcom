import React, { useState, useEffect } from "react";
import {
  fetchDataUserNumbers,
  selectData,
} from "../../slices/userNumberSlice";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Menu_chat_box1 from "./menu_chat_box1";
import Chat_box2 from "./chat_box2";

const ChatUI = React.memo(() => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authUser.token);
  const data = useSelector(selectData);
  const [userState, setUserState] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [items, setItems] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchDataUserNumbers(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (data) {
      setUserState(data.app_useraccount);
    }
  }, [data]);

  useEffect(() => {
    const newItems = [
      { type: "divider" },
      {
        key: "sub1",
        add_children: "",
        label: "Starred",
        children: [
          {
            key: "g1",
            label: "Item 1",
            type: "group",
            iconStatus: "#",
          },
          {
            key: "g2",
            label: "Item 2",
            type: "group",
            iconStatus: "#",
          },
        ],
      },
      {
        key: "sub2",
        add_children: "",
        label: "Channels",
        children: [
          { key: "5", iconStatus: "#", label: "Option 5" },
          { key: "6", iconStatus: "#", label: "Option 6" },
        ],
      },
    ];

    if (userState) {
      const userItems = userState.map((user) => {
        const { id, first_name, last_name, user_status } = user;
        return {
          key: id,
          iconStatus: user_status,
          label: first_name + " " + last_name,
        };
      });

      newItems.push({
        key: "sub3",
        add_children: "",
        label: "Direct Messages",
        children: userItems,
      });
    }

    setItems(newItems);
  }, [userState]);

 
  const onClick = (e) => {
    if (e.key  === "newItem") {
    } else {
      //console.log("Click ", e);
      setClickedItem(e);
    }
  };
  return (
    <div className="ml-14 ">
      <Grid container>
        <Grid item xs={2}>
          <div className="h-screen border-e bg-white overflow-auto scrollable-content pl-2 overflow-y-auto scroll-container pt-2">
            <div className="">
              <Menu_chat_box1 items={items} onClick={onClick} />
            </div>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="">
            <div className="">
              <Chat_box2 items={items} clickedItem={clickedItem} />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
});

export default ChatUI;
