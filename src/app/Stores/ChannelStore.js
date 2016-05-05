var AppDispatcher = require('../dispatcher/AppDispatcher');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';
var ChannelServ=require('../Services/ChannelService')
var cServ = require('../Services/CommonServices');
var isMoreRecord=false;
var channelList=[];
var pSize=0;
var pIndex=0;
var ChannelStore = assign({}, EventEmitter.prototype, {
	
	getChannel:function(pageIndex,pageSize,sstring,date,isprev)
	{  
		pIndex=pageIndex;
		pSize=pageSize;
		if(pageIndex!=undefined)
		{
			var self =this;
			var data=ChannelServ.getChannel(pageIndex,pageSize,sstring,date,isprev);
			data.then(function(data){
				if(pageIndex==0)
					channelList=data.broadcasterList;  
				else
			   		channelList=channelList.concat(data.broadcasterList);  
			   	isMoreRecord=cServ.moreRecords(data.totalRecords,pageIndex,pageSize);
		   		 self.emit(CHANGE_EVENT);
			});
		}
	},
	addFollowChannel:function(fid,bid){
		var self =this;
		var data=ChannelServ.addFollowChannel(fid,bid);
			data.then(function(data){
				console.log(data);
		   		self.emit(CHANGE_EVENT);
			});	
		this.getChannel(pIndex,pSize);
	},
	delFollowChannel:function(fid,bid){
		var self =this;
		var data=ChannelServ.delFollowChannel(fid,bid);
			data.then(function(data){
				console.log(data);
		   		self.emit(CHANGE_EVENT);
			});	
		this.getChannel(pIndex,pSize);
	},
	addFavChannel:function(uid,cid){
		var self =this;
		var data=ChannelServ.addFavChannel(uid,cid);
			data.then(function(data){
				console.log(data);
		   		self.emit(CHANGE_EVENT);
			});	
		this.getChannel(pIndex,pSize);
	},
	delFavChannel:function(uid,cid){
		var self =this;
		var data=ChannelServ.delFavChannel(uid,cid);
			data.then(function(data){
				//console.log(data)
				console.log(data);
		   		self.emit(CHANGE_EVENT);
			});	
		this.getChannel(pIndex,pSize);
	},
	addLikeChannel:function(uid,cid){
		var self =this;
		var data=ChannelServ.addLikeChannel(uid,cid);
			data.then(function(data){
				console.log(data);
		   		self.emit(CHANGE_EVENT);
			});	
		this.getChannel(pIndex,pSize);
	},
	addUnlikeChannel:function(uid,cid){
		var self =this;
		console.log(uid)
		var data=ChannelServ.addUnlikeChannel(uid,cid);
			data.then(function(data){
				//console.log(data)
				console.log(data);
		   		self.emit(CHANGE_EVENT);
			});	
		this.getChannel(pIndex,pSize);
	},
	getChannelData:function(){
		return channelList;
	},
	getChannelByRoomId:function(roomId)
	{ 
		var data=ChannelServ.getChannelByRoomId(roomId);
		return data;
	},
	emitChange: function() {
	    this.emit(CHANGE_EVENT);
  	},
  	addChannelChangeListener: function(callback) {
	    this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	}, 
	getMoreRecords:function(){
		return isMoreRecord; 
	},
});



AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case 'GETCHANNEL': ChannelStore.getChannel(action.pageIndex,action.pageSize,action.sstring,action.date,action.isprev);
      break;
    case 'ADDFOLLOWCHANNEL': ChannelStore.addFollowChannel(action.fid,action.bid);
      break;
    case 'DELFOLLOWCHANNEL': ChannelStore.delFollowChannel(action.fid,action.bid);
      break; 
    case 'ADDFAVCHANNEL': ChannelStore.addFavChannel(action.uid,action.cid);
      break;
    case 'DELFAVCHANNEL': ChannelStore.delFavChannel(action.uid,action.cid);
      break; 
    case 'ADDLIKECHANNEL': ChannelStore.addLikeChannel(action.fid,action.bid);
      break;
    case 'ADDUNLIKECHANNEL': ChannelStore.addUnlikeChannel(action.fid,action.bid);
      break; 
    default:
  }
  ChannelStore.emitChange();
});


module.exports = ChannelStore;