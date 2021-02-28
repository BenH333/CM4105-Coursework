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
            serial: ''
        };
        
        this.filteredSearch = this.filteredSearch.bind(this);
        this.fetchRequest = this.fetchRequest.bind(this);
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
    
    //fetch the url, await, and set global variables
    async fetchRequest(url){
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ bikes: data.bikes, loading: false });
        console.log(this.state.bikes);
    }

    async filteredSearch (){
        console.log(this.state.location);
        var url="";
        this.setState({ loading: true });
        if(this.state.serial != null){
             url ="https://bikeindex.org:443/api/v3/search?location="+this.state.location+"&distance="+this.state.distance+"&serial="+this.state.serial+"&stolenness=proximity"; 
        } else{
             url ="https://bikeindex.org:443/api/v3/search?location="+this.state.location+"&distance="+this.state.distance+"&stolenness=proximity";
        }
        this.fetchRequest(url);

        console.log(url);
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
            return <div className="search-container">loading...</div>;
        }

        if (!this.state.bikes) {
            return <div className="search-container">No stolen bikes here.</div>
        }

        return (
            <div className="filter-form">
                <div className="App">
                    <form className="form-horizontal" onSubmit={this.filteredSearch}>
                    <h2>Current City: {this.state.location}</h2>
                        <div className="form-group row">
                            <div className="col-xs-4">
                                <input className="form-control " label='Filter City: ' placeholder='Enter a city name' onChange={this.handleCity}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-4">
                                <select className="form-control " value={this.state.value} onChange={this.handleDistance}>
                                    <option value="10">10 miles</option>
                                    <option value="50">50 miles</option>
                                    <option value="100">100 miles</option>
                                    <option value="200">200 miles</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-4">
                                <input className="form-control " label='Filter Serial Number: ' placeholder='Enter a bike Serial Number' onChange={this.handleSerial}/>
                            </div>
                        </div>
                        <input className="btn icon-small"type='submit' placeholder="Submit"/>
                    </form>
            </div>
            {
            this.state.bikes.map(function(item, i){
                // console.log('test',i);
                if((!item.description) && item.large_img){
                    return <div className="search-container">
                                <ul className="list-group">
                                    <li className="list-group-item">{item.title}</li>
                                    <li className="list-group-item"><img className="img-fluid img-thumbnail"src={item.large_img}/></li>
                                    <li className="list-group-item">Bike Serial: {item.serial}</li>
                                    <a href={item.url}><li className="list-group-item"><p className="btn btn-primary">Contact Owner</p></li></a>
                                </ul>
                           </div>
                } else if((!item.large_img) && item.description){
                    return <div className="search-container">
                                <ul className="list-group">
                                    <li className="list-group-item">{item.title}</li>
                                    <li className="list-group-item">{item.description}</li>
                                    <li className="list-group-item">Bike Serial: {item.serial}</li>
                                    <a href={item.url}><li className="list-group-item"><p className="btn btn-primary">Contact Owner</p></li></a>
                                </ul>
                           </div>
                } else if ((!item.large_img) && (!item.description)){
                    return <div className="search-container">
                                <ul className="list-group">
                                    <li className="list-group-item">{item.title}</li>
                                    <li className="list-group-item">Bike Serial: {item.serial}</li>
                                    <a href={item.url}><li className="list-group-item"><p className="btn btn-primary">Contact Owner</p></li></a>
                                </ul>
                           </div>
                } else{
                    return <div className="search-container">
                                <ul className="list-group">
                                    <li className="list-group-item">{item.title}</li>
                                    <li className="list-group-item"><img className="img-fluid img-thumbnail"src={item.large_img}/></li>
                                    <li className="list-group-item">{item.description}</li>
                                    <li className="list-group-item">Bike Serial: {item.serial}</li>
                                    <a href={item.url}><li className="list-group-item"><p className="btn btn-primary">Contact Owner</p></li></a>
                                </ul>
                            </div>
                }
              })
            }
            </div>
        );
    }
}

//render retrieved results to html
ReactDOM.render(<Search />, document.getElementById('search'));