import {Box, Button, Avatar} from '@mui/material';
import AccordionShelve from './AccordionShelve.jsx';
import { useNavigate } from 'react-router-dom';


export default function FeedPage(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/search')
    }
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
            <Button variant="contained" sx={{margin: 5}} onClick={handleClick}>Search</Button>
            <AccordionShelve ></AccordionShelve>  
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