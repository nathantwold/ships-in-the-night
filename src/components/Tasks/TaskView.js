import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';

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

const TaskView = ({ user }) => {

    const [value, setValue] = React.useState(0);
    const styles = {
        tabs: {
            backgroundColor: "green",
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Router>
            <div>
                <AppBar position="static" style={styles.tabs}>
                    <Tabs value={value} color="primary" onChange={handleChange} aria-label="simple tabs example" centered>
                        <Tab label="Open Tasks" {...a11yProps(0)} />
                        <Tab label="My Tasks" {...a11yProps(1)} />
                        <Tab label="All Tasks" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <OpenTasks user={user} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MyTasks user={user} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AllTasks user={user} />
                </TabPanel>
                <Link to="/newtask">
                    <h6>Add Task</h6>
                </Link>
            </div>
        </Router>
    );
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(TaskView);