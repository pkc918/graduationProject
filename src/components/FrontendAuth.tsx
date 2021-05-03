import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';

interface propsModel{
  config: any[]
}

export class FrontendAuth extends React.Component<any, propsModel>{
  render() {
    const {location,config} = this.props;
    const {pathname} = location;
    const isLogin = localStorage.getItem('token');
    const targetRouterConfig = config.find((v:any) => v.path === pathname);

    if (targetRouterConfig && !targetRouterConfig.auth && !isLogin){
      const {component} = targetRouterConfig;
      return <Route exact path={pathname} component={component} />
    }

    if (isLogin) {
      if (pathname === '/login'){
        return <Redirect to='/' />
      }else {
        if (targetRouterConfig) {
          return <Route path={pathname} component={targetRouterConfig.component} />
        }
      }
    }else {
      if (targetRouterConfig && targetRouterConfig.auth){
        return <Redirect to='/login' />
      }
    }
  }
}
