var Action=require('../Actions/Action');
var PageIndex=-1;
var casetype='Home';
module.exports ={
	ordinal:function (d) {
      if(d>3 && d<21) return d+'TH';
      switch (d % 10) {
            case 1:  return d+"ST";
            case 2:  return d+"ND";
            case 3:  return d+"RD";
            default: return d+"TH";
        }
    },
    searchHandling:function(urlstate,searchText){

        switch(urlstate){
            case 'Home':    if(casetype=='Home'){
                                PageIndex=PageIndex+1;
                            }
                            else{
                                casetype='Home'
                                PageIndex=0;
                            }
                            Action.getRoom(PageIndex,4,searchText);
                            Action.getChannel(PageIndex,8,searchText); 
                            Action.getMatch(PageIndex,4,searchText);

                            break;
            case 'AllRoom': if(casetype=='AllRoom'){
                                PageIndex=PageIndex+1;
                            }
                            else{
                                casetype='AllRoom'
                                PageIndex=0;
                            }
                            Action.getRoom(PageIndex,12,searchText);
                            console.log('AllRoom')
                            break;
            case 'AllMatch': if(casetype=='AllMatch'){
                                PageIndex=PageIndex+1;
                            }
                            else{
                                casetype='AllMatch'
                                PageIndex=0;
                            }
                            Action.getMatch(PageIndex,12,searchText);
                            console.log('AllMatch')
                            break; 
            case 'AllChannel':
                            if(casetype=='AllChannel'){
                                PageIndex=PageIndex+1;
                            }
                            else{
                                casetype='AllChannel'
                                PageIndex=0;
                            }
                            Action.getChannel(PageIndex,12,searchText);
                            console.log('AllChannel')
                            break;
        }
    },
    moreRecords:function(totalRecord,PageIndex,pageSize){
    	var total=(PageIndex+1)*pageSize;
    	if(total<totalRecord){
    		return true;
    	}
    	else{
    		return false;
    	}
    }
}