var React = require('react');
var Audio5js = require('audio5');
var Slider  = require("bootstrap-slider");
var audio5js;
var mySlider;
var isupdate = true;
var PlayerStore=require('../../Stores/PlayerStore');
var cons=require('../../Constants/Constants');
var Action=require('../../Actions/Action');
var Chat1=require('../Chat1.js'); 
var cons = require('../../Constants/Constants.js'); 

var Footer = React.createClass({
 getInitialState: function() {  
    return {listenlive:false,bDetails:[],mDetails:[],showChatPopup:false,player_pos:0, playerDuration:0,podcastList:[],podcastCount:0,playing_status:false,isplayeron:false};
  },
  componentWillMount:function(){
  	if(sessionStorage.getItem('isplayer')){
			Action.playerHandler(sessionStorage.getItem('podcastfor'),sessionStorage.getItem('podcastid'))
		} 
  },
  componentWillUnmount:function(){
    PlayerStore.removeChangeListener(this._onPodcastChange);
    PlayerStore.removeChangeListener(this._onPlayerChange);
  },
  componentDidMount:function() {
  	var data=sessionStorage.getItem('matchDetail');
    var listen=sessionStorage.getItem('listenLive');
    this.setState({listenlive:listen});
    var data1=JSON.parse(data);
    this.setState({mDetails:data1});
  	PlayerStore.addChangeListener(this._onPodcastChange);
  	PlayerStore.addChangeListener(this._onPlayerChange);
    //this.initAudio()
    //this.initSlider() 
  },
  componentWillReceiveProps:function(next,prev){
    if(next.bDetail==undefined){
      var data=sessionStorage.getItem('channelDetail');
       this.setState({bDetails:data})
    }
    else{
      this.setState({bDetails:next.bDetail})
      sessionStorage.setItem('channelDetail',JSON.stringify(next.bDetail));
    }
  },
  _onPlayerChange:function(){
  		this.setState({isplayeron:PlayerStore.isPlayerOn()});
  		if(this.state.isplayeron){
  		//	this.loadnext(this.state.podcastList[0]);
        this.initSlider()
  		}
  },
  _onPodcastChange:function(){
  		this.setState({podcastList:PlayerStore.getpodcast()});
  },
  loadnextPodcast:function(){
  	this.setState({podcastCount:this.state.podcastCount+1});
  	this.loadnext(podcastList[this.state.podcastCount]);
  },
  loadnext:function(src) {
  	console.log(cons.PODCASTPATH+src)
    audio5js.load(cons.PODCASTPATH+src);
    audio5js.one('canplay', function () {
      audio5js.play()
    }, this);
  },

  initAudio:function() {
    var self=this;
    audio5js = new Audio5js({
      ready: function () {
        //this.load(src);
        this.on('timeupdate', function (position, duration) {
            self.updateSlider(position, duration)
        }, this)
        this.on('seeking',function(){
          audio5js.pause();
        })
        this.on('seeked ',function(){
          audio5js.play();
        })
      }
    });
  },
  initSlider:function(){
    var self = this;
    mySlider = new Slider("#ex1", {    
    });
    mySlider.setValue(0)
     mySlider.on('change',  function(slideEvt){
      self.seekSlider(slideEvt.newValue)
     })
     mySlider.on('slideStop',  function(slideEvt){
       audio5js.play()
     })
     mySlider.on('slide',  function(slideEvt){
      audio5js.pause()
     })
  },
  seekSlider:function(position){
    var sett;
    if(position > 0){
      isupdate = false;  
      clearTimeout(sett) ;
    }
    var self = this;
    audio5js.seek(position)
    this.setState({player_pos:position})
    mySlider.setValue(position)
    sett = setTimeout(function(){
      isupdate= true
    }, 1000)
  },
  seekAudio:function(direction){
    var self = this;
    
    var seekpos
    if(direction == '>'){
      seekpos =self.state.player_pos + (self.state.playerDuration/100)
      console.log(seekpos+ '>')
    }
    else if(direction == '<'){
      seekpos =self.state.player_pos - (self.state.playerDuration/100)
      console.log(seekpos+ '<')
    }
    if(seekpos > self.state.playerDuration){
     seekpos = classself.state.playerDuration; 
    }
    self.seekSlider(seekpos)
  },
  updateSlider:function(position, duration) {
    if(isupdate){
      var a = position.split(':'); // split it at the colons
      if(a.length >2){
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
      }
      else{
        var seconds = (+a[0]) * 60 + (+a[1]); 
      }
    var pos = seconds;
    mySlider.setAttribute('max',duration)
    mySlider.setValue(pos)
    console.log(pos, position)
    this.setState({playerDuration:duration,player_pos:pos})
    }
  },
  getremainingTime:function(){
    var time = this.state.playerDuration-this.state.player_pos
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = parseFloat(time % 60).toFixed(0);
    var ret = "";
    if (hrs > 0)
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  },
  getCurrentTime:function(){
     var time = this.state.player_pos
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = parseFloat(time % 60).toFixed(0);
    var ret = "";
    if (hrs > 0)
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  },

  playproadCast: function(){
      if(audio5js.playing){
        audio5js.pause();
        this.setState({playing_status:false})
      }
      else{
        audio5js.play();
        this.setState({playing_status:true})
      }
    },
  chatOnPopup:function(){
    this.setState({showChatPopup:!this.state.showChatPopup})
  },
   
  render: function() {
      return (
        <div>
        { this.state.isplayeron==false ?
     	   <section className="footer_content">
			    <div className="row footer">
			      <div className="col-md-12 text-center inner-footer">
			        <ul className="list-inline">
			          <li> <a href="#"><i className="fa fa-facebook"></i></a> </li>
			          <li> <a href="#"><i className="fa fa-twitter"></i></a> </li>
			          <li> <a href="#"><i className="fa fa-google-plus"></i></a> </li>
			        </ul>
			        <p className="text-center">&copy;Pundit Ltd 2015 All rights reserved.</p>
			      </div>
			    </div>
			</section>

		:
			 <div className="player_con ">
    
       {this.state.listenlive==false ?
  				  <div className="player-controls">
  				    <div className="top_control">
  				      <span className="icn pre_icn">
  				        {/*<a onClick={this.loadnext.bind(this,'http://kintespace.com/swf_audio/arundhati_roy0/mp3/10%20We%20Be%20Many;%20They%20Be%20Few.mp3')}></a>*/}
  				        <a onClick={this.seekAudio.bind(this, '<')}></a>
  				      </span>
  				      <span className="play_btn">
  				        <a onClick={this.playproadCast}>
  				          <i className={this.state.playing_status ? "ic play pause" : "ic play"}></i>
  				        </a>
  				      </span>
  				      <span className="icn next_icn">
  				        {/*<a onClick={this.loadnextPodcast}></a>*/}
  				        <a onClick={this.seekAudio.bind(this, '>')}></a>
  				        
  				      </span>
  				    </div>
  				    <div className="bottom_control">
  				      <span className="pull-left">{this.getCurrentTime()}</span>
  				      <span className="pull-right"> - {this.getremainingTime()}</span>
  				      <input id="ex1" type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="0" data-slider-toolti="false"/>
  				    </div>
  				  </div>
          :
             <div className="player-controls">
              <div className="top_control">
                <span className="player_waves"></span>
                <a href="#" className="sound"><i className="fa fa-microphone-slash"></i></a>
                <a href="#" className="play-stop"><i className="fa fa-stop"></i></a>
              </div>
              <div className="bottom_control">
                <span className="pull-left">14 mins 50 sec</span>
              </div>
            </div>
          }
				  <div className="inner_con">
				    <div className="hash_tags">
				      <h4>{this.state.mDetails.leagueName}</h4>
				      <ul className="list-inline">
				        <li>iamstokecitysupporter</li>
				        <li>soccerplayer</li>
				      </ul>
				    </div>
				    <div className="current_match">
				      <div className="team_con left_side">
				        <a href="#"></a>
				        <span>{this.state.mDetails.homeTeamName}</span>
				        <img src={cons.TEAMLOGO+sessionStorage.getItem('homeTeamDetail')} style={{"height":"50px","width":"50px"}} alt="" />
				      </div>
				      <div className="score_con">
				        <span>{this.state.mDetails.homeTeamRank} - {this.state.mDetails.awayTeamRank}</span>
				      </div>
				      <div className="team_con right_side">
				        <img src={cons.TEAMLOGO+sessionStorage.getItem('awayTeamDetail')} style={{"height":"50px","width":"50px"}} alt="" />
				        <span>{this.state.mDetails.awayTeamName}</span>
				        <a href="javascript:void(0)" onClick={this.loadnextPodcast}></a>
				      </div>
				    </div>
				  </div>
				  <div className="chat_con">
				    <div className="top_bar">
				      <ul className="list-inline pull-left">
				        <li>
				          <a href="javascript:void(0)" onClick={this.chatOnPopup} className="chat_icn">
				            <span>12</span>
				          </a>
                   { Chat1 ? <Chat1  uname='DEEP' showChatbar={this.state.showChatPopup} /> : null }
				        </li>
				        <li>
				          <a href="#" className="listeners">445 Listners</a>
				        </li>
				      </ul>
				      <ul className="list-inline pull-right">
				        <li>
				          <a href="#" className="user_add"></a>
				        </li>
				        <li>
				          <a href="#" className="like_icns">{this.state.bDetails.likes}</a>
				        </li>
				        <li>
				          <a href="#" className="share_icn">{this.state.bDetails.shares}</a>
				        </li>
				      </ul>
				    </div>
				    <div className="top_rated">
				      <div className="left_bar">
				        <img src="images/logo7.png" alt="" />
				      </div>
				      <div className="right_bar">
				        <h5>{this.state.bDetails.profileName}</h5>
				        <h6>{this.state.bDetails.followers} followers</h6>
				      </div>
				      <a href="#"><span></span></a>
				    </div>
				  </div>
				</div> 		
		}

        </div>
      );
  }
});
module.exports = Footer;