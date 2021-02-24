import React from 'react';
import ReactDOM from 'react-dom';


export default class Search extends React.Component {
    state = {
        loading: true,
        bikes: null
    };

    async componentDidMount(){
        const url ="https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=Aberdeen&distance=10&stolenness=proximity";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ bikes: data.bikes, loading: false });
        console.log(data.bikes);
        // console.log(this.state.loading, this.state.bike);
        
       
    }

    render() {
        if (this.state.loading) {
            return <div>loading...</div>;
        }

        if (!this.state.bikes) {
            return <div>No stolen bikes here.</div>
        }
        return (
            <div>
            {
            this.state.bikes.map(function(item, i){
                console.log('test',i);
                return <ul>
                    <li>{item.title}</li>
                    <li><img src={item.large_img}/></li>
                    </ul>
              })
            }
            </div>
            // <div>
            //     <div>
            //         <div>{this.state.bike.id}</div>
            //         <img src={this.state.bike.large_img} />
            //     </div>
            // </div>
            
        );
    }
}

ReactDOM.render(<Search />, document.getElementById('search'));