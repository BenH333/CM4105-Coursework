import React from 'react';
import ReactDOM from 'react-dom';


export default class Search extends React.Component {
    //declare and init global vars
    constructor (props){
        super(props);
        
        this.state = {
            loading: true,
            bikes: null,
            location: 'Aberdeen',
            distance: '10',
            serial: '',
            random: 0
        };
        
        this.filteredSearch = this.filteredSearch.bind(this);
        this.fetchRequest = this.fetchRequest.bind(this);
        this.renderItems = this.renderItems.bind(this);

    }

    //handle methods will process filter async requests
    handleCity = (e) => {
        this.setState({
                location: e.target.value
        });
    }
    handleSerial = (e) => {
        this.setState({
                serial: e.target.value
        });
    }
    handleDistance = (e) => {
        this.setState({
                distance: e.target.value
        });
    }

    handleClick = (e) => {
    //record clicks then redirect user
        
        let token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const url = e.target.name;

        $.ajax({
            url: '/dashboard/addclick',
            type: 'POST',
            data: {
                _token: token,
                name: e.target.id
            },
            
            dataType: 'JSON',
    
            success: (response) => { 

                // console.log("success");
                // console.log(response);
                
                window.location.href = url;
            },
            error: (response) => {

                // console.log("error");
                // console.log(response);
                
            }

        });
    }
   
    renderItems(){
        var content=[];
        this.state.bikes.map(function(item, i){
            const min = 1;
            const max = 100;
            const rand = Math.floor(Math.random() * 101)// returns a random integer from 0 to 100 
            // // console.log('test',i);
            var dynamicContent = [];
            
            dynamicContent.push(<li className="list-group-item" key={i+'title'}>{item.title}</li>);
            if(item.large_img){
                dynamicContent.push(<li className="list-group-item" key={i+'img'}><img className="img-fluid img-thumbnail"src={item.large_img}/></li>);
            }
            if(item.serial){
                dynamicContent.push(<li className="list-group-item" key={i+'serial'}>Bike Serial: {item.serial}</li>);
            }
            if(item.description){
                dynamicContent.push(<li className="list-group-item" key={i+'description'}>{item.description}</li>);
            }
            if(rand >= 50){
                dynamicContent.push(
                                    <li className="list-group-item" key={i+'description'}>
                                        <button className="btn btn-primary" name={item.url} id="blue" onClick={this.handleClick}>Contact Owner</button>
                                    </li>
                                    );
            }else{
                dynamicContent.push(
                                    <li className="list-group-item" key={i+'description'}>
                                        <button className="btn btn-success" name={item.url} id="green" onClick={this.handleClick}>Contact Owner</button>
                                    </li>
                                    );
            }
            const listContent = (
                <div className="search-container">
                    <ul className="list-group">
                        {dynamicContent}
                    </ul>
                </div>
            );
            content.push(listContent);

          }, this)
          return content;
    }

    //fetch the url, await, and set global variables
    async fetchRequest(url){
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ bikes: data.bikes, loading: false });
        // console.log(this.state.bikes);
    }

    async filteredSearch (){
        // console.log(this.state.location);
        var url="";
        this.setState({ loading: true });
        if(this.state.serial != null){
             url = "https://bikeindex.org:443/api/v3/search?location="+this.state.location+"&distance="+this.state.distance+"&serial="+this.state.serial+"&stolenness=proximity"; 
        } else{
             url = "https://bikeindex.org:443/api/v3/search?location="+this.state.location+"&distance="+this.state.distance+"&stolenness=proximity";
        }
        this.fetchRequest(url);

        // console.log(url);
    }

    //default results on page load..
    async componentDidMount(){
        const url ="https://bikeindex.org:443/api/v3/search?location=Aberdeen&distance=10&stolenness=proximity";
        this.fetchRequest(url);
        // console.log(this.state.bikes);
        // console.log(this.state.loading, this.state.bike);
        
    }

    //render when ready
    render() {
        if (this.state.loading) {
            return <h1 className="container">Loading may take up to 1 minute...</h1>;
        }

        if (!this.state.bikes) {
            return <h1 className="container">No stolen bikes here.</h1>
        }

        return (
            <div className="filter-form">
                <div className="App">
                    <form className="form-horizontal" onSubmit={this.filteredSearch}>
                        <h2>Current City: {this.state.location}</h2>
                        <div className="form-group row">
                            <div className="col-xs-4 ml-2">
                                <input className="form-control" label='Filter City: ' placeholder='Enter a city name' onChange={this.handleCity}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-4 ml-2">
                                <select className="form-control" value={this.state.value} onChange={this.handleDistance}>
                                    <option value="10">10 miles</option>
                                    <option value="50">50 miles</option>
                                    <option value="100">100 miles</option>
                                    <option value="200">200 miles</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-4 ml-2">
                                <input className="form-control" label='Filter Serial Number: ' placeholder='Enter a bike Serial Number' onChange={this.handleSerial}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-4 ml-2">
                                <input className="form-control btn icon-small"type='submit' placeholder="Submit"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-4 ml-2">
                                <small className="form-control">Results are retrieved from the Bike Index API <a href="https://bikeindex.org">Visit here</a></small>
                            </div>
                        </div>
                    </form>
                    
                </div>
            {
                this.renderItems()
            }
            </div>
        );
    }
}

//render retrieved results to html
ReactDOM.render(<Search />, document.getElementById('search'));