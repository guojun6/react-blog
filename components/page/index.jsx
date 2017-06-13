import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import style from './page.scss';

class Page extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired
	}
	// getInitialState(a) {
	// 	console.log(a, this.props, this.state);
	// }
	// getDefaultProps(a) {
	// 	console.log(a, this.props, this.state);
	// }
	componentDidMount() {
		// console.log(this.props.title);
		document.title = this.props.title;
	}
	render() {
		const {
			title,
			className,
			...props
		} = this.props
		return (
			<article className={classnames(style['ctn'], className)} {...props}>
				{this.props.children}
			</article>
		);
	}
}

export default Page;