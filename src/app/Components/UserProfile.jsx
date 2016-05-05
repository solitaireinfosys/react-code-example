var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Modal = require('react-bootstrap-modal');
var DataServ = require('../Services/DataService');
var ChannelStore = require('../stores/ChannelStore');
var Action = require('../Actions/Action');

var UserProfile = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {  
    return {countryData:[],show:this.props.showModal,coverImg:'images/cover.png',profileImg:'images/pro_logo.png',sname:'',bio:'',email:'',country:'',oldpass:'',newpassword:'',confrmpass:'',turl:'',furl:'',gpurl:''};
  },
  componentDidMount:function(){
    var self=this;
    DataServ.getData('data/countries.json').then(function(data){
      if(self.isMounted()) {
        self.setState({countryData:data});   
      }      
    });
   },
  componentWillReceiveProps:function(next,prev){
      this.setState({show:next.showModal});
      this.setState({userDetail:next.userDetails});
      if(this.state.userDetail!=undefined){
        this.setState({email:this.state.userDetail.email});
        this.setState({sname:this.state.userDetail.username});
      } 
   },  
  closeModal:function(){
    this.setState({show:false});
  },
  uploadPic:function(e){
    this.setState({coverImg:this.refs.coverFile.value});
  },
  uploadPic1:function(e){
    this.setState({profileImg:this.refs.profileFile.value});
  },
  updateData:function(){
    var data=localStorage.getItem('userData');
    var jsondata=JSON.parse(data);
    var uid=jsondata.id;
    Action.userData(this.state.sname,this.state.bio,this.state.email,this.state.country,this.state.oldpass,this.state.newpassword,this.state.confrmpass,this.state.turl,this.state.furl,this.state.gpurl,uid); 
  },
  _getuserDetail:function(){
    this.setState({userDetail:this.props.userDetails});
  },
  render: function(){
   return(
      <div>
         <Modal show={this.state.show} onHide={this.closeModal} className="modal fade settingPopup profile_popup">
          <Modal.Header closeButton>
            <Modal.Title>  <div className="modal-title settingPopup" id="myModalLabel"><h4 className="modal-title" id="myModalLabel">Update profile</h4></div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="cover_photo">
                    <h5>Cover Photo</h5>
                    <div className="cover_con">
                      <img id="blah" src={this.state.coverImg} alt="your image" />
                      <input ref="coverFile" type='file' id="imgInp" onChange={this.uploadPic} onclick="readURL(this)" />
                      <span>Upload File</span>
                    </div>
                  </div>
                  <div className="profile_photo">
                    <h5>Profile Photo</h5>
                    <div className="inner_profile">
                      <div className="profile_con">
                      <img id="blah1" src={this.state.profileImg} alt="your image" />
                      <input ref="profileFile" type='file' id="imgInp1" onChange={this.uploadPic1} onclick="read1URL(this)" />
                      <span></span>
                      </div>
                    </div>
                  </div>
                  <div className="screen_name">
                    <label>Screen Name :</label>
                    <input type="text" valueLink={this.linkState('sname')} placeholder="Screen Name" />
                  </div>
                  <h5>Bio</h5>
                  <div className="form-group">
                    <textarea valueLink={this.linkState('bio')} className="form-control" placeholder="Message"></textarea>
                  </div>
                  <h5>Links</h5>
                  <ul className="nav nav-tabs social_links">
                    <li className="active">
                      <a data-toggle="tab" href="#menuf">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#menut">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li><a data-toggle="tab" href="#menug"><i className="fa fa-google-plus"></i></a></li>
                  </ul>

                  <div className="tab-content">
                    <div id="menuf" className="tab-pane fade in active">
                      <input type="text" valueLink={this.linkState('furl')} className="form-control" placeholder="Facebook Link" />
                    </div>
                    <div id="menut" className="tab-pane fade">
                      <input type="text" valueLink={this.linkState('turl')} className="form-control" placeholder="Twitter Link" />
                    </div>
                    <div id="menug" className="tab-pane fade">
                      <input type="text" className="form-control" valueLink={this.linkState('gpurl')} placeholder="Google Plus Link" />
                    </div>
                  </div>
                  <h5>Email Address</h5>
                  <div className="form-group">
                    <input type="email" valueLink={this.linkState('email')} className="form-control" placeholder="Email Address" />
                  </div>
                  <h5>Country</h5>
                  <div className="form-group">
                   <select className="form-control" valueLink={this.linkState('country')}>
                      { this.state.countryData.map(function(item,i){
                         return( <option key={i} value={item.name}>{item.name} </option>)
                        })
                      }
                    </select>
                  </div>
                  <h5>Change Password</h5>
                  <div className="form-group">
                    <input type="password" valueLink={this.linkState('oldpass')} className="form-control" placeholder="Old Password" />
                  </div>
                  <div className="form-group">
                    <input type="password" valueLink={this.linkState('newpassword')} className="form-control" placeholder="New Password" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" valueLink={this.linkState('confrmpass')} placeholder="Confrm Password" />
                  </div>
                  <button type="submit" onClick={this.updateData}>Update</button>
        </Modal.Body>      
       </Modal>
      </div>
    );}
});
module.exports = UserProfile;