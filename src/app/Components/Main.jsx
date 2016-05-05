var React = require('react');
let  ReactCSSTransitionGroup = require('react-addons-css-transition-group');
let StaticContainer = require('react-static-container');
var { createHistory, useBasename } =require('history');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var { Route, RouteHandler, IndexRoute, Link, History } = ReactRouter;
var Router = ReactRouter.Router;
var Navigation = ReactRouter.Navigation;	


class RouteCSSTransitionGroup extends React.Component {
	static contextTypes = {
		location: React.PropTypes.object
	}
	constructor(props, context) {
		super(props, context)
		this.state = {
			previousPathname: null
		}
	}
	mixins: [History]
	render() {
		const { children, ...props } = this.props
		const { previousPathname } = this.state

		return (
			<StaticContainer
			key={previousPathname || this.context.location.pathname}
			shouldUpdate={!previousPathname}
			>
			{children}
			</StaticContainer>
			)
	}
	componentDidUpdate() {
		if (this.state.previousPathname) {
			this.setState({ previousPathname: null })
		}
	}
}

var Main= React.createClass({
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps.routes)
		localStorage.setItem('url',nextProps.routes[2].name);
	},
	render(){
		const { pathname } = this.props.location
		return(
			<div>
			 <section className="main_content">
				<div className="main container-fluid ">
				<section className="main_section row">
				<RouteCSSTransitionGroup component="div" transitionName="example" className="layout-vertical"
					transitionEnterTimeout={500} transitionLeaveTimeout={500}
					>
				{React.cloneElement(this.props.children || <div/>, { key: pathname })}
				</RouteCSSTransitionGroup>
				</section>
				</div>
			</section>
			</div>
			)
	}
});


let Login = require('./Login.jsx');
let Home = require('./Home.jsx');
let AllChannel = require('./Channel/AllChannel.js');
let AllRoom= require('./Room/AllRoom.js');
let AllMatch= require('./Match/AllMatch.js');
let BroadCasterProfile = require('./BroadCasterProfile.js');
let ResetPassword = require('./ResetPassword.js');
let LeagueProfile = require('./League/LeagueProfile');
let MatchProfile = require('./Match/MatchProfile');
let TeamProfile = require('./Team/TeamProfile');


var routes = (
	<Router history={history}>
		<Route path="/" component={Main} name="Main">
			<IndexRoute component={Home} name="Home"/> 
			<Route path="/" component={Timeline} name="Timeline">
				<Route name="Login" path="/login" component={Login}/>
			
			</Route>
		    <Route name="BroadCasterProfile" path="/BroadCasterProfile/:bid" component={BroadCasterProfile}/>

			<Route name="AllChannel" path="/AllChannel/:roomId" component={AllChannel}/>
			<Route name="AllChannel" path="/AllChannels/pageIndex=:pageIndex" component={AllChannel}/>


			<Route name="AllRoom" path="/AllRooms/pageIndex=:pageIndex" component={AllRoom}/>
			<Route name="ResetPassword" path="/resetpassword" component={ResetPassword}/>

			<Route name="AllMatch" path="/AllMatches/pageIndex=:pageIndex" component={AllMatch}/>

			<Route name="LeagueProfile" path="/leagueprofile/:lid" component={LeagueProfile}/>
			<Route name="TeamProfile" path="/teamprofile/:tid" component={TeamProfile}/>
			<Route name="MatchProfile" path="/matchprofile/:mid" component={MatchProfile}/>
			
		</Route>
	</Router>
	);

ReactDOM.render(<Router>{routes}</Router>,  document.getElementById('app'))