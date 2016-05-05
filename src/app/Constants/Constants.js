var IPADDa="http://54.171.246.249/";
module.exports ={
  IPADD:"http://54.171.246.249/Api/Values/",
  CHATIPADD:'http://54.171.246.249:3000',


  USERREGISTER:'Register?',
  USERLOGIN:'Login?',
  USERDETAILBYID:'BroadCastProfileByUserId?token=BroadCastProfileByUserId&UserId=',
  BROADCASTERREGISTER:'EditBroadCastProfile?token=EditBroadCastProfile',
 
  ROOMLIST1:"RoomList?token=RoomList",
  ROOMLIST:"GetPagingList?key=rooms",
 
  TEAMUPCOMINGFIXTURE:'UpcomingMatchesByTeamId?token=UpcomingMatchesByTeamId&teamid=',
  TEAMHEADTOHEAD:'',
  FAVTEAMBYUID:'ListWithFavFlag?key=teams&pageSize=',
  TEAMWITHFAVSTATUSBYUID:'ListWithFavFlag?key=teams&pageSize=',
  ADDFAVTEAM:'AddFavTeams?token=AddFavTeams&userid=',
  DELFAVTEAM:'DeleteFavTeams?token=DeleteFavTeams&userid=',

  BREDCASTLOGO:IPADDa+"Assests/Broadcaster/Logo/",
  BREDCASTCOVER:IPADDa+"Assests/Broadcaster/CoverPhoto/",
  TEAMLOGO:IPADDa+"Assests/TeamLogo/",
  ROOMCOVER:IPADDa+"Assests/Room/CoverPhoto/",
  ROOMLOGO:IPADDa+"Assests/Room/Logo/",
  LEAGUELOGO:IPADDa+'Assests/LeagueLogo/',
  PODCASTPATH:IPADDa+'Podcasting/'
}