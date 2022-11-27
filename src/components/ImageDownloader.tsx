import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "./hooks/hooks";
import JSZip from "jszip";
import { GeneratedImage } from "../store/imagesSlice";
import { SxProps } from "@mui/system";

const saveZip = (filename: string, images: GeneratedImage[]) => {
  const zip = new JSZip();
  const folder = zip.folder("files"); // folder name where all files will be placed in

  images.forEach(({ uri, name }) => {
    const blobPromise = fetch(uri).then((r) => {
      if (r.status === 200) return r.blob();
      return Promise.reject(new Error(r.statusText));
    });

    if (folder) {
      folder.file(name, blobPromise);
    }
  });

  zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, filename));
};

function saveAs(blob: Blob, filename: string) {
  if (window.navigator.hasOwnProperty("msSaveOrOpenBlob")) {
    // @ts-ignore
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}

export function ImageDownloader(props: { sx?: SxProps }) {
  const images = useAppSelector((state) => state.images.images);
  return (
    <Button
      variant="contained"
      color={"primary"}
      startIcon={<Download />}
      disabled={images.length === 0}
      onClick={() => {
        saveZip("images.zip", images);
      }}
      sx={props.sx}
    >
      Download
    </Button>
  );
}
