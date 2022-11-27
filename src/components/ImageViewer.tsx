import { useAppSelector } from "./hooks/hooks";
import {
  Button,
  Card,
  ImageList,
  ImageListItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Preview } from "@mui/icons-material";
import { SxProps } from "@mui/system";
import ReactJson from "react-json-view";

export function ImageViewer(props: { sx?: SxProps }) {
  const images = useAppSelector((state) => state.images.images);
  const transforms = useAppSelector((state) => state.images.transforms);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        startIcon={<Preview />}
        color="primary"
        variant="contained"
        disabled={images.length === 0}
        sx={props.sx}
      >
        Preview
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          elevation={0}
          sx={{
            mx: "10%",
            mt: 5,
            p: 2,
            height: "75vh",
            background: "rgba(255, 255, 255, 0)",
          }}
        >
          <Stack direction="row" gap={2}>
            <Card
              sx={{
                p: 2,
                overflow: "scroll",
                height: "75vh",
              }}
            >
              <Typography variant="h6" textAlign="center">
                Images
              </Typography>
              <ImageList variant="masonry" cols={5} gap={2}>
                {images.map((img) => (
                  <ImageListItem key={img.name}>
                    <img src={img.uri} alt="" loading="lazy" />
                    <Typography variant="caption" textAlign="center">
                      {img.name}
                    </Typography>
                  </ImageListItem>
                ))}
              </ImageList>
            </Card>
            <Card sx={{ p: 2, width: "100%", height: "100%" }}>
              <Typography variant="h6" textAlign="center">
                Camera transformations
              </Typography>
              <ReactJson src={transforms} />
            </Card>
          </Stack>
        </Card>
      </Modal>
    </>
  );
}
