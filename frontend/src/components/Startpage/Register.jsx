import { Box, TextField, Input, InputLabel, Button } from "@mui/material";

export default function Register() {
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
            minWidth: "50%",
          }}
        >
          <img
            src="../../../../img/library/jpgs/bookshelf-1.jpg"
            style={{ width: "50vw" }}
          ></img>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 5,
            width: "50%",
          }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="E-Mail"
            name="mail"
            variant="outlined"
            value=""
            onChange=""
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            variant="outlined"
            value=""
            onChange=""
          />
          <TextField
            fullWidth
            margin="normal"
            label="nickname"
            name="nickname"
            variant="outlined"
            value=""
            onChange=""
          />
          <InputLabel htmlFor="profilePicture">
            Upload your profile picture here
          </InputLabel>
          <Input
            id="profilePicture"
            name="profilePicture"
            type="file"
            accept="image/*"
            onChange=""
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Register
          </Button>
          {/* <LoginFields></LoginFields> */}
        </Box>
      </Box>
    </>
  );
}
