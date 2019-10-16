import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import FleetPage from '../FleetPage/FleetPage';

// import Tab1 from './Tab1';
// import Tab2 from './Tab2';
// import Tab3 from './Tab3';
// import Tab4 from './Tab4';

// this could also be written with destructuring parameters as:
// const HomePage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
// const HomePage = (props) => (
//   <div>
//     <h1 id="welcome">
//       Welcome, { props.user.username }!
//     </h1>
//     <p>Your ID is: {props.user.id}</p>
//   </div>
// );

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

const HomePage = ({ user }) => {
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

    <div>
      {user.groupname === '0' ? <div><FleetPage id={user.id}/></div> :
        <div>
          <AppBar position="static" style={styles.tabs}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
              <Tab label="Open Tasks" {...a11yProps(0)} />
              <Tab label="My Tasks" {...a11yProps(1)} />
              <Tab label="All Tasks" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Tab1
          </TabPanel>
          <TabPanel value={value} index={1}>
            Tab2
          </TabPanel>
          <TabPanel value={value} index={2}>
            Tab3
          </TabPanel>
        </div>}
    </div>
  );
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HomePage);
