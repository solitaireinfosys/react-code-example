var cons = require('../Constants/Constants.js'); 
var DataServ = require('../Services/DataService.js'); 
module.exports =  {
  getChannel: function(pageIndex,pageSize,sstring,sdate,isprev) { 	  
    var uid=localStorage.getItem('userid');
    var islogin=localStorage.getItem('islogin');
    if((sstring=='' || sstring==undefined) && (sdate=='' || sdate==undefined)){
      if(islogin){
        var data=DataServ.getData(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex); 
        //console.log(cons.IPADD+cons.ROOMWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex)
        return data;
      }
      else{
        var tempUrl=cons.IPADD+cons.CHANNELLIST;
        tempUrl+="&pageNumber="+pageIndex+"&pageSize="+pageSize;
        var data=DataServ.getData(tempUrl); 
        return data;
      }
    }
    else{ //searching part
      if(sdate=='' || sdate==undefined){
        if(islogin){
          var data=DataServ.getData(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex+"&searchString="+sstring); 
          //console.log(cons.IPADD+cons.ROOMWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex)
          return data;
        }
        else{
          var tempUrl=cons.IPADD+cons.CHANNELLIST;
          tempUrl+="&pageNumber="+pageIndex+"&pageSize="+pageSize+"&searchString="+sstring;
          var data=DataServ.getData(tempUrl); 
          return data;
        }
      }
      else if(sstring=='' || sstring==undefined){
        if(isprev==false){
          if(islogin){//change
            var data=DataServ.getData(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex+"&date="+sdate); 
            //console.log(cons.IPADD+cons.ROOMWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex)
            return data;
          }
          else{
            var tempUrl=cons.IPADD+cons.CHANNELLIST;
            tempUrl+="&pageNumber="+pageIndex+"&pageSize="+pageSize+"&date="+sdate;
            var data=DataServ.getData(tempUrl); 
            return data;
          }
        }
        else{
          if(islogin){//change
            var data=DataServ.getData(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex+"&date="+sdate+"&searchfor=PreviousMonth"); 
            //console.log(cons.IPADD+cons.ROOMWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex)
            return data;
          }
          else{
            var tempUrl=cons.IPADD+cons.CHANNELLIST;
            tempUrl+="&pageNumber="+pageIndex+"&pageSize="+pageSize+"&date="+sdate+"&searchfor=PreviousMonth";
            var data=DataServ.getData(tempUrl); 
            return data;
          }
        }
      }
      else{
        if(isprev==false)
          if(islogin){//change
            var data=DataServ.getData(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex+"&date="+sdate+"&searchString="+sstring); 
            //console.log(cons.IPADD+cons.ROOMWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex)
            return data;
          }
          else{
            var tempUrl=cons.IPADD+cons.CHANNELLIST;
            tempUrl+="&pageNumber="+pageIndex+"&pageSize="+pageSize+"&date="+sdate+"&searchString="+sstring;
            var data=DataServ.getData(tempUrl); 
            return data;
          }
        else
          if(islogin){//change
            var data=DataServ.getData(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex+"&date="+sdate+"&searchfor=PreviousMonth"+"&searchString="+sstring); 
            //console.log(cons.IPADD+cons.ROOMWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex)
            return data;
          }
          else{
            var tempUrl=cons.IPADD+cons.CHANNELLIST;
            tempUrl+="&pageNumber="+pageIndex+"&pageSize="+pageSize+"&date="+sdate+"&searchfor=PreviousMonth"+"&searchString="+sstring;
            var data=DataServ.getData(tempUrl); 
            return data;
          }
      }
    }
  },
  getChannelStatusByUId:function(uid) {
    var data=DataServ.getData(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+200+"&userid="+uid+"&pageNumber="+0); 
     return data;  
  },
  getChannelByRoomId: function(roomId) {
    var data=DataServ.getData(cons.IPADD+cons.CHANNELLISTBYROOMID+roomId); 
     return data;  
  },
  getFavChannelWithFStatusByUId:function(pageIndex,pageSize,uid){
   console.log(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex)
    var data=DataServ.getData(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex); 
     return data;   
  },
  getFavChannelByUId:function(uid){
    //console.log(cons.IPADD+cons.CHANNELWITHFAVSTATUSBYUID+pageSize+"&userid="+uid+"&pageNumber="+pageIndex)
    var data=DataServ.getData(cons.IPADD+cons.FAVCHANNELBYUID+uid); 
     return data;   
  },
  addFollowChannel:function(fid,bid){
    var data={};
    var data=DataServ.postData(cons.IPADD+cons.ADDFOLLOWCHANNEL+fid+'&boardcasterid='+bid); 
     return data;   
  },
  delFollowChannel:function(fid,bid){
    var data={};
    var data=DataServ.postData(cons.IPADD+cons.DELFOLLOWCHANNEL+fid+'&boardcasterid='+bid); 
     return data;   
  },
  addFavChannel:function(uid,cid){
    var data={};
    var data=DataServ.postData(cons.IPADD+cons.ADDFAVCHANNEL+uid+'&broadcasterid='+cid,data); 
     return data;   
  },
  delFavChannel:function(uid,cid){
    var data={};
    var data=DataServ.postData(cons.IPADD+cons.DELFAVCHANNEL+uid+'&broadcasterid='+cid,data); 
     return data;   
  },
  addLikeChannel:function(uid,cid){
    var data={};
    var data=DataServ.postData(cons.IPADD+cons.ADDLIKECHANNEL+uid+'&broadcasterid='+cid,data); 
     return data;   
  },
  addUnlikeChannel:function(uid,cid){
    var data={};
    var data=DataServ.postData(cons.IPADD+cons.ADDUNLIKECHANNEL+uid+'&broadcasterid='+cid,data); 
     return data;   
  },
}