import React, {useState} from 'react';
import BotImage from '../assets/images/mychatbot.png'
import {TextField, Button, Typography} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import axios from "axios";
import Chip from '@mui/material/Chip';




const Home = () => {
    const [query, setQuery] = useState();
    const [result, setResult] = useState();

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:5000/handle-query", {
            query: query
        }).then(res => {
            setResult(res.data);
        })
    }

    const theme = createTheme({
        typography: {
          fontFamily: [
            "Cursive",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "sans-serif"
          ].join(",")
        }
      });

    const Header = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h5" component="h6" style={{margin: "0 auto"}}>
                                Hello My Name Is Quaesitor!
                            </Typography>
                        </ThemeProvider>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }

    return (
        <div style={{marginBottom: "5%"}}>
            <Header />
            <div style={{textAlign: "center"}}>
                <div style={{marginBottom: "5%"}}>
                    <br></br>
                    <img src={BotImage} alt={"Chat-Bot"} width={"650px"}/>
                    <div style={{textAlign: "center"}}>
                 </div>
            </div>
            <div style={{marginLeft: "-1.5%", marginTop: "-5%"}}>
            <Chip label="ASK ME ANYTHING!" align="center" color="primary" width="50px"/>
            </div>
                <div>
                <div >
                        <Typography variant="subtitle1" component="p">
                            <div dangerouslySetInnerHTML={{__html: result}} />
                        </Typography>
                 </div>
                    <form onSubmit={handleFormSubmit}>
                        <TextField label="Enter Your Query" variant="standard" style={{width:"25%"}} value={query}
                                   onChange={handleChange}/>
                        <br/><br/>
                        <div style={{marginLeft: "-1.5%"}}>
                        <Button variant="outlined" type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        
        </div>

    )
    
}


export default Home;
