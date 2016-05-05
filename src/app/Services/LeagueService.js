var cons = require('../Constants/Constants.js'); 
var DataServ = require('../Services/DataService.js'); 
module.exports =  {
  getLeague: function(pageIndex,pageSize) {
    /*var data=DataServ.getData(cons.IPADD+cons.LEAGUELIST); 
    return data;*/
    var tempUrl=cons.IPADD+cons.LEAGUELIST;
  	tempUrl+=pageIndex+"&pageSize="+pageSize;
    var data=DataServ.getData(tempUrl); 
    return data;
  },
  getLeagueNewsByLId:function(leagueid){
  	var data=DataServ.getData(cons.IPADD+cons.LEAGUENEWSBYLID+leagueid); 
    return data;
  }, 
  getFavLeagueWithFStatusByUId:function(pageIndex,pageSize,uid) {
    console.log(cons.IPADD+cons.LEAGUEWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex)
    var data=DataServ.getData(cons.IPADD+cons.LEAGUEWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex); 
    return data;
  }, 
  addFavLeague:function(uid,lid){
    var data={};
    var data=DataServ.postData(cons.IPADD+cons.ADDFAVLEAGUE+uid+'&leagueid='+lid,data); 
    return data;
  },
  delFavLeague:function(uid,lid){
    var data={};
    var data=DataServ.postData(cons.IPADD+cons.DELFAVLEAGUE+uid+'&leagueid='+lid,data); 
    return data;
  },
  getLeagueByPaggination:function(pageIndex,pageSize) {
    var tempUrl=cons.IPADD+cons.LEAGUELISTBYPAG;
    tempUrl+="&pageNumber="+pageIndex+"&pageSize="+pageSize;
    var data=DataServ.getData(tempUrl); 
    return data;
  },
    
  getLeagueFixture:function(leagueid){
  	var data=DataServ.getData(cons.IPADD+cons.LEAGUEFIXTURE+leagueid); 
    return data;
  },
  getLeagueHeadtoHead:function(){
  	/*var data=DataServ.getData(cons.IPADD+cons.   ); 
    return data;*/
    console.log('getLeagueHeadtoHead');
    return 'data'
  },
  getFavLeagueByUId:function(pageIndex,pageSize,uid) {
    var data=DataServ.getData(cons.IPADD+cons.FAVLEAGUEBYUID+pageSize+"&id="+uid+"&pageNumber="+pageIndex); 
    return data;
  }, 
  getNextLeague:function(lid) {
    var data=DataServ.getData(cons.IPADD+cons.LEAGUEDETAILBYLID+lid); 
    return data;
  },
  getLeagueTable:function(lid) {
    var data=DataServ.getData(cons.IPADD+cons.LEAGUETABLE+lid); 
    return data;
  },
}

