
import PurchaseHandler from "../components/PurchaseOperations/PurchaseHandler";
import React, {useState} from 'react'
import TabPanel from '../components/TabPanel';
import {Tabs, Tab, Box } from '@mui/material';
import InventoryHandler from "../components/InventoryOperations/InventoryHandler";

function a11yProps(index) {
    return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    };
}


const MachineManager = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Customers" {...a11yProps(0)} />
                        <Tab label="Owner" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <PurchaseHandler/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <InventoryHandler/>
                </TabPanel>
            </Box>
        </>
    )
}

export default MachineManager;
