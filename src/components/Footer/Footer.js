import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
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
    backgroundColor: "#0a0f2d",
    borderTop: '2px solid #4480ed',
  },
  each: {
    color: "#4480ed",
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
            label="Home" style={styles.each} icon={<FormatListBulletedIcon />} />
          <BottomNavigationAction onClick={() => console.log('Info page coming soon!')}
            label="Info" style={styles.each} icon={<PersonIcon />} />
          <BottomNavigationAction onClick={() => this.props.history.push('/newtask')}
            label="New Task" style={styles.add} icon={<AddCircleIcon />} />
          <BottomNavigationAction onClick={() => this.props.history.push('/fleetview')}
            label="Fleet" style={styles.each} icon={<GroupIcon />} />
          <BottomNavigationAction onClick={() => this.props.dispatch({ type: 'LOGOUT' })}
            label="Log Out" style={styles.each} icon={<ExitToAppIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default connect()(withRouter(Footer));
