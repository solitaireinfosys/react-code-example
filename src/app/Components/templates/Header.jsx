var React = require('react'); 
var cService=require('../../Services/CommonServices');
var Modal = require('react-bootstrap-modal');
var Slidebar=require('./Slidebar');
var loginServ=require('../../Services/LoginServices');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Action=require('../../Actions/Action');
var UserStore=require('../../Stores/UserStore');
var FacebookBtn = require('../Facebook.js');
var GoogleBtn = require('../Google.js');
var ForgotPassword = require('../ForgotPassword'); 
import {DropdownButton,MenuItem,Checkbox} from 'react-bootstrap';


var Header = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    var time;
   return {searchText:[],chkbox:[false,false,false,false,false,false,false,false,false],showForgotModal:false,opendropdown:false,userDetail:[],registerErrorMessage:[],isLoggedin:false,loginErrorMessage:[],currentDate:'',prevDate:'',nextDate:'',showSettingModal:false,showSlidebar: false,loginName:'puma@slinfy.com',loginPassword:'1234',registerEmail:'deep@slinfy.com',registerName:'deep',registerPassword:'1234'};
  },
  setTime: function(){
    var monthNames = ["JAN", "FEb", "MAR", "APR", "MAY", "JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var cDate = new Date();
    var pDate = new Date();
    var nDate = new Date();
    nDate.setDate(cDate.getDate()+1);
    pDate.setDate(cDate.getDate()-1);
    var date=cService.ordinal(cDate.getDate())+" "+monthNames[cDate.getMonth()]+" "+cDate.getFullYear();    
    this.setState({currentDate:date});
    date=cService.ordinal(pDate.getDate())+" "+monthNames[pDate.getMonth()]+" "+pDate.getFullYear();    
    this.setState({prevDate:date});
    date=cService.ordinal(nDate.getDate())+" "+monthNames[nDate.getMonth()]+" "+nDate.getFullYear();     
    this.setState({nextDate:date});
  },
  componentWillMount: function(){
      UserStore.registerUserListener(this._onRegisterUser);
      UserStore.registerUserListener(this._onLoginUser);
      UserStore.registerUserListener(this._isLoginUser);
      UserStore.registerUserListener(this._getuserDetail);
      Action.getloginstatus();
  },
  componentWillUnmount:function(){
    UserStore.removeChangeListener(this._onRegisterUser);
    UserStore.removeChangeListener(this._onLoginUser);
    UserStore.removeChangeListener(this._isLoginUser);
    UserStore.removeChangeListener(this._getuserDetail);
  },
  componentDidMount: function(){
    Action.getloginstatus();
    this.setTime();
  },
  handleTextChange: function(e) {
    var ch=e.key;
    if(ch=='Enter'){
      var urlstate=localStorage.getItem('url');
       cService.searchHandling(urlstate,this.state.searchText)
    }
  },
  onDateChange:function(date){
    console.log(date);
  },
  closeSetting:function(){
    this.setState({ showSettingModal: false });
  },
  closeRegisterModal:function(){
    this.setState({ showRegisterModal: false });
  },
  closeLoginModal:function(){
    this.setState({ showLoginModal: false });
  },
  openSetting:function(){
    this.setState({ showSettingModal: true });
  },
  openRegister:function(){
     this.setState({ showLoginModal: false });
    this.setState({registerErrorMessage:[]});
    this.setState({ showRegisterModal: true });
  },
  openLogin:function(){
     this.setState({loginErrorMessage:[]});
     this.setState({ showRegisterModal: false });
     this.setState({ showLoginModal: true });
     this.setState({ showForgotModal:false });
  },
  openForgotPopup:function(){
    this.setState({ showForgotModal: true });
    this.closeLoginModal();
  },
  showRight: function() {
    this.refs.sidebar.show();
  },
  hideRight: function() {
    this.refs.sidebar.hide();
  },
  _getuserDetail:function(){
    this.setState({userDetail:UserStore.getuserDetail()});
  },
  _onRegisterUser:function(){
    this.setState({registerErrorMessage:UserStore.getRegisterError()});
  },
  _isLoginUser:function(){
    this.setState({isLoggedin:UserStore.getloginstatus()});
    if(this.state.isLoggedin==true){
      var userData=localStorage.getItem('userData');
      this.setState({userDetail:JSON.parse(userData)});
      this.closeLoginModal();
      this.closeRegisterModal();
    }
  },
  _onLoginUser:function(){
    this.setState({loginErrorMessage:UserStore.getLoginError()});
  },
  signOut:function(){
    Action.signOut();
  },
  loginValidate:function(){
    Action.loginUser(this.state.loginName,this.state.loginPassword);
    /*var errorMessage=loginServ.loginValidate(this.state.loginName,this.state.loginPassword);
    this.setState({loginErrorMessage:errorMessage});*/
  },
  registerValidate:function(){
    Action.registerUser(this.state.registerName,this.state.registerEmail,this.state.registerPassword);
  },
  toggle: function() {
      this.setState({opendropdown:!this.state.opendropdown});
  },

  checked:function(event){
    var self=this;
    this.time=setTimeout(function(){ self.setState({opendropdown:false});}, 3000);
     this.toggle();
    this.setState({opendropdown:true});
  },
  checked1:function(index,event){
    var data=this.state.chkbox;
    data[index]=!data[index];
    this.setState({chkbox : data});
    var self=this;
    clearTimeout(this.time);
    this.time=setTimeout(function(){ self.setState({opendropdown:false});}, 3000);
    //this.setState({opendropdown:false});
  },

  render: function() {
    return (
      <div>
       
          <div className="top_header">
            <Slidebar ref="sidebar" />
            {/* this.state.showSlidebar ?  : null */}
            <div className="content_area">
              <div className="row">
                <div className="col-md-2 logo_con">
                  <a href="#"><img src="images/logo.png" alt=""/></a>
                </div>
                <div className="col-md-10 top_search">
                {this.props.headerStyle =='true' ?
                  <form>
                  
                    <div className="row">
                      {/*} <div className="col-md-3">
                        <select className="form-control">
                          <option>select</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <select className="form-control">
                          <option>select</option>
                        </select>
                      </div> */}
                 
                      <div className="col-md-3">
                        <ul className="nav navbar-nav">
                          <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Select Sport </a>
                              <ul className="dropdown-menu sport-filter">
                                <li><a href="#"><i className="ic football"></i> Football</a></li>
                                <li><a href="#"><i className="ic rugby"></i> Rugby</a></li>
                                <li><a href="#"><i className="ic boxing"></i> Boxing</a></li>
                                <li><a href="#"><i className="ic racing"></i> Racing</a></li>
                                <li><a href="#"><i className="ic football"></i> Football</a></li>
                                <li><a href="#"><i className="ic rugby"></i> Rugby</a></li>
                                <li><a href="#"><i className="ic boxing"></i> Boxing</a></li>
                                <li><a href="#"><i className="ic racing"></i> Racing</a></li>
                              </ul>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-3">
                        <ul className="nav navbar-nav">
                          <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Today <span>({this.state.currentDate})</span></a>
                            <ul className="dropdown-menu days_filter">
                              <li><a href="#" onClick={this.onDateChange.bind(this,this.state.prevDate)}>Yesterday <span>({this.state.prevDate})</span></a></li>
                              <li><a href="#">Today <span>({this.state.currentDate})</span></a></li>
                              <li><a href="#">Tomorrow <span>({this.state.nextDate})</span></a></li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Search for Team, leagues AND Matches"/>
                      </div>                
                      <div className="col-md-2 menu_toggle text-right">
                        <div className="inner_menu">
                          <a href="javaScript:void(0)"  onClick={this.openSetting} data-toggle="modal" data-target="#settingsPopup"><i className="fa fa-gear"></i></a>
                          <a href="javaScript:void(0)" onClick={this.showRight} id="openMenu"><i className="ic menu_toggle_icn"></i></a>  
                        </div>
                      </div>
                    </div>
                  </form>
                :
                  <form>
                  <div className="row">

                    {/* <div className="col-md-3">
                      <select className="form-control">
                        <option>select</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <select className="form-control">
                        <option>select</option>
                      </select>
                    </div> */}
                    <div className="col-md-6">
                      <input type="text" className="form-control main_search" placeholder="Search for Rooms, channels, Leagues, Teams, matches and more..." valueLink={this.linkState('searchText')} onKeyPress={this.handleTextChange} />
                    </div>
                      
                   <div className="col-md-3">           
                  <DropdownButton onToggle={this.checked} id='sdf' open={this.state.opendropdown} className="nav navbar-nav" title='Select Language' >
                        <MenuItem eventKey="1"><div className="checkbox">
                                          <label>
                                              <input checked={this.state.chkbox[1]} onClick={this.checked1.bind(this,1)} type="checkbox"  /><span></span> French 
                                          </label>
                                      </div></MenuItem>
                        <MenuItem eventKey="2"><div className="checkbox">
                                          <label>
                                              <input checked={this.state.chkbox[2]} onChange={this.checked1.bind(this,2)} type="checkbox"/><span></span> Malay-Indonesian 
                                          </label>
                                      </div></MenuItem>
                        <MenuItem eventKey="3" active><div className="checkbox">
                                                            <label>
                                                                <input onChange={this.checked1.bind(this,3)} checked={this.state.chkbox[3]} type="checkbox"/><span></span> Portuguese 
                                                            </label>
                                                        </div></MenuItem>
                        <MenuItem eventKey="4"><div className="checkbox">
                                                            <label>
                                                                <input onChange={this.checked1.bind(this,4)} checked={this.state.chkbox[4]} id='4' type="checkbox"/><span></span> Bengali 
                                                            </label>
                                                        </div></MenuItem>
                        <MenuItem eventKey="5"><div className="checkbox">
                                                            <label>
                                                                <input checked={this.state.chkbox[5]} onChange={this.checked1.bind(this,5)} type="checkbox"/><span></span> Arabic 
                                                            </label>
                                                        </div></MenuItem>
                        <MenuItem eventKey="6"><div className="checkbox">
                                                            <label>
                                                                <input checked={this.state.chkbox[6]} onChange={this.checked1.bind(this,6)} type="checkbox"/><span></span> Spanish 
                                                            </label>
                                                        </div></MenuItem>
                        <MenuItem eventKey="7"><div className="checkbox">
                                                            <label>
                                                                <input checked={this.state.chkbox[7]} onChange={this.checked1.bind(this,7)} type="checkbox"/><span></span> Spanish 
                                                            </label>
                                                        </div></MenuItem>
                        <MenuItem eventKey="8"><div className="checkbox">
                                                            <label>
                                                                <input  checked={this.state.chkbox[8]} onChange={this.checked1.bind(this,8)} type="checkbox"/><span></span> English 
                                                            </label>
                                                        </div></MenuItem>
                         <MenuItem eventKey="9"><div className="checkbox">
                                                            <label>
                                                                <input checked={this.state.chkbox[9]} onChange={this.checked1.bind(this,9)} type="checkbox"/><span></span> Mandarin 
                                                            </label>
                                                        </div></MenuItem>                                      
                      
                      </DropdownButton>
                  </div>


                   {/*<div className="col-md-3">
                      <ul className="nav navbar-nav">
                        <li className="button-group" >
                          <a href="#" onChange={this.checked}  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Select Language </a>
                          <ul className="dropdown-menu sport-filter language-con">
                            <li>
                              <ul>
                                <li>
                                      <div className="checkbox">
                                          <label>
                                              <input onClick={this.checked} type="checkbox" /><span></span> French 
                                          </label>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="checkbox">
                                          <label>
                                              <input type="checkbox"/><span></span> Malay-Indonesian 
                                          </label>
                                      </div>
                                  </li>
                                <li>
                                      <div className="checkbox">
                                          <label>
                                              <input type="checkbox"/><span></span> Portuguese 
                                          </label>
                                      </div>
                                  </li>
                                <li>
                                      <div className="checkbox">
                                          <label>
                                              <input type="checkbox"/><span></span> Bengali 
                                          </label>
                                      </div>
                                  </li>
                                <li>
                                      <div className="checkbox">
                                          <label>
                                              <input type="checkbox"/><span></span> Arabic 
                                          </label>
                                      </div>
                                  </li>
                                <li>
                                      <div className="checkbox">
                                          <label>
                                              <input type="checkbox"/><span></span> Russian 
                                          </label>
                                      </div>
                                  </li>
                                <li>
                                      <div className="checkbox">
                                          <label>
                                              <input type="checkbox"/><span></span> Spanish 
                                          </label>
                                      </div>
                                  </li>
                                <li>
                                      <div className="checkbox">
                                          <label>
                                              <input type="checkbox"/><span></span> Hindustani 
                                          </label>
                                      </div>
                                  </li>
                                <li>
                                      <div className="checkbox">
                                          <label>
                                              <input type="checkbox"/><span></span> English 
                                          </label>
                                      </div>
                                  </li>
                                <li>
                                      <div className="checkbox">
                                          <label>
                                              <input type="checkbox"/><span></span> Mandarin 
                                          </label>
                                      </div>
                                  </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>*/}
                    <div className="col-md-3 menu_toggle text-right">
                      {this.state.isLoggedin==false? 
                          <div className="inner_menu">
                            <a className="log_reg" onClick={this.openLogin} id="myTabs" href="javaScript:void(0)" data-toggle="modal" data-target="#profilePopup">Login</a>
                            <span>/</span>
                            <a href="javaScript:void(0)" onClick={this.openRegister} data-toggle="modal" data-target="#registerPopup" className="log_reg">Signup</a>
                          </div>
                      :
                        <div className="inner_menu">
                          <a href="javaScript:void(0)" onClick={this.signOut} data-toggle="modal" data-target="#registerPopup" className="log_reg">SignOut</a>
                        </div>
                      }
                      <div className="inner_menu">
                        <a href="javaScript:void(0)" onClick={this.openSetting} data-toggle="modal" data-target="#settingsPopup"><i className="fa fa-gear"></i></a>
                        <a href="javaScript:void(0)" onClick={this.showRight} id="openMenu"><i className="ic menu_toggle_icn"></i></a>  
                      </div>
                    </div>
                  </div>
                </form>
                }
                </div>
              </div>
            </div>
        </div>
  

      {/* Setting Popup */}
      <Modal show={this.state.showSettingModal} onHide={this.closeSetting} className="settingPopup">
          <Modal.Header closeButton>
            <Modal.Title>  <div className="modal-title settingPopup" id="myModalLabel">SETTINGS</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="settingPopup" id="settingsPopup" role="dialog" aria-labelledby="myModalLabel">
            <div className="checkbox-con">
              <label>Enable News Alerts</label>
              <input type="checkbox"/><span></span>
            </div>
            <p>Toggle news notifications by clicking the bell in the team, league and match pages</p>
            <small>Vibrate on news alerts</small>
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    When phone is set to vibrate <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                </ul>
              </li>
          </ul>
          <div className="checkbox-con">
              <label>Enable push notifications</label>
          </div>
          <small>Vibrate on score alerts</small>
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Always<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                </ul>
              </li>
            </ul>

            <h5>Help & Support</h5>
            <div className="help_sport">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            </div>
            <h5>Feedback</h5>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email Address"/>
            </div>
            <div className="form-group">
              <textarea className="form-control" placeholder="Message"></textarea>
            </div>
            <button type="submit">Submit</button>
          </div>
        </Modal.Body>      
      </Modal>

      {/* Register Popup*/}
      <Modal show={this.state.showRegisterModal} onHide={this.closeRegisterModal} className="settingPopup loginPopup">
        <span className="login">Register now</span>
         <span className="login register">Already have an account?  <a href="#" onClick={this.openLogin}>Login</a></span>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-header" >
              <h4 className="modal-title" id="myModalLabel">Explore sports experience from anywhere.</h4>
              <h5>Just by one step!</h5>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {
              this.state.registerErrorMessage!=undefined ?
                this.state.registerErrorMessage.map(function(item, i){
                  return(<p className="error" key={i}>{item}</p>);  
                })
              : null

            }

          </div>
          <div className="form-group">
            <input type="text" className="form-control"  valueLink={this.linkState('registerName')} placeholder="Username"/>
          </div>
          <div className="form-group">
            <input type="email" className="form-control" valueLink={this.linkState('registerEmail')} placeholder="Email Address"/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" valueLink={this.linkState('registerPassword')} placeholder="Password"/>
          </div>
          <div className="text-center">
            <button type="submit" onClick={this.registerValidate}>Register</button>
          </div>
          <div className="social_login">
            <h4>Register using Social Networks</h4>
              <ul className="list-inline">
               <li><FacebookBtn /></li>
              
               
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><GoogleBtn /></li>
              </ul>
          </div>
        </Modal.Body>
      </Modal>


    {/* Login Popup*/}
      <Modal show={this.state.showLoginModal} onHide={this.closeLoginModal} className="modal fade settingPopup loginPopup">
         <span className="login">Login now</span>
       <span className="login register">Don’t have an account?  <a href="#" onClick={this.openRegister}>Register</a></span>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Explore sports experience from anywhere.</h4>
              <h5>Just by one step!</h5>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
     
          <div>
            {
              this.state.loginErrorMessage!=undefined?
                this.state.loginErrorMessage.map(function(item, i){
                  return(<p className="error" key={i}>{item}</p>); 
                })
              :null
            }

          </div>
            <div className="form-group">
              <input type="email" className="form-control" valueLink={this.linkState('loginName')} placeholder="Username" />
            </div>
            <div className="form-group">
              <input type="password" valueLink={this.linkState('loginPassword')} className="form-control" placeholder="Password" />
            </div>
            <div className="text-center forgot_pass">
              <a href="javaScript:void(0)" onClick={this.openForgotPopup}>forgot password?</a>
              
            </div>
            <div className="text-center">
              <button type="submit" onClick={this.loginValidate}>Login</button>
            </div>
            <div className="social_login">
              <h4>Register using Social Networks</h4>
                <ul className="list-inline">
                  <li><FacebookBtn /></li>
                
                  <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                  <li><GoogleBtn /></li>
                </ul>
            </div>
     
        </Modal.Body>
      </Modal>
      <ForgotPassword showForgotModal={this.state.showForgotModal}/>

 
        </div>
      )
  }
      });
module.exports = Header;