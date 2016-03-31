var LoginBox = React.createClass({
  getInitialState(){
    return({value:})    
  },

  render:function(){
    return(
  <div>
  <div className="col-md-2 form-group">
      <input type="text" className="form-control" id="feedname" placeholder="user name"  />
  </div>
  <div className="col-md-2 form-group">
  <input type="password" className="form-control" id="feedword" placeholder="pass word" />
  </div>
      <div className="col-md-1"><button className="btn btn-default" type="submit">Button</button></div>
  </div>
      );
  }
});
module.exports =LoginBox;