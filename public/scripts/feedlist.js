
var LoginBox = React.createClass({
  getInitialState(){
    return({login:"",name:""})    
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

var SetSatisfy = React.createClass({
  render:function(){
    //alert(this.props.eid);
    //var radioName = this.props.key.toString();
    return(
        <td className="setSatisfy">
        <label className="radio-inline">
        <input type="radio" name={this.props.eid} value="1" />满意  
        </label>
        <label className="radio-inline">
        <input type="radio" name={this.props.eid} value="2" /> 不满意
        </label>
        </td>
      )
  }
});
var AdviseBox = React.createClass({
  getInitialState(){
    if(this.props.ad=="")
      return { value:""};
    else 
      return {value:this.props.ad };
  },
  handleChange(e){
  this.setState({value : e.target.value });
  },
  render:function(){
    return(
      <td className="adviseBox" >
    <input type="text" id="advise" className="form-control" 
    value={this.state.value}
    onChange={this.handleChange} />
    </td>
    )
  }
});
var EventList = React.createClass({
  render:function(){
    return(
      <tr className="eventList">
        <td>{this.props.no}</td>
        <td>{this.props.text}</td>
        <td>{this.props.tel}</td>
        <td>{this.props.doctor},{this.props.driver},{this.props.nurse}</td>

        <td>{this.props.hospital}</td>
        <SetSatisfy eid={this.props.eid} satisfy={this.props.satisfy}/>
        <AdviseBox ad={this.props.advise} />
      </tr>

      );
  }
});
var FeedList = React.createClass({
  render: function() {
    //alert(this.props.data);
    var listNodes = this.props.data.map(function(e) {
      return (
        <EventList key={e.no} eid={e.eid} no={e.no} text={e.text} tel={e.tel} doctor={e.doctor} driver={e.driver} nurse={e.nurse} hospital={e.hospital}  advise={e.advise} satisfy={e.satisfy} />
      );
    });
    return (
      <tbody  >
        {listNodes}
      </tbody>
    );
  }
});
var FeedBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadEventFromServer: function(){
  $.ajax({
      url: this.props.url,
      dataType: 'jsonp',
      jsonpCallback: 'callback',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }, //end load
  componentDidMount: function() {
    this.loadEventFromServer();
  },
  render:function(){
    return(
  <div className="mainbody">

  <div className="row">
  <div className="col-md-7" ><b>feedback system</b></div>
  <LoginBox   />
  </div>

<table className="table">
      <thead><tr><th>#</th><th>现场地址</th><th>呼救电话</th><th>随车人员</th><th>送往地点</th><th>满意度</th><th>意见建议</th></tr>
      </thead>
      <FeedList data={this.state.data} />
  </table>
</div>
    )
  } //end render
});

ReactDOM.render(
  <FeedBox url="http://220.180.214.252:5000/f" />,
  document.getElementById('list')
);
