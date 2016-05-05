var AppDispatcher = require('../dispatcher/AppDispatcher');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';
var LeagueServ = require('../Services/LeagueService');

var leagueList=[];
var leagueNews=[];
var leagueFixture=[];
var leaguehtoh=[];
var favdataByUId=[];
var currLeagueData=[];
var nextLeagueData=[];
var prevLeagueData=[];
var next4LeagueData=[];
var leaguearr=[];
var templid; 
var demo;
var i=0; 
var LeagueStore = assign({}, EventEmitter.prototype, {
	getLeague:function(pageIndex,pageSize)
	{       
		if(pageIndex!=undefined) 
		{
			var self =this;
			var data=LeagueServ.getLeague(pageIndex,pageSize);
			data.then(function(data){
				if(pageIndex==0)
		   			leagueList=data.leagueDetail;  
		   		else
		   			leagueList=leagueList.concat(data.leagueDetail);
		   		 self.emit(CHANGE_EVENT);
			});
		}
	},
	getLeagueNewsByLId:function(leagueid)
	{       
		var self =this;
		var data=LeagueServ.getLeagueNewsByLId(leagueid);
			data.then(function(data){
				leagueNews=data.newsByLeagueId;
		   		self.emit(CHANGE_EVENT);
			});	
	},
	getLeagueFixture:function(leagueid)	{       
		var self =this;
		var data=LeagueServ.getLeagueFixture(leagueid);
			data.then(function(data){
				leagueFixture=data.fixtureDetailsLeagueIdAndDate;
		   		self.emit(CHANGE_EVENT);
			});	
	}, 
	getFavLeagueByUId:function(pageIndex,pageSize,uid){       
		var self =this;
		var data=LeagueServ.getFavLeagueByUId(pageIndex,pageSize,uid);
		data.then(function(data){
			favdataByUId=data.favLeagueDetails;  
		    self.emit(CHANGE_EVENT);	
		});
		
	},
	getLeagueHeadtoHead:function()	{       
		var self=this;
		var data=LeagueServ.getLeagueHeadtoHead();
			/*data.then(function(data){
				//leagueFixture=data.
		   		self.emit(CHANGE_EVENT);
			});	*/	
	},
	getNextLeague:function(lid,isnext,isfav){
		var self=this;
		if(localStorage.getItem('islogin')){
			if(isnext=='first'){ 
				if(isfav==false){      		
					var data2=LeagueServ.getFavLeagueWithFStatusByUId(0,50,5);
						data2.then(function(data){
							i++;
					   		leaguearr=leaguearr.concat(data.leagueDetail);
						});
				} 
				else{
					var data2=LeagueServ.getFavLeagueWithFStatusByUId(0,leaguearr.length,5);
						data2.then(function(data){
							//i++;
					   		leaguearr=data.leagueDetail;
						});	
				}
				var data1=LeagueServ.getNextLeague(lid);
					console.log(lid)
						data1.then(function(data){
						leaguearr=leaguearr.concat(data.leagueDetail);
						leaguearr[1]=data.leagueData;
						leaguearr[0]=data.leagueData;
					});
				
				self.emit(CHANGE_EVENT); 			
			}
			else{
				if(isfav==false){
					var data2=LeagueServ.getFavLeagueWithFStatusByUId(i,50,5);
						data2.then(function(data){
							i++;
					   		leaguearr=leaguearr.concat(data.leagueDetail);
					   		self.emit(CHANGE_EVENT);
						});	
					var data1=LeagueServ.getNextLeague(lid);
					console.log(lid)
						data1.then(function(data){
						leaguearr=leaguearr.concat(data.leagueDetail);
						leaguearr[1]=data.leagueData;
						leaguearr[0]=data.leagueData;
					});
				}
				else{
					var data2=LeagueServ.getFavLeagueWithFStatusByUId(0,leaguearr.length,5);
						data2.then(function(data){
							i++;
					   		leaguearr=data.leagueDetail;
					   		self.emit(CHANGE_EVENT);
						});	
				} 
			}
		}
		else{
			if(isnext=='first'){       		
				var data2=LeagueServ.getLeague(0,50);
					data2.then(function(data){
						i++;
				   		leaguearr=leaguearr.concat(data.leagueDetail);
					}); 
				var data1=LeagueServ.getNextLeague(lid);
					console.log(lid)
						data1.then(function(data){
						leaguearr=leaguearr.concat(data.leagueDetail);
						leaguearr[1]=data.leagueData;
						leaguearr[0]=data.leagueData;
					});
				
				self.emit(CHANGE_EVENT); 			
			}
			else{
				var data2=LeagueServ.getLeague(i,50);
					data2.then(function(data){
						i++;
				   		leaguearr=leaguearr.concat(data.leagueDetail);
				   		self.emit(CHANGE_EVENT);
					});	 
			}	
		}
	},
	addFavLeague:function(uid,lid){
		var self =this;
		var data=LeagueServ.addFavLeague(uid,lid);
			data.then(function(data){
				console.log(data.success);
		   		self.emit(CHANGE_EVENT);
			});	
	},
	delFavLeague:function(uid,lid){
		var self =this;
		var data=LeagueServ.delFavLeague(uid,lid);
			data.then(function(data){
				//console.log(data)
				console.log(data.success);
		   		self.emit(CHANGE_EVENT);
			});	
	},
	getLeagueData:function(){
		return leagueList;
	},
	emitChange: function() {
	    this.emit(CHANGE_EVENT);
  	},
  	addLeagueChangeListener: function(callback) {
	    this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
    	this.removeListener(CHANGE_EVENT, callback);
  	},
	getLeagueFixturesData:function(){
		return leagueFixture;
	},
	getLeagueNewData:function(){
		return leagueNews;
	},
	getLeagueHeadData:function(){
		return leaguehtoh;
	},
	getNextLeaguedata:function(){
		//return currLeagueData;
		return leaguearr;
	},
	getNext4Leaguedata:function(){
		return next4LeagueData;
	},
	getNext1Leaguedata:function(){
		return nextLeagueData;
	},
	getPrevLeaguedata:function(){
		return prevLeagueData;
	},
	getFavLeagueData:function(){
		return favdataByUId;
	},
}); 

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case 'GETLEAGUE': LeagueStore.getLeague(action.pageIndex,action.pageSize);
      break;
    case 'LEAGUENEWSBYLID': LeagueStore.getLeagueNewsByLId(action.leagueid);
      break;
    case 'LEAGUEFIXTURE': LeagueStore.getLeagueFixture(action.leagueid);
      break;
    case 'LEAGUEHEADTOHEAD': LeagueStore.getLeagueHeadtoHead();
      break;
    case 'GETFAVLEAGUEUID': LeagueStore.getFavLeagueByUId(action.pageIndex,action.pageSize,action.uid);
      break;
    case 'GETNEXTLEAGUE': LeagueStore.getNextLeague(action.lid,action.isnext,action.isfav);
      break; 
    case 'ADDFAVLEAGUE': LeagueStore.addFavLeague(action.uid,action.lid);
      break;
    case 'DELFAVLEAGUE': LeagueStore.delFavLeague(action.uid,action.lid);
      break;
    default:
  }
  LeagueStore.emitChange();
});
module.exports = LeagueStore;