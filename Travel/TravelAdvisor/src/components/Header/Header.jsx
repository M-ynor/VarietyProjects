import React from "react";
import {Autocomplete} from "@react-google-maps/api";
import {AppBar, Box, InputBase, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import useStyles from "./styles.js";
const Header = () => {
    const classes = useStyles();
    return(
        <div className="header">
            <h1>klk</h1>
            <AppBar position="static">
                <ToolBar className={classes.toolbar}>
                    <Typography variant="h5" className={classes.tittle}>
                        Travel Advisor
                    </Typography>
                    <Box display="flex">
                        <Typography variant="h6" className={classes.tittle}>
                            Find ur dream place
                        </Typography>
                        {/*<Autocomplete>*/}
                            <div className={classes.search}>
                                <div className={classes.searchIcon}> 
                                    <SearchIcon />
                                </div>
                                <InputBase placeholder="Search..." className={{roo: classes.inputroot, input: classes.inputinput}}/>
                            </div>
                        {/*</Autocomplete>*/}
                    </Box>
                </ToolBar>
            </AppBar>
        </div>
        
    )
}

export default Header;
