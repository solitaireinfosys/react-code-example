var React = require('react');
var ChannelStore = require('../../stores/ChannelStore');
var MatchStore = require('../../stores/MatchStore');
var LeagueStore = require('../../stores/LeagueStore');
var FavLeague = require('../League/FavLeague');
var FavTeam = require('../Team/FavTeam');
var FavChannel = require('../Channel/FavChannel');
var FavMatch = require('../Match/FavMatch');
var BlockPopup = require('../BlockPopup');
var TeamStore = require('../../stores/TeamStore');
var Action = require('../../Actions/Action');
var UserStore=require('../../Stores/UserStore');
var UserProfile = require('../UserProfile.jsx');
import {Tabs, Tab} from 'react-bootstrap';



var Slidebar = React.createClass({
  show:function(){
    $(".side-menu").css("right","0");
  },
  hide:function(){
    $(".side-menu").css({right:-490});
  },
  getInitialState: function() {  
    return {isUserExist:false,userDetail:[],showBlockPopup:false,showFavChannelModal:false,showFavMatchModal:false,showFavLeagueModal:false,showFavTeamModal:false,showModal:false,teamDetails:[],leagueDetails:[],channelDetails:[],matchDetails:[],channelCount:0,leagueCount:0,teamCount:0,matchCount:0};
  },
  componentWillMount:function(){     
      Action.getloginstatus();
      this._isLoginUser();
  },
  componentDidMount: function(){
    if(this.isMounted()){
      Action.getloginstatus();
      this.getChannelRequest(this.state.channelCount);

      this.getMatchRequest(this.state.matchCount);

      this.getTeamRequest(this.state.teamCount); 

      this.getLeagueRequest(this.state.leagueCount);

      UserStore.registerUserListener(this._isLoginUser);
      UserStore.registerUserListener(this._getuserDetail);
      if(localStorage.getItem('islogin'))
        this.setState({isUserExist:true});
    }
  },
  componentWillUnmount:function(){
    UserStore.removeChangeListener(this._isLoginUser);
    UserStore.removeChangeListener(this._getuserDetail);
    ChannelStore.removeChangeListener(this._onChannelChange);
    TeamStore.removeChangeListener(this._onTeamChange); 
    MatchStore.removeChangeListener(this._onMatchChange);
     LeagueStore.removeChangeListener(this._onLeagueChange);
  },
  getChannelRequest:function(){
    Action.getChannel(this.state.channelCount,2);
    ChannelStore.addChannelChangeListener(this._onChannelChange);
    this.setState({channelCount:parseInt(this.state.channelCount)+1});
  },
  getTeamRequest:function(){
    Action.getFavTeamByUId(this.state.teamCount,2,1);
    TeamStore.addTeamChangeListener(this._onTeamChange); 
    this.setState({teamCount:parseInt(this.state.teamCount)+1});
  },
  _getuserDetail:function(){
    this.setState({userDetail:UserStore.getuserDetail()});
  },
  getMatchRequest:function(){
    Action.getFavMatchByUId(this.state.matchCount,2,1);
    MatchStore.addMatchChangeListener(this._onMatchChange);
    this.setState({matchCount:parseInt(this.state.matchCount)+1});
  },
  getLeagueRequest:function(){
    Action.getFavLeagueByUId(this.state.leagueCount,2,1);
    LeagueStore.addLeagueChangeListener(this._onLeagueChange);
    this.setState({leagueCount:parseInt(this.state.leagueCount)+1});
  },
  _onChannelChange:function(){
      this.setState({channelDetails:ChannelStore.getChannelData()});
  },
  _onMatchChange:function(){
      this.setState({matchDetails:MatchStore.getFavMatchData()});
  },
  _onTeamChange:function(){
      this.setState({teamDetails:TeamStore.getFavTeamData()});
  },
  _onLeagueChange:function(){
      this.setState({leagueDetails:LeagueStore.getFavLeagueData()});
  },
  _isLoginUser:function(){
    this.setState({isLoggedin:UserStore.getloginstatus()});
    if(this.state.isLoggedin==true){
      var userDataaa=JSON.parse(localStorage.getItem('userData'));
      var self = this;
      setTimeout(function(){
        self.setState({userDetail:userDataaa});  
       // console.log(self.state.userDetail)
      })
    }
  },
  openPopup: function() {
    this.refs.sidebar.show();
  },
  closePopup: function() {
    this.closeallPop();
    this.refs.sidebar.hide();
  },
  closeallPop:function(){
    this.setState({ showFavLeagueModal: false });
    this.setState({ showFavChannelModal: false });
    this.setState({ showFavTeamModal: false });
    this.setState({ showFavMatchModal: false });
    this.setState({ showBlockPopup: false });
    this.setState({ showModal: false });
  },
  openblockPopup:function() {
    this.closeallPop();
    this.setState({ showBlockPopup: true });
  },
  openFavLeaguePopup:function() {
    this.closeallPop();
    this.setState({ showFavLeagueModal: true });
  },

  openFavTeamPopup:function() {
    this.closeallPop();
    this.setState({ showFavTeamModal: true });
  },
  openFavChannelPopup:function() {
    this.closeallPop();
    this.setState({ showFavChannelModal: true });
  },
  openFavMatchPopup:function() {
    this.closeallPop();
    this.setState({ showFavMatchModal: true });
  },
  openProfilePopup:function() {
    //console.log('sfsdf')
    if(localStorage.getItem('islogin'))
      this.setState({ showModal : true });
    else
      this.setState({ showModal : false });
  },
  closePopup:function() {
    this.closeallPop();
    this.setState({ showModal: false });
  },

   render: function() {
      if(this.state.channelDetails!=undefined)
      if(this.state.channelDetails.length > 0){
        //console.log(this.state.channelDetails)
        var channelList = this.state.channelDetails.map(function(item, i){
          return(<li key={i}><a href="javaScript:void(0)">{item.profileName}</a></li>);},this);
      }
      if(this.state.matchDetails!=undefined)
      if(this.state.matchDetails.length>0){
        var matchList = this.state.matchDetails.map(function(item, i){
          return(<li key={i}><a href="javaScript:void(0)">{item.homeTeamName} VS {item.awayTeamName}</a></li>);},this);
      }
      if(this.state.teamDetails!=undefined)
      if(this.state.teamDetails.length > 0){
        var teamList = this.state.teamDetails.map(function(item, i){
          return(<li key={i}><a href="javaScript:void(0)">{item.teamName}</a></li>);},this);
      }
      if(this.state.leagueDetails!=undefined)
      if(this.state.leagueDetails.length>0){
        var leagueList = this.state.leagueDetails.map(function(item, i){
          return(<li key={i}><a href="#/leagueprofile/1">{item.leagueName}</a></li>);},this);
      } 
    return (
      <div>
        <div className="side-menu">
        <a href="javaScript:void(0)" className="close closeMenu" onClick={this.hide}></a>
        <div className="menu_con">
          <div className="col-xs-8">
            <img src="images/image.png" alt="" />
            <span>{this.state.userDetail!=undefined ?<a href={'#/BroadCasterProfile/'+this.state.userDetail.id}>{this.state.userDetail.username}</a>:null}</span>
          </div>
          <div className="col-xs-4 home-btns">
            <a href="javaScript:void(0)"><i className="ic home"></i></a>
            <a href="javaScript:void(0)"><i className="ic logout"></i></a>
          </div>
        </div>
        <div className="podcast-con">
          <div className="col-xs-6">
            <i className="ic listen"></i> <a href="javaScript:void(0)">Listen[<span>Live</span>]</a>
          </div>
          <div className="col-xs-6 podcast-link">
            <i className="ic podcast-icn"></i> <a href="javaScript:void(0)">Podcast</a>
          </div>
        </div>
        <div className="menu_con profile_setting">
          <div className="col-xs-4">
            <a href="javaScript:void(0)" onClick={this.openProfilePopup}>Profile</a>
            <UserProfile showModal={this.state.showModal} userDetails={this.state.userDetail} />
          </div>
          <div className="col-xs-4">
            <a href="javaScript:void(0)">setting</a>
          </div>
          <div className="col-xs-4">
            <a href="javaScript:void(0)" onClick={this.openblockPopup}>Blocklist</a>
            <BlockPopup showBlockPopup={this.state.showBlockPopup}/>
          </div>
        </div>
        <div className="panel-group menu-accordion" id="accordion">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                Select Sport</a>
              </h4>
            </div>
            <Tabs className="active" defaultActiveKey={1}>
              <Tab eventKey={1} title="Teams">
                <div className="tab-content tab_menus">
                  <div id="home" className="tab-pane fade in active">
                    <ul>
                      <li>
                        <h5>Teams</h5>
                        <ul>
                          {teamList}
                          <li className="add_more">
                            <a href="javaScript:void(0)" onClick={this.openFavTeamPopup}>Add More . .</a>
                            <FavTeam showFavTeam={this.state.showFavTeamModal} />
                          </li>
                        </ul> 
                      </li>
                    </ul>
                  </div>
                </div>
              </Tab>
              <Tab eventKey={2} title="Leagues">
                <div className="tab-content tab_menus">
                <div id="menu1" className="tab-pane fade in active">
                    <ul>
                      <li>
                        <h5>leagues</h5>
                        <ul>
                          {leagueList}
                          <li className="add_more">
                            <a href="javaScript:void(0)" onClick={this.openFavLeaguePopup}>Add More . .</a>
                            <FavLeague showFavLeague={this.state.showFavLeagueModal} />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  </div>
              </Tab>
              <Tab eventKey={3} title="Matches">
               <div className="tab-content tab_menus">
                <div id="menu2" className="tab-pane fade in active">
                    <ul>
                      <li>
                        <h5>matches</h5>
                        <ul>
                          {matchList}
                          <li className="add_more">
                            <a href={"/#/AllMatches/pageIndex="+0}>Add More . .</a>
                              <FavMatch matchData={this.state.matchDetails} showFavMatch={this.state.showFavMatchModal} />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  </div> 
              </Tab>
              <Tab eventKey={4} title="Chanels">
                <div className="tab-content tab_menus">
                    <div id="menu3" className="tab-pane fade in active">
                    <ul>
                      <li>
                        <h5>Channels</h5>
                        <ul>
                          {channelList}
                          <li className="add_more">
                            <a href="javaScript:void(0)" onClick={this.openFavChannelPopup}>Add More . .</a>
                            <FavChannel showFavChannel={this.state.showFavChannelModal} />
                          </li>
                        </ul>
                      </li>
                    </ul>
                    </div>
                  </div>
              </Tab>
            </Tabs>
            {/*<div id="collapse1" className="panel-collapse collapse in">
              <div className="panel-body internal-links">
                <ul className="nav nav-tabs">
                  <li><a href="javaScript:void(0)" className="active">Teams</a></li>
                  <li><a href="javaScript:void(0)">Leagues</a></li>
                  <li><a href="javaScript:void(0)">Matches</a></li>
                  <li><a href="javaScript:void(0)">Chanels</a></li>
                </ul>
                <div className="tab-content tab_menus">
                  <div id="home" className="tab-pane fade in active">
                    <ul>
                      <li>
                        <h5>Teams</h5>
                        <ul>
                          {teamList}
                          <li className="add_more">
                            <a href="javaScript:void(0)" onClick={this.getTeamRequest}>Add More . .</a>
                          </li>
                        </ul> 
                      </li>
                    </ul> 
                  </div>
                  <div id="menu1" className="tab-pane fade in active">
                    <ul>
                      <li>
                        <h5>leagues</h5>
                        <ul>
                          {leagueList}
                          <li className="add_more">
                            <a href="javaScript:void(0)" onClick={this.getLeagueRequest}>Add More . .</a>
                            
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div id="menu2" className="tab-pane fade in active">
                    <ul>
                      <li>
                        <h5>matches</h5>
                        <ul>
                          {matchList}
                          <li className="add_more">
                            <a href="javaScript:void(0)" onClick={this.getMatchRequest}>Add More . .</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div id="menu3" className="tab-pane fade in active">
                    <ul>
                      <li>
                        <h5>Channels</h5>
                        <ul>
                          {channelList}
                          <li className="add_more">
                            <a href="javaScript:void(0)" onClick={this.getChannelRequest}>Add More . .</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
      </div>
    );}
});

module.exports = Slidebar;