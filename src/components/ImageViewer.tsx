import { useAppSelector } from "./hooks/hooks";
import { Button, Card, ImageList, ImageListItem, Modal } from "@mui/material";
import { useState } from "react";

export function ImageViewer() {
  const images = useAppSelector((state) => state.images.images);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        color="primary"
        variant="contained"
        disabled={images.length === 0}
      >
        Image preview
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
              <ImageListItem key={img}>
                <img src={img} alt="" loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Card>
      </Modal>
    </>
  );
}
