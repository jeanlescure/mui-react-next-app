import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createMuiTheme, MuiThemeProvider, withStyles} from 'material-ui/styles';

import AppBar from '../AppBar';
import SideNav from '../SideNav';

import configureStore from '../../redux/configureStore';

import main from '../../themes/main';
import * as ThemeActions from '../../redux/theme/actions';

const StyleWrapper = (props) => {
  const {
    classes,
    ...otherProps,
  } = props;

  return (
    <div className="page-content" {...otherProps}/>
  );
};

const ProviderWrapper = (PageWrapperComponent) => {
  return (
    class Page extends Component {
      render() {
        return (
          <Provider store={configureStore()}>
            <PageWrapperComponent {...this.props}/>
          </Provider>
        )
      }
    }
  )
}

class PageWrapper extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleTogglePaletteType = () => {
    const {themeState: {shade, direction}} = this.props;
    this.initTheme((shade === 'light')? 'dark' : 'light', direction);
  };

  handleToggleDirection = () => {
    const {themeState: {shade, direction}} = this.props;
    this.initTheme(shade, (direction === 'ltr')? 'rtl' : 'ltr');
  };

  componentWillMount() {
    this.initTheme('light', 'ltr');
  }

  initTheme = (shade: string, direction: string) => {
    const theme = Object.assign({}, main, {direction});
    theme.palette = Object.assign({}, main.palette, {type: shade});

    this.props.themeSet('main', theme, shade, direction);
  };

  render() {
    const {
      handleDrawerToggle,
      handleTogglePaletteType,
      handleToggleDirection,
      props: {
        classes,
        children,
        title,
        themeState: {
          shade,
          theme,
        },
      },
    } = this;

    const disablePermanent = (title)? false : true;

    const muiTheme = (theme)? createMuiTheme(theme) : null;
    const ShadedStyleWrapper = (muiTheme)? withStyles(muiTheme.styles(shade))(StyleWrapper) : (<div></div>);

    if (!theme) {
      return (<div></div>);
    }

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <AppBar
            pageTitle={title}
            handleDrawerToggle={handleDrawerToggle}
            handleTogglePaletteType={handleTogglePaletteType}
            handleToggleDirection={handleToggleDirection}
          />
          <SideNav
            disablePermanent={disablePermanent}
            onClose={this.handleDrawerToggle}
            mobileOpen={this.state.mobileOpen}
            pageTitle={title}
          />
          <ShadedStyleWrapper>
            {children}
          </ShadedStyleWrapper>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    themeState: state.themeRedux,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ThemeActions, dispatch);
}

export default ProviderWrapper(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageWrapper));