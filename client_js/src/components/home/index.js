import React from "react";
import {
  Container,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
} from "@mantine/core";
import "./css/style.css";
import Post from "../post";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RadioGroupRating from "./radio_group_rating";
import Clock from "./clock";
import Calendar_UI from "./calendar";

const Home_UI = React.memo(() => {
  const theme = useMantineTheme();

  return (
    <div className="max-w-full items-center justify-center px-3">
      <Container my="lg" className=" max-w-full mt-0 mb-0">
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          className=""
        >
          <div
            xs={8}
            className="h-screen overflow-auto scrollable-content flex-1 overflow-y-auto scroll-container pt-2 "
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
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Grid
                  item
                  spacing={2}
                  sx={{
                    height: "100%",
                    flex: 1,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <div className="h-full flex flex-1">
                    <div className="flex flex-col justify-between">
                      <div className="">
                        <RadioGroupRating className="w-full" />
                      </div>
                      <div className="pt-3 items-center justify-center">
                        <Clock />
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <div className="h-full w-full bg-gray-200 rounded-md mb-4">
                  <Calendar_UI />
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <div className="h-full w-full bg-gray-200 rounded-md mb-4">
                  3
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <div className="h-full w-full bg-gray-200 rounded-md mb-4">
                  4
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <div className="w-full h-full bg-gray-200 rounded-md mb-4">
                  5
                </div>
              </Grid>
            </Grid>
          </Box>
        </SimpleGrid>
      </Container>
    </div>
  );
});

export default Home_UI;
