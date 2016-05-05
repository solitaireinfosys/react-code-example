var AppDispatcher = require('../dispatcher/AppDispatcher');
var Action = {

	getChannel:function(pageIndex,pageSize,sstring,date,isprev){
		AppDispatcher.dispatch({
	      actionType: 'GETCHANNEL',
	      pageIndex : pageIndex,
	      pageSize : pageSize,
	      sstring:sstring,
	      date:date,
	      isprev:isprev
	    })
	},
	getRoom:function(pageIndex,pageSize,sstring,date,isprev){
		AppDispatcher.dispatch({
	      actionType: 'GETROOM',
	      pageIndex : pageIndex,
	      pageSize : pageSize,
	      sstring:sstring,
	      date:date,
	      isprev:isprev
	    })
	},
	getTeam:function(pageIndex,pageSize,sstring,date,isprev){
		AppDispatcher.dispatch({
	      actionType: 'GETTEAM',
	      pageIndex : pageIndex,
	      pageSize : pageSize,
	      sstring:sstring,
	      date:date,
	      isprev:isprev
	    })
	},
	getNextLeague:function(lid,isnext,isfav){
		AppDispatcher.dispatch({
	    actionType:'GETNEXTLEAGUE',
	    lid:lid,
	    isnext:isnext,
	    isfav:isfav
		})
	},
	getNextTeam:function(tid,isnext,isfav){
		AppDispatcher.dispatch({
	    actionType:'GETNEXTTEAM',
	    tid:tid,
	    isnext:isnext,
	    isfav:isfav
		})
	},
	addFavMatch:function(uid,mid){
		AppDispatcher.dispatch({
	    actionType:'ADDFAVMATCH',
	    uid:uid,
	    mid:mid
		})
	},
	addFavRoom:function(uid,rid){
		AppDispatcher.dispatch({
	    actionType:'ADDFAVROOM',
	    uid:uid,
	    rid:rid
		})
	},
	addFavChannel:function(uid,cid){
		AppDispatcher.dispatch({
	    actionType:'ADDFAVCHANNEL',
	    uid:uid,
	    cid:cid
		})
	},
	addFollowChannel:function(fid,bid){
		AppDispatcher.dispatch({
	    actionType:'ADDFOLLOWCHANNEL',
	    fid:fid,
	    bid:bid
		})
	},
	delFollowChannel:function(fid,bid){
		AppDispatcher.dispatch({
	    actionType:'DELFOLLOWCHANNEL',
	    fid:fid,
	    bid:bid
		})
	},
	addLikeChannel:function(fid,bid){
		AppDispatcher.dispatch({
	    actionType:'ADDLIKECHANNEL',
	    fid:fid,
	    bid:bid
		})
	},
	addUnlikeChannel:function(fid,bid){
		AppDispatcher.dispatch({
	    actionType:'ADDUNLIKECHANNEL',
	    fid:fid,
	    bid:bid
		})
	},
	addFavLeague:function(uid,lid){
		AppDispatcher.dispatch({
	    actionType:'ADDFAVLEAGUE',
	    uid:uid,
	    lid:lid
		})
	},
	
	playerHandler:function(is,id){
		AppDispatcher.dispatch({
	    actionType:'PLAYERHANDLER',
	    is:is,
	    id:id
		})
	}

};

dispatcherIndex: AppDispatcher.register(function(payload) {
});

module.exports = Action;