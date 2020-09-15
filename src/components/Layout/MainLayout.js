import { Content, Footer, Header, Sidebar } from 'components/Layout';
import React from 'react';
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty,
} from 'react-icons/md';
// import NotificationSystem from 'react-notification-system';
// import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';


class MainLayout extends React.Component {
  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);

    setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }

      this.notificationSystem.addNotification({
        title: <MdImportantDevices />,
        message: 'Welome to MEce Admin!',
        level: 'info',
      });
    }, 1500);

    setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }

      this.notificationSystem.addNotification({
        title: <MdLoyalty />,
        message:
          'MEce is carefully designed template powered by React and Bootstrap4!',
        level: 'info',
      });
    }, 2500);
  }

  // close sidebar when
  handleContentClick = event => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      MainLayout.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {
    //const {isAuthenticated,user} = this.props.auth;
    const {isAuthenticated} = this.props.auth;

      if(!isAuthenticated){
        return (<Redirect to="/" /> )
       // this.props.history.push('/');
      }
      else
      {
        //const {isAuthenticated,user} = this.props.auth;
        const { children } = this.props;
        return (
          <main className="cr-app bg-light">
            <Sidebar />
            <Content fluid onClick={this.handleContentClick}>
              <Header />
              {children}
              <Footer />
            </Content>
          </main>
        );
      }
    
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(MainLayout));
