import React, {Component} from 'react';
import {connect} from 'react-redux';
import Head from 'next/head';
import Typography from 'material-ui/Typography';

import PageWrapper from '../components/PageWrapper';

class HomePage extends Component {
  render() {
    const {site} = this.props;
    return [
      <Head key="head">
        <title>Hello World</title>
        <meta name="description" content="hello world" />
        <meta name="keywords" content="hello, world" />
      </Head>,
      <Typography
        variant="headline"
        component="h1"
        key="title"
        className="page-header"
      >
        HELLO WORLD
      </Typography>,
    ];
  }
}

const Index = ({}) => {
  return (
    <PageWrapper>
      <HomePage/>
    </PageWrapper>
  );
};

// Server-side only
Index.getInitialProps = async context => {
  return {};
};

export default Index;
