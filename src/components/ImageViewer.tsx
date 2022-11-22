import { useAppSelector } from "./hooks/hooks";
import {
  Button,
  Card,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Preview } from "@mui/icons-material";

export function ImageViewer() {
  const images = useAppSelector((state) => state.images.images);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        startIcon={<Preview />}
        color="primary"
        variant="contained"
        disabled={images.length === 0}
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
          elevation={2}
          sx={{
            mx: "10%",
            mt: 5,
            p: 2,
            height: "75vh",
            overflow: "scroll",
          }}
        >
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
      </Modal>
    </>
  );
}
