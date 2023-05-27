import React, { useState } from "react";
import { Container, SimpleGrid, useMantineTheme } from "@mantine/core";
import "./css/style.css";
import Post from "../post";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RadioGroupRating from "./radio_group_rating";

import Calendar_UI from "./calendar";

const Home_UI = React.memo(() => {
  const theme = useMantineTheme();
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const handleClick = () => {
    const randomColor = generateLightColor();
    setBackgroundColor(randomColor);
  };

  const generateLightColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // Thêm độ mờ vào mã hex để tạo màu sắc nhạt nhẹ
    color += "40"; // 80 là độ mờ (opacity) trong dạng hex
    return color;
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8 ">
      <div className="max-w-full items-center justify-center ">
        <Container my="lg" className=" max-w-full mt-0 mb-0">
          <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            className=""
          >
            <div
              xs={8}
              className="h-screen overflow-auto scrollable-content  px-1 overflow-y-auto scroll-container pt-2 "
            >
              <Post />
              <Post />
              <Post />
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                paddingTop: "8px",
                paddingBottom: "8px",
              }}
            >
              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6} lg={4} className="h-1/2">
                  <div
                    style={{ backgroundColor }}
                    onClick={handleClick}
                    className="w-full h-full cursor-pointer mb-4 p-2 rounded-lg  border border-gray-100 bg-white shadow-sm transition"
                  >
                    <RadioGroupRating className="w-full" />
                  </div>
                </Grid>
                <Grid item className=" h-1/2" xs={12} md={6} lg={8}>
                  <div className="w-full h-full mb-4 p-2 rounded-lg  border border-gray-100 bg-white shadow-sm transition">
                    2
                  </div>
                </Grid>
                <Grid item xs={12} className="h-1/2" md={12}>
                  <div className="w-full h-full  mb-4 p-2 rounded-lg  border border-gray-100 bg-white shadow-sm transition">
                    3
                  </div>
                </Grid>
              </Grid>
            </Box>
          </SimpleGrid>
        </Container>
      </div>
    </div>
  );
});

export default Home_UI;
