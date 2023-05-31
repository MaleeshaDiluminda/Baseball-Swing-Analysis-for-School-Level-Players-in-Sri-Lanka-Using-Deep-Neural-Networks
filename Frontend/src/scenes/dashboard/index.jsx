import { Box, Button, Typography,useTheme } from "@mui/material";
import React, { useState } from 'react';
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import {useEffect } from 'react';
import ImageDisplay from "./MyComponent";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setData] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', selectedFile);
    const response = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
    });
    const jsonData = await response.json();
      setData(jsonData);
  };

  // fetch('/image/my_image.jpg')
  // .then(response => response.blob())
  // .then(imageBlob => {
  //   const imageURL = URL.createObjectURL(imageBlob);
  //   // Use imageURL as the source for an <img> element or any other element that accepts images.
  // });


return (
    <Box m="20px">

      {/* HEADER */}

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px", }}>
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Report
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">

      {/* ROW 1 */}

        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "10px" }}>
            <div style={{ marginLeft: "5px" }}>
               <h1 style={{ margin: "0", padding: "0" }}>Stance</h1>
               {response && (
              <h1 style={{ margin: "0", padding: "0" }}>{response.stancetype[0]}</h1>
              )}
              {response && (
              <h1 style={{ margin: "0", padding: "0" }}>{response.stancetype[1]}</h1>
              )}
            </div>
          </div>
        </Box>

        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "10px" }}>
            <div style={{ marginLeft: "5px" }}>
               <h1 style={{ margin: "0", padding: "0" }}>Shot Execution</h1>
               {response && (
              <h1 style={{ margin: "0", padding: "0" }}>{response.shottype[0]}</h1>
              )}
              {response && (
              <h1 style={{ margin: "0", padding: "0" }}>{response.shottype[1]}</h1>
              )}
            </div>
          </div>
        </Box>

        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "10px" }}>
          <div style={{ marginLeft: "5px" }}>
  <h1 style={{ margin: "0", padding: "0" }}>Leg Movement</h1>
  {/* correctness */}
  {response && (
    <h1 style={{ margin: "0", padding: "0" }}>{response.legtype[0]}</h1>
  )}
  {/* accuracy */}
  {response && (
    <h1 style={{ margin: "0", padding: "0" }}>{response.legtype[1]}</h1>
  )}
</div>
            
          </div>
        </Box>

        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "10px" }}>
            <div style={{ marginLeft: "5px" }}>
               <h1>Average</h1>
               {response && (
              <h1 style={{ margin: "0", padding: "0" }}>{response.avarage}</h1>
                )}
            </div>
          </div>
        </Box>

        {/* ROW 2 */}

        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]} > 
          <div style={{ border: '2px dashed white'}}>         
            <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >     
              <CloudUploadIcon sx={{ color: colors.greenAccent[400], fontSize: "220px" }} />
            </div>
            <form encType="multipart/form-data" onSubmit={handleSubmit} >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px'}}>
                <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', marginRight: '50px' }}>
                  <Button variant="contained" component="label" htmlFor="fileInput" style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '200px', height: '50px', fontSize: "15px" }}>Choose File</Button>
                  <input type="file" name="video" id="fileInput" onChange={handleFileUpload} style={{ position: 'absolute', top: '0', right: '0', bottom: '0', left: '0', opacity: '0', width: '100%', height: '100%', cursor: 'pointer' }} />
                </div>
                  <Button variant="contained" color="primary" type="submit" style={{ width: '200px', height: '50px', fontSize: "15px" }}>Upload Video</Button>
              </div>
            </form>
          </div>
        </Box>
        
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto"> 
        <Typography
            variant="h5"
            fontSize="35px"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Instructions
          </Typography>
               <h2 style={{ padding: "0px 0px 0px 30px" }} >Upload only videos.</h2>
               <h2 style={{ padding: "0px 0px 0px 30px" }}>Video should be 3 seconds or less than 3s</h2>
               <h2 style={{ padding: "0px 0px 0px 30px" }}>Click choose button to select videos</h2>
               <h2 style={{ padding: "0px 0px 0px 30px" }}>Click Upload  button and wait for the result</h2>
        </Box>

        {/* ROW 3 */}

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px" >
          <img                 
            src={`../../assets/1.gif`}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} >
          <img                 
            src={`../../assets/2.gif`}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} padding="30px" >
          <img                 
            src={`../../assets/3.gif`}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

