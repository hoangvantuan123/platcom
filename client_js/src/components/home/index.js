import React from "react";
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
} from "@mantine/core";
import "./css/style.css";
import Post from "../post";

const PRIMARY_COL_HEIGHT = rem(400);
const Home_UI = React.memo(() => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
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
            className="h-screen overflow-auto scrollable-content flex-1 overflow-y-auto scroll-container pt-2"
          >
            <Post />
            <h1>
              Lorem Lorem Ips orem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed gravida eros vel dolor ullamcorper, vel elementum tortor
              aliquet. Donec euismod lacinia turpis vitae hendrerit. Quisque
              varius efficitur risus, a sagittis risus mattis et. Lorem Lorem
              Ips orem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              gravida eros vel dolor ullamcorper, vel elementum tortor aliquet.
              Donec euismod lacinia turpis vitae hendrerit. Quisque varius
              efficitur risus, a sagittis risus mattis et. Lorem Lorem Ips orem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
              eros vel dolor ullamcorper, vel elementum tortor aliquet. Donec
              euismod lacinia turpis vitae hendrerit. Quisque varius efficitur
              risus, a sagittis risus mattis et. Lorem Lorem Ips orem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed gravida eros vel
              dolor ullamcorper, vel elementum tortor aliquet. Donec euismod
              lacinia turpis vitae hendrerit. Quisque varius efficitur risus, a
              sagittis risus mattis et. Lorem Lorem Ips orem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed gravida eros vel dolor
              ullamcorper, vel elementum tortor aliquet. Donec euismod lacinia
              turpis vitae hendrerit. Quisque varius efficitur risus, a sagittis
              risus mattis et. Lorem Lorem Ips orem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed gravida eros vel dolor
              ullamcorper, vel elementum tortor aliquet. Donec euismod lacinia
              turpis vitae hendrerit. Quisque varius efficitur risus, a sagittis
              risus mattis et. Lorem Lorem Ips orem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed gravida eros vel dolor
              ullamcorper, vel elementum tortor aliquet. Donec euismod lacinia
              turpis vitae hendrerit. Quisque varius efficitur risus, a sagittis
              risus mattis et. Lorem Lorem Ips orem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed gravida eros vel dolor
              ullamcorper, vel elementum tortor aliquet. Donec euismod lacinia
              turpis vitae hendrerit. Quisque varius efficitur risus, a sagittis
              risus mattis et. Lorem Lorem Ips orem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed gravida eros vel dolor
              ullamcorper, vel elementum tortor aliquet. Donec euismod lacinia
              turpis vitae hendrerit. Quisque varius efficitur risus, a sagittis
              risus mattis et. Lorem Lorem Ips orem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed gravida eros vel dolor
              ullamcorper, vel elementum tortor aliquet. Donec euismod lacinia
              turpis vitae hendrerit. Quisque varius efficitur risus, a sagittis
              risus mattis et. Lorem Lorem Ips orem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed gravida eros vel dolor
              ullamcorper, vel elementum tortor aliquet. Donec euismod lacinia
              turpis vitae hendrerit. Quisque varius efficitur risus, a sagittis
              risus mattis et. Lorem Lorem Ips orem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed gravida eros vel dolor
              ullamcorper, vel elementum tortor aliquet. Donec euismod lacinia
              turpis vitae hendrerit. Quisque varius efficitur risus, a sagittis
              risus mattis et. Lorem Lorem Ips orem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed gravida eros vel dolor
              ullamcorper, vel elementum tortor aliquet. Donec euismod lacinia
              turpis vitae hendrerit. Quisque varius efficitur risus, a sagittis
              risus mattis et.
            </h1>
          </div>
          <div className="pt-2">
            <Grid gutter="md">
              <Grid.Col>
                <div
                  style={{
                    height: SECONDARY_COL_HEIGHT,
                    borderRadius: rem(8),
                    background: "#f0f0f0",
                  }}
                ></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div
                  style={{
                    height: SECONDARY_COL_HEIGHT,
                    borderRadius: rem(8),
                    background: "#f0f0f0",
                  }}
                ></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div
                  style={{
                    height: SECONDARY_COL_HEIGHT,
                    borderRadius: rem(8),
                    background: "#f0f0f0",
                  }}
                  className="h-full"
                ></div>
              </Grid.Col>
            </Grid>
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
});

export default Home_UI;
