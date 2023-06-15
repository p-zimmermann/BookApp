import {Box, Button, Avatar, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FeedPage(){

    return(
        <>
        <Box
             sx={{
            display: "flex",
            flexDirection: "row",
          
            }}
        >

            <Box
            sx={{
                display: "flex",
                minWidth: "15vw",
                
            }}
            >
                
            </Box>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "60vw",
                height: "100vh",
                bgcolor: 'primary.light',
                justifyContent: "flex-start",
                padding: 10
                
            }}
            >
            <TextField
            label="search for title"
            /* value='search' */
            onChange='{handleChange}'
          ></TextField>
            </Box>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "15vw",
                justifyContent: "flex-start"
                
            }}
            >
                <Avatar
              size="md"
              sx={{
                m: 3,
                p: "1rem",
            
              }}
            >
                
              
            </Avatar>
            <Button variant="contained" sx={{margin: 2}}>Profile</Button>
            </Box>

        </Box>
        </>
        
    )

}