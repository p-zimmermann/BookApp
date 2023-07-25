import { Box, Typography, Button, TextField, InputAdornment,
    IconButton } from "@mui/material"
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import showNotification from "../notification/showNotification";

export default function SetPassword(){
    const navigate = useNavigate();
    const formRef = useRef();

    const [equal,setEqual] = useState(false);
    const [emailToken,setEmailToken] = useState("");

    const checkPassword = (formRefCurrent,setEqual) => {
        formRefCurrent.password.value === formRefCurrent.passwordVerify.value ? setEqual(true) : setEqual(false);
    }

    const onSubmitChangePassword = async(e, formRef, equal, emailToken, setEmailToken) => {
        e.preventDefault();
        console.log(formRef)
        console.log(formRef.password.value)
        if(equal){
            const newPW = formRef.password.value;

            const config = {
                url: "http://localhost:3001/newpassword",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${emailToken}`,
                },
                data: {
                    password: newPW,
                },
            }
            try {
                const res = await axios(config);
                console.log(res);
                setEmailToken("");
                localStorage.removeItem("resetPasswordToken");
                showNotification("congrats. you changed your password", "normal")
                navigate("/")
            }
            catch(error) {
                localStorage.removeItem("resetPasswordToken")
                showNotification("reset password failed", "red")
                navigate("/")
            }
        }
        else {
            showNotification("passwords are not equal", "red")
        }

    }

    useEffect(()=> {
        setEmailToken(localStorage.getItem("resetPasswordToken"))
    }, [])
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
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
        onSubmit= {(e) => onSubmitChangePassword(e, formRef.current, equal, emailToken, setEmailToken)}
        >
            <Typography variant="h4" sx={{m: 5}}>Type in your new password</Typography>
            <TextField name="password" label="password" sx={{m: 5}}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }}
            />
            <TextField name="passwordVerify" label="verifyPassword" sx={{m: 5}} onChange={()=> checkPassword(formRef.current, setEqual)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }}
            />
            <Button variant="contained" type="submit" >Submit</Button>  
        </Box>
        </>
    )
}