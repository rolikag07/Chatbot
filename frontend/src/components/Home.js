import React, {useState} from 'react';
import BotImage from '../assets/images/mychatbot.png'
import {TextField, Button, Typography} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import axios from "axios";


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

    const Header = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" component="h6" style={{margin: "0 auto"}}>
                            Hello!
                        </Typography>
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
                    <img src={BotImage} alt={"Chat-Bot"}/>
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
                        <Button variant="outlined" type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </div>

    )
}


export default Home;
