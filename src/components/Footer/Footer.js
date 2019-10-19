import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, withRouter } from 'react-router-dom';
import './Footer.css';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
  bar: {
    alignContent: "center",
    width: "100%",
    position: "fixed",
    bottom: "0",
    backgroundColor: "darkgreen",
  },
  each: {
    color: "white",
  }
};

class Footer extends Component {

  render() {

    return (
      <div>
        <BottomNavigation showLabels style={styles.bar} >
          <BottomNavigationAction onClick={() => this.props.history.push('/home')}
            label="Home" icon={<FavoriteIcon />} />
          <BottomNavigationAction
            label="Info" icon={<FavoriteIcon />} />
          <BottomNavigationAction onClick={() => this.props.history.push('/newtask')}
            label="New Task" icon={<FavoriteIcon />} />
          <BottomNavigationAction
            label="Fleet" icon={<FavoriteIcon />} />
          <BottomNavigationAction onClick={() => this.props.dispatch({ type: 'LOGOUT' })}
            label="Log Out" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default connect()(withRouter(Footer));
