var React = require('react');
var RoomBox = require('../Components/Room/RoomBox.js');  
var RoomStore = require('../stores/RoomStore');
var ChannelStore = require('../stores/ChannelStore');
var ChannelBox = require('../Components/Channel/ChannelBox.js');  
var MatchStore = require('../stores/MatchStore');
var MatchBox = require('../Components/Match/MatchBox.js');  
let Header = require('./templates/Header.jsx');
var Action = require('../Actions/Action');
let Footer = require('./templates/Footer.jsx');


var Home = React.createClass({
  getInitialState: function() {  
    return {roomDetails:[],channelDetails:[],matchDetails:[]};
  },
  componentWillMount:function(){
     Action.getChannel(0,8);
     ChannelStore.addChannelChangeListener(this._onChannelChange);

     Action.getRoom(0,4);
     RoomStore.addRoomChangeListener(this._onRoomChange);

     Action.getMatch(0,4);
     MatchStore.addMatchChangeListener(this._onMatchChange);
  },
  componentWillUnmount:function(){
    MatchStore.removeChangeListener(this._onMatchChange);
    RoomStore.removeChangeListener(this._onRoomChange);
    ChannelStore.removeChangeListener(this._onChannelChange);
  },
  componentDidMount:function(){
    localStorage.setItem('url','Home');
  },


  _onChannelChange:function(){
      this.setState({channelDetails:ChannelStore.getChannelData()});
  },
  _onRoomChange:function(){
      this.setState({roomDetails:RoomStore.getRoomData()});
  }, 
  _onMatchChange:function(){
      this.setState({matchDetails:MatchStore.getMatchData()});
  },
 
  render: function() {
      if(this.state.roomDetails!=undefined)
      if(this.state.roomDetails.length>0){
        var roomList = this.state.roomDetails.map(function(item, i){
         return(<RoomBox key={i} className="col-md-12" roomDetail={item} />);},this);
      }
      if(this.state.channelDetails!=undefined)
      if(this.state.channelDetails.length > 0){
        var channelList = this.state.channelDetails.map(function(item, i){
          return(<ChannelBox className="col-md-6" key={i} channelDetail={item}/>);},this);  
      }
      if(this.state.matchDetails!=undefined)
      if(this.state.matchDetails.length>0){
        var matchList = this.state.matchDetails.map(function(item, i){
          return(<MatchBox showDelete={false} key={i} className="col-md-12" matchDetail={item} />);},this);  
      }
        
      return (
        <div>
          {Header ? <Header headerStyle='false' /> : null }
         
            <div className="content-container content_area rooms">
            <div className="row">
              <div className="col-md-3 rooms_more">
                <div className="row">
                  <div className="col-md-12">
                    <h2>
                      <span>Rooms</span>
                      <a href={'#/allRooms/pageIndex='+0}>More</a>
                    </h2>
                    {roomList}
                  </div>
                </div>
              </div>        


              <div className="col-md-6 channels-container">
                <div className="row">
                    <div className="col-md-12">
                      <h2>
                        <span>Channels</span>
                          <a href={'#/allChannels/pageIndex='+0}>More</a>
                      </h2>   
                       <div className="row">
                        {channelList}
                        </div>
                    </div>
                </div>
              </div>


            <div className="col-md-3 match-container">
              <div className="row">
                <div className="col-md-12">
                  <h2>
                    <span>Match</span>
                    <a href={'#/allMatches/pageIndex='+0}>More</a>
                  </h2>
                  {matchList}
                </div>
              </div>
            </div>    
 



             </div>
            </div>   
           <Footer />
        </div>
      )
  }

});
module.exports = Home;