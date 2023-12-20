import axios from 'axios';
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Iconify from 'src/components/iconify';

import ProgressBar from './progress-bar';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    minWidth: 550,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const VideoUpload = () => {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    setProgress(Math.floor((loaded * 100) / total));
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('video', selectedFile);

      const response = await axios.post('/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });

      setUploadSuccess(response.data.videoUrl);
      setUploadError(null);
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadSuccess(null);
      setUploadError('Error uploading video. Please try again.');
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}
      >
        New Course
      </Button>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Upload a video
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="carbon:close-filled" width="24" />
        </IconButton>
        <DialogContent dividers>
          <div>
            <Typography sx={{ pb: 2 }}>
              Please select a file by clicking following button:
            </Typography>

            <Button component="label" variant="contained" onClick={handleClickOpen}>
              Select file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} accept="video/*" />
            </Button>

            {selectedFile && (
              <Typography sx={{ mt: 2 }}>Selected file: {selectedFile.name}</Typography>
            )}

            {progress > 0 ? <ProgressBar value={progress} /> : null}

            {uploadSuccess && (
              <div>
                <p>Upload successful!</p>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video controls width="100%">
                  <source src={uploadSuccess} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            startIcon={<Iconify icon="material-symbols:cloud-upload" width={20} />}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default VideoUpload;
