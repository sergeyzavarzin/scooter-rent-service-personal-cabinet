import React from 'react';
import { Menu, Layout } from 'antd';
import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';

class Navigation extends React.Component {
	render() {
		return (
			<Layout.Sider breakpoint='lg' collapsedWidth='0'>
				<Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
					<Menu.Item key='1'>
						<UserOutlined />
						<span className='nav-text'>nav 1</span>
					</Menu.Item>
					<Menu.Item key='2'>
						<VideoCameraOutlined />
						<span className='nav-text'>nav 2</span>
					</Menu.Item>
					<Menu.Item key='3'>
						<UploadOutlined />
						<span className='nav-text'>nav 3</span>
					</Menu.Item>
					<Menu.Item key='4'>
						<UserOutlined />
						<span className='nav-text'>nav 4</span>
					</Menu.Item>
				</Menu>
			</Layout.Sider>
		);
	}
}

export default Navigation;
