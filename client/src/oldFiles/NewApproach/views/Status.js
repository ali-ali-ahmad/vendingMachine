import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Game1 from '../components/games/Game1';
import Game2 from '../components/games/Game2';
import Game3 from '../components/games/Game3';
import TabPanel from '../components/TabPanel';
import './css/main.css'
import {Tabs, Tab, Box } from '@mui/material';

function a11yProps(index) {
    return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Status = (props) => {
    const [players, setPlayers] = useState();
    const [loaded, setLoaded] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const updatePlayer = (player) => {
        axios.put('http://localhost:8000/api/players/status/'+player.statusId, player)
        .then(res => console.log(player.statusId,"this works here"))
        .catch(err => console.error(err))
    }

    useEffect (() =>{
        axios.get('http://localhost:8000/api/players')
            .then(res => {
                setPlayers(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
                {loaded && 
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Game 1" {...a11yProps(0)} />
                        <Tab label="Game 2" {...a11yProps(1)} />
                        <Tab label="Game 3" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} >
                    <Game1 players={players} PlayerStatus={updatePlayer}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Game2 players={players} PlayerStatus={updatePlayer}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Game3 players={players} PlayerStatus={updatePlayer}/>
                </TabPanel>
            </Box>
                }
        </>
    )
};

export default Status;



