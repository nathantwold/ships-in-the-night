import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = {
  bar: {
    textAlign: "center",
    width: "100%",
    position: "fixed",
    bottom: "0",
    backgroundColor: "darkgreen",
  },
  each: {
    color: "lightgreen",
  },
  add: {
    color: "white",
  }
};

class Footer extends Component {

  render() {

    return (
      <div>
        <BottomNavigation showLabels style={styles.bar} >
          <BottomNavigationAction onClick={() => this.props.history.push('/home')}
            label="Home" style={styles.each} icon={<HomeIcon />} />
          <BottomNavigationAction
            label="Info" style={styles.each} icon={<PersonIcon />} />
          <BottomNavigationAction onClick={() => this.props.history.push('/newtask')}
            label="New Task" style={styles.add} icon={<AddCircleIcon />} />
          <BottomNavigationAction onClick={() => this.props.history.push('/fleet')}
            label="Fleet" style={styles.each} icon={<GroupIcon />} />
          <BottomNavigationAction onClick={() => this.props.dispatch({ type: 'LOGOUT' })}
            label="Log Out" style={styles.each} icon={<ExitToAppIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default connect()(withRouter(Footer));
