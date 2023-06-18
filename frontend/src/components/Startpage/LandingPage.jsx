import {Box, TextField} from '@mui/material';
import LoginFields from './Login.jsx'

export default function LandingPage() {


    return (
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
                minWidth: "50%"
            }}
            >
                <img src="../../../../public/img/library/jpgs/bookshelf-1.jpg" style={{width: '50vw'}}></img>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 5,
                    width: "50%"
                }}
            >
                <LoginFields></LoginFields>
            </Box>
        </Box>
        </>
    )
}