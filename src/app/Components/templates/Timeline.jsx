var React = require('react');

var Timeline = React.createClass({

	contextTypes: {
		router: React.PropTypes.func
	},

	
	render() {

		return (
			<div>
			<aside className="col-sm-2">
				<ul>
					<li><a href="">Inventory <i className="fa fa-angle-right"></i></a></li>
					<li><Link to="/State" activeClassName="active">States <i className="fa fa-angle-right"></i></Link></li>
					<li><Link to="/Rule" activeClassName="active">Rules <i className="fa fa-angle-right"></i></Link></li>
				</ul>
			</aside>
			<div className="col-sm-10">
				<section className="right-section">
				
				{this.props.children}
				</section>
			</div>
			</div>
			);
	}
});

module.exports = Timeline;