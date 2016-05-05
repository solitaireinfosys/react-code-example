var React = require('react');
var ChannelStore = require('../../stores/ChannelStore');
var cons = require('../../Constants/Constants');
var Action=require('../../Actions/Action');
var LoginAndRegister=require('../LoginAndRegister');


var ChannelBox = React.createClass({
  getInitialState:function(){
    return {uid:1,isloginmodal:false,channelDetail:this.props.channelDetail };
  },
  playerHandler:function(listenLive){
    sessionStorage.setItem('listenLive',listenLive);
    Action.playerHandler('channel',2);
  },
  componentDidMount:function(){
    this.setState({uid:localStorage.getItem('userid')})
  },
  addFavChannel:function(){
    if(localStorage.getItem('islogin')){
      this.setState({isloginmodal:false});
      Action.addFavChannel(this.state.uid,this.props.channelDetail.id);
    }
    else{
      this.setState({isloginmodal:true});
    }
  },
  delFavChannel:function(){
   
    if(localStorage.getItem('islogin')){
      this.setState({isloginmodal:false});
       Action.delFavChannel(this.state.uid,this.props.channelDetail.id);
    }
    else{
      this.setState({isloginmodal:true});
    }
  },

  render: function() { 
	return (
	<div>
                  {LoginAndRegister ? <LoginAndRegister showLoginAndRegister={this.state.isloginmodal} />:null}
                  <div className={this.props.className}>
                    <div className="inner_content" style={{"backgroundImage": this.props.channelDetail.coverPhoto!=undefined ? "url("+cons.BREDCASTCOVER+this.props.channelDetail.coverPhoto+")":null}} >
                    { this.props.channelDetail.broadcastingLive ? 
                      <div className="live">
                        <span>Live</span>
                      </div> : <div className="live live1"><span /></div> 
                    }
                      
                      <div className="menu_link pull-right">
                        <a href="#">
                          <span></span>
                        </a>
                        <ul>
                          <li>{ this.props.channelDetail.isFavourite==false ? <a href="javascript:void(0)" onClick={this.addFavChannel}>Add to Favorite</a>:<a href="javascript:void(0)" onClick={this.delFavChannel}>Remove to Favorite</a>}</li>
                          <li><a href="#">Set Reminder</a></li>
                          <li><a href="#">Share</a></li>
                        </ul>
                      </div>
                      <div className="rooms_info text-left">
                        <h5><a href={'#/BroadCasterProfile/'+this.props.channelDetail.userID}>{this.props.channelDetail.profileName}</a></h5>
                        <h6>{this.props.channelDetail.followers} followers / {this.props.channelDetail.totPodcast} podcasts</h6>
                      </div>
                      <div className="btm-btns text-center">
                      { this.props.channelDetail.broadcastingLive ? 
                        <a href="javascript:void(0)" onClick={this.playerHandler.bind(this,true)}>Listen live</a> : null
                      }
                        <a href={'#/BroadCasterProfile/'+this.props.channelDetail.userID}  className="podcast">Play Podcast</a>
                      </div>
                    </div>
                  </div>
          </div>		
	
	)}
});
module.exports = ChannelBox;