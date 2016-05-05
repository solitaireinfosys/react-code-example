var cons = require('../Constants/Constants.js'); 
module.exports =  {

getData: function(dataUrl) {
    console.log(dataUrl)
    return(
        $.ajax({
                url:dataUrl,
                dataType: 'json',
                type: 'GET',
                cache: false,
                crossDomain : true,
                success: function(data) {
                   
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(dataUrl, status, err.toString());
                }.bind(this)
            })
        );
    },
    postData: function(dataUrl,data) {
      console.log(dataUrl);
        return(
           $.ajax({
              url: dataUrl,
              dataType: 'json',
              type: 'POST',
              data: data,
              success: function(data) {
                //console.log(data);
                return data;
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
              }.bind(this)
            })
        );
    },
    deleteData: function(dataUrl) {
        return(
           $.ajax({
              url: dataUrl,
              data: {"id" : commentId},
              type: 'DELETE',
              dataType: 'json',
              success: function (comments) {
                this.setState({comments: comments});
              }.bind(this), 
              error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
              }.bind(this)
          })
        );
    }, 
    updateData: function(dataUrl) {
    return(
        $.ajax({
                url: dataUrl,
                dataType: 'json',
                type: 'GET',
                cache: false,
                crossDomain : true,
                success: function(data) {
                     console.log("service",data);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            })
        );
    },
 

}

