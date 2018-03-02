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
    <div {...otherProps}/>
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
  componentWillMount() {
    this.initTheme('light');
  }

  initTheme = (shade: string) => {
    const theme = main;
    theme.palette = Object.assign({}, main.palette, {type: shade});

    this.props.themeSet('main', shade, theme);
  };

  render() {
    const {
      children,
      themeState: {
        shade,
        theme,
      },
    } = this.props;

    const muiTheme = (theme)? createMuiTheme(theme) : null;
    const ShadedStyleWrapper = (muiTheme)? withStyles(muiTheme.styles(shade))(StyleWrapper) : (<div></div>);

    if (!theme) {
      return (<div></div>);
    }

    return (
      <MuiThemeProvider theme={muiTheme}>
        <AppBar/>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }} 
          className="page-content"
        >
          <ShadedStyleWrapper>
            {children}
          </ShadedStyleWrapper>
        </div>
        <SideNav/>
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