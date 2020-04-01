import React from 'react';
import ItemList from './itemlist';
import { Scrollbars } from 'react-custom-scrollbars';

class ItemsList extends React.Component {

	getItems() {
		let template = null;
		if (this.props.data !== undefined) {
			template = this.props.data.map((item, i) => (
				<ItemList key={item.Id} item={{ item }} defaultSelectedItem={this.props.defaultSelectedItem} />
			));
		}

		return template;
	}
	render() {
		return (
			<Scrollbars style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden' }}>
				{this.getItems()}
			</Scrollbars>
		)
	};
}

export default ItemsList;
