import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import Router from '../router/Router';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = ({store}) => {
  return (
    <div className='app'>
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="app__logo">
            МОЙ САМОКАТ
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <UserOutlined />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <UserOutlined />
              <span className="nav-text">nav 4</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="header site-layout-sub-header-background"
            style={{ padding: 0 }}
          >
            <div style={{color: '#fff'}}>
              {store.userStore.firstName} {store.userStore.lastName}
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Router/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', fontSize: 12 }}>
            ООО "МОЙ САМОКАТ" © 2020 <br/>
            ИНН: 9725029780 ОГРН 1207700062976 <br/>
            Адрес: 115114 г. Москва, 1-й Кожевнический пер., д. 6, стр. 1
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
};

export default inject('store')(observer(AppLayout));
