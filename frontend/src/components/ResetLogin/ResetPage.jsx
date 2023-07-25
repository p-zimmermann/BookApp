import { Box, Typography, Button, TextField } from "@mui/material"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import showNotification from "../notification/showNotification";

export default function ResetPage(){

    const navigate = useNavigate();
    const formRef = useRef();
    const [resetCode, setResetCode] = useState("")

    const onSubmitReset = async(e, formRef,setResetCode) => {
        e.preventDefault();
        const email = formRef.email.value;
        const config = {
            url: "http://localhost:3001/resetpassword",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: email,
            },
        }
        try{
            const res = await axios(config)
            console.log(res)
            setResetCode(res.data.code)
            localStorage.setItem("resetPasswordToken", res.data.token)
            localStorage.setItem("resetPasswordCode", res.data.code)
            showNotification("Email sent", "normal")
            navigate("/reset-password-mail")
        }
        catch(error){
            console.log(error)
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
        backgroundColor= "secondary.light"
        onSubmit ={(e) => onSubmitReset(e, formRef.current, setResetCode)}

        >
            <Typography variant="h4" sx={{m: 5}}>Type in your Email to reset password</Typography>
            <TextField name ="email" label="email" sx={{m: 5}}/>
            <Button variant="contained" type="submit">Submit</Button>  
        </Box>
        </>
    )
}