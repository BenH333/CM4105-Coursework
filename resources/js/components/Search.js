import React from 'react';
import ReactDOM from 'react-dom';


export default class Search extends React.Component {
    constructor (props){
        super(props);
        
        this.state = {
            loading: true,
            bikes: null,
            location: 'Aberdeen',
            distance: '10'
        };
        
        this.filteredSearch = this.filteredSearch.bind(this);
        this.fetch = this.fetch.bind(this);
    }

    handleCity = (e) => {
        this.setState({
                location: e.target.value
        });
    }

    handleDistance = (e) => {
        this.setState({
                distance: e.target.value
        });
    }
        
    async fetch(url){
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ bikes: data.bikes, loading: false });
        // console.log(this.state.bikes);
    }

    async filteredSearch (){
        console.log(this.state.location);

        this.setState({ loading: true });
        const url ="https://bikeindex.org:443/api/v3/search?location="+this.state.location+"&distance="+this.state.distance+"&stolenness=proximity";
        this.fetch(url);

        console.log(url);
    }

    async componentDidMount(){
        const url ="https://bikeindex.org:443/api/v3/search?location=Aberdeen&distance=10&stolenness=proximity";
        this.fetch(url);
        // console.log(this.state.bikes);
        // console.log(this.state.loading, this.state.bike);
    }

    render() {
        if (this.state.loading) {
            return <div className="search-container">loading...</div>;
        }

        if (!this.state.bikes) {
            return <div className="search-container">No stolen bikes here.</div>
        }

        return (
            <div className="search-container">
                <div className="App">
                    <form onSubmit={this.filteredSearch}>
                        <input label='Filter City: ' placeholder='Enter a city name' onChange={this.handleCity}/>
                        <select value={this.state.value} onChange={this.handleDistance}>
                            <option value="10">10 miles</option>
                            <option value="50">50 miles</option>
                            <option value="100">100 miles</option>
                            <option value="200">200 miles</option>
                        </select>
                        <input type='submit' placeholder="Submit"/>
                    </form>
                </div>
            <div>{this.state.location}</div>
            {
            this.state.bikes.map(function(item, i){
                // console.log('test',i);
                if((!item.description) && item.large_img){
                    return <div className="search-container">
                                <ul className="list-group">
                                    <li className="list-group-item">{item.title}</li>
                                    <li className="list-group-item"><img src={item.large_img}/></li>
                                    <a href={item.url}><li className="list-group-item">{item.url}</li></a>
                                </ul>
                           </div>
                } else if((!item.large_img) && item.description){
                    return <div className="search-container">
                                <ul className="list-group">
                                    <li className="list-group-item">{item.title}</li>
                                    <li className="list-group-item">{item.description}</li>
                                    <a href={item.url}><li className="list-group-item">{item.url}</li></a>
                                </ul>
                           </div>
                } else if ((!item.large_img) && (!item.description)){
                    return <div className="search-container">
                                <ul className="list-group">
                                    <li className="list-group-item">{item.title}</li>
                                    <a href={item.url}><li className="list-group-item">{item.url}</li></a>
                                </ul>
                           </div>
                } else{
                    return <div className="search-container">
                                <ul className="list-group">
                                    <li className="list-group-item">{item.title}</li>
                                    <li className="list-group-item"><img src={item.large_img}/></li>
                                    <li className="list-group-item">{item.description}</li>
                                    <a href={item.url}><li className="list-group-item">{item.url}</li></a>
                                </ul>
                            </div>
                }
              })
            }
            </div>
        );
    }
}

ReactDOM.render(<Search />, document.getElementById('search'));