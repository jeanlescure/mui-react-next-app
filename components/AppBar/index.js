import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import {default as MuiAppBar} from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

import MenuIcon from 'material-ui-icons/Menu';
import InvertShade from 'material-ui-icons/InvertColors';
import InvertShadeOff from 'material-ui-icons/InvertColorsOff';
import FormatTextdirectionLToR from 'material-ui-icons/FormatTextdirectionLToR';
import FormatTextdirectionRToL from 'material-ui-icons/FormatTextdirectionRToL';

const styles = theme => ({
  grow: {
    flex: '1 1 auto',
  },
  pageTitle: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

class AppBar extends Component {
  render() {
    const {
      classes,
      pageTitle,
      handleDrawerToggle,
      handleTogglePaletteType,
      handleToggleDirection,
      themeState: {
        shade,
        theme,
      },
    } = this.props;

    let navIconClassName = '';
    let appBarClassName = classes.appBar;

    if (pageTitle) {
      navIconClassName = classes.navIconHide;
      appBarClassName += ` ${classes.appBarShift}`;
    } else {
      // home route, don't shift app bar
      appBarClassName += ` ${classes.appBarHome}`;
    }

    return (
      <MuiAppBar className={appBarClassName}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={navIconClassName}
          >
            <MenuIcon/>
          </IconButton>
          {pageTitle !== null && (
            <Typography className={classes.title} variant="title" color="inherit" noWrap>
              {pageTitle}
            </Typography>
          )}
          <div className={classes.grow} />
          <Tooltip id="appbar-theme" title="Toggle light/dark theme" enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={handleTogglePaletteType}
              aria-labelledby="appbar-theme"
            >
              {shade === 'light' ? <InvertShade/> : <InvertShadeOff/>}
            </IconButton>
          </Tooltip>
          <Tooltip
            id="appbar-direction"
            title="Toggle right-to-left/left-to-right"
            enterDelay={300}
          >
            <IconButton
              color="inherit"
              onClick={handleToggleDirection}
              aria-labelledby="appbar-direction"
            >
              {theme.direction === 'rtl' ? (
                <FormatTextdirectionLToR/>
              ) : (
                <FormatTextdirectionRToL/>
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </MuiAppBar>
    );
  }
}

function mapStateToProps(state) {
  return {
    themeState: state.themeRedux,
  };
}

export default connect(
  mapStateToProps,
  null,
)(
  withStyles(styles)(AppBar)
);
