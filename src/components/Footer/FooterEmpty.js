import React, { Component } from 'react';

const styles = {
    bar: {
        textAlign: "center",
        width: "100%",
        position: "fixed",
        bottom: "0",
        backgroundColor: "darkgreen",
    },
};

class FooterEmpty extends Component {

    render() {

        return (
            <div style={styles.bar}>
                <h6>&copy;2019 Ships in the Night</h6>
            </div>
        );
    }
}

export default FooterEmpty;