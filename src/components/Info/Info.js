import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, Button, List, Card, Avatar } from 'antd';

import './Info.scss';

const { Title } = Typography;

const listData = [
	{
		title: `Иван Иванов`,
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: 'Подписка активна до: 30.03.2020',
		content: '',
	},
];

const data = [
	{
		title: 'Title 1',
	},
	{
		title: 'Title 2',
	},
	{
		title: 'Title 3',
	},
];

const Info = ({ store }) => {
	return (
		<div className='info'>
			<Title level={3}>Основная информация</Title>
			<List
				itemLayout='vertical'
				size='large'
				dataSource={listData}
				// footer={
				//   <div>
				//     <b>ant design</b> footer part
				//   </div>
				// }
				renderItem={item => (
					<List.Item
						key={item.title}
						// actions={[
						//   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
						//   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
						//   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
						// ]}
						extra={
							<img
								width={272}
								alt='logo'
								src='https://cdn1.technopark.ru/technopark/photos_resized/product/600_600/145022/1_145022.jpg'
							/>
						}
					>
						<List.Item.Meta
							avatar={<Avatar src={item.avatar} />}
							title={<span>{item.title}</span>}
							description={item.description}
						/>
						{item.content}
					</List.Item>
				)}
			/>
			<List
				grid={{ gutter: 16, column: data.length }}
				dataSource={data}
				renderItem={item => (
					<List.Item>
						<Card title={item.title}>Card content</Card>
					</List.Item>
				)}
			/>
			<Button type='primary'>Продлить подписку</Button>
		</div>
	);
};

export default inject('store')(observer(Info));
