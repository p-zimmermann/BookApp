import { Box, Typography, Button, TextField } from "@mui/material"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import showNotification from "../notification/showNotification";

export default function VerifyReset () {
    const navigate = useNavigate();
    const formRef = useRef();

    const[resetAllowed, setResetAllowed] = useState(false)

    const onSubmitCode = (e, formRef, setResetAllowed) => {
        e.preventDefault();
        const code = formRef.code.value;
        if(code == localStorage.getItem("resetPasswordCode")){
            setResetAllowed(true)
            showNotification("This is the right code!", "normal")
            navigate("/reset-newpassword")
        }
        else {
            showNotification("wrong code :(", "red")
        }
        
    }

    return(
        <>
        <Box
        component="form"
        display="flex"
        flexDirection= "column"
        alignItems="center"
        ref={formRef}
        width="100vw"
        height="100vh"
        backgroundColor= "primary.light"
        onSubmit ={(e) => onSubmitCode(e, formRef.current, setResetAllowed)}
        >
            <Typography variant="h4" sx={{m: 5}}>Type in your code you received</Typography>
            <TextField name="code" label="code" sx={{m: 5}}/>
            <Button variant="contained" type="submit">Submit</Button>  
        </Box>
        </>
    )
}