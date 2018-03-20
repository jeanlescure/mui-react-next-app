import React from 'react';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import List, {ListItem} from 'material-ui/List';
import Link from 'next/link'
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';

const styles = theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit / 2,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  toolbarIe11: {
    display: 'flex',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
  },
  buttonLeaf: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    color: theme.palette.text.secondary,
  },
  active: {
    color: theme.palette.text.primary,
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
  },
});

const paddigByDepth = depth => 8 * (3 + 2 * depth);

const NavButton = ({children, classes, onClick, isActive, href}) => {
  return (
    <Button
      component={buttProps => {
        const {
          children: buttChildren,
          className: buttClassName,
          ...restButtProps,
        } = buttProps;

        let child = buttChildren[0];
        if (buttChildren[0] && buttChildren[0].props.children) {
          child = React.cloneElement(buttChildren[0], {
            children: React.Children.map(buttChildren[0].props.children, grandchild => {
              if (React.isValidElement(grandchild)){
                return React.cloneElement(grandchild, {
                  onClick,
                  className: classNames(buttClassName, isActive? classes.active : ''),
                  ...restButtProps,
                });
              }

              return grandchild;
            })
          });
        }

        return (
          <Link
            href={href}
          >
            {child}
          </Link>
        );
      }}
      className={classes.buttonLeaf}
      disableRipple
      onClick={onClick}
      style={{
        paddingLeft: paddigByDepth(0),
      }}
    >
      {children}
    </Button>
  );
};

const NavItem = ({href, title, pageTitle, children, classes, onClick}) => {
  return (
    <ListItem
      className={classes.itemLeaf}
      disableGutters
      depth={0}
      title={title}
      href={href}
    >
      <NavButton
        href={href}
        classes={classes}
        onClick={onClick}
        isActive={title === pageTitle}
      >
        <a>{children}</a>
      </NavButton>
    </ListItem>
  );
};

const SideNav = (props, context) => {
  const {
    classes,
    pageTitle,
    disablePermanent,
    mobileOpen,
    onClose,
  } = props;

  const navOnClick = (disablePermanent || mobileOpen)? onClose : () => {};

  const drawer = (
    <div className={classes.nav}>
      <div className={classes.toolbarIe11}>
        <div className={classes.toolbar}>
          <Link href="/">
            <Typography
              className={classes.title}
              onClick={onClose}
              variant="title"
              color="inherit"
              component="a"
            >
              Material-UI
            </Typography>
          </Link>
        </div>
      </div>
      <Divider />
      <List>
        <NavItem
          href="/about"
          title="About"
          pageTitle={pageTitle}
          classes={classes}
          onClick={navOnClick}
        >
          About
        </NavItem>
        <NavItem
          href="/api-demo"
          title="API Demo"
          pageTitle={pageTitle}
          classes={classes}
          onClick={navOnClick}
        >
          API Demo
        </NavItem>
      </List>
    </div>
  );

  return (disablePermanent || mobileOpen)? 
    (
      <Hidden lgUp={!disablePermanent}>
        <Drawer
          classes={{
            paper: classNames(classes.paper, 'algolia-drawer'),
          }}
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          className={classes.drawer}
        >
          {drawer}
        </Drawer>
      </Hidden>
    )
    :
    (
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.paper,
          }}
          variant="permanent"
          open
          className={classes.drawer}
        >
          {drawer}
        </Drawer>
      </Hidden>
    );
}

export default withStyles(styles)(SideNav);
