var React = require('react');
var LeagueStore = require('../../stores/LeagueStore');
//var Socket = require('react-socket').Socket;



/*var socket = require('socket.io-client')('https://api.github.com/users/deepkumar1343');
socket = io.connect('localhost', {
    port: 1337
});

  socket.on('connect', function(){console.log("connected")});
  socket.on('event', function(data){console.log("connected")});
  socket.on('disconnect', function(){console.log("connected")});*/




var LeagueBox = React.createClass({
    getInitialState: function() {  
       return {LeagueDetails:[]};
    },

    leaguedetailfun:function()
    {
        var self=this;
        console.log();
        var LeagueDetail=LeagueStore.getLeague("data/leagueDetail.json");
         LeagueDetail.then(function(data){
            self.setState({LeagueDetails:data.leagueDetail})    
         });                
    },

    componentDidMount:function()
    {
      this.leaguedetailfun();                
    },
    demo:function()
    {
       console.log("asdfg");
    },


 render: function() {
   var List = this.state.LeagueDetails.map(function(item, i){
      return(<li key={i}> {item.leagueName} </li>);},this);
	return (
	<div>
   <h3> League Details {List}</h3>
      {/*<Socket.Socket url="data/leagueDetail.json" name="a"/>
      <Socket.Event socket="a" name="foo" callback={ this.demo }/>*/}
        
	</div>
	)}
});
module.exports = LeagueBox;