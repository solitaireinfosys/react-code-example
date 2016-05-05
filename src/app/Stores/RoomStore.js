var AppDispatcher = require('../dispatcher/AppDispatcher');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';
var RoomServ = require('../Services/RoomService');
var cServ = require('../Services/CommonServices');

var roomList=[];
var isMoreRecord=false;
var pIndex=0;
var pSize=0;
var RoomStore = assign({}, EventEmitter.prototype, {
	getRoom:function(pageIndex,pageSize,sstring,date,isprev)
	{
		pIndex=pageIndex;
		pSize=pageSize;
		if(pageIndex!=undefined)
		{
			var self =this;
			var data=RoomServ.getRooms(pageIndex,pageSize,sstring,date,isprev);
			data.then(function(data){
				if(pageIndex==0){
					isMoreRecord=cServ.moreRecords(data.totalRecords,pageIndex,pageSize);
					roomList=data.roomList;  
				}
				else{
					isMoreRecord=cServ.moreRecords(data.totalRecords,pageIndex,pageSize);
		   			roomList=roomList.concat(data.roomList);  
		   		}
		   		 self.emit(CHANGE_EVENT);
			});
		}
	},
	addFavRoom:function(uid,rid){
		var self =this;
		var data=RoomServ.addFavRoom(1,rid);
			data.then(function(data){
				console.log(data);
		   		self.emit(CHANGE_EVENT);
			});
		this.getRoom(pIndex,pSize);	
	},
	delFavRoom:function(uid,rid){
		var self =this;
		var data=RoomServ.delFavRoom(1,rid);
			data.then(function(data){
				//console.log(data)
				console.log(data);
		   		self.emit(CHANGE_EVENT);
			});	
		this.getRoom(pIndex,pSize);	
	},

	getRoomData:function(){
		return roomList;
	},
	emitChange: function() {
	    this.emit(CHANGE_EVENT);
  	},
  	addRoomChangeListener: function(callback) {
	    this.on(CHANGE_EVENT, callback);
	},
	getMoreRecords:function(){
		return isMoreRecord; 
	},
	removeChangeListener: function(callback) {
    	this.removeListener(CHANGE_EVENT, callback);
  	},

});
 

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case 'GETROOM': RoomStore.getRoom(action.pageIndex,action.pageSize,action.sstring,action.date,action.isprev);
      break;
    case 'ADDFAVROOM': RoomStore.addFavRoom(action.uid,action.rid);
     break;
    case 'DELFAVROOM': RoomStore.delFavRoom(action.uid,action.rid);
     break;
    default:
  }
  RoomStore.emitChange();
});


module.exports = RoomStore;