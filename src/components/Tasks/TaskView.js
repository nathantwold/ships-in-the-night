import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import OpenTasks from './OpenTasks';
import MyTasks from './MyTasks';
import AllTasks from './AllTasks';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            align="center"
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TaskView = () => {

    const [value, setValue] = React.useState(0);
    const styles = {
        bar: {
            position: "fixed",
            backgroundColor: "green",
            width: "100%",
        },
        tabs: {
            marginTop: "20px",
        }
    }

    const handleChangeIndex = index => {
        setValue(index);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
            <div>
                <AppBar position="static" style={styles.bar}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                        <Tab label="Open Tasks" {...a11yProps(0)} />
                        <Tab label="My Tasks" {...a11yProps(1)} />
                        <Tab label="All Tasks" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                    <TabPanel value={value} index={0}>
                        <OpenTasks style={styles.tabs}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <MyTasks />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <AllTasks />
                    </TabPanel>
                </SwipeableViews>
            </div>
    );
}

export default TaskView;
