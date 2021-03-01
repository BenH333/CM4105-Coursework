import React from 'react';
import ReactDOM from 'react-dom';

export default class Dashboard extends React.Component {
    //declare and init global vars
    constructor (props){
        super(props);
        
        this.state = {
           greenClicks: null,
           blueClicks: null
        };

        this.clicksChart = this.clicksChart.bind(this);

    }

    clicksChart() {
        const node = this.node;
    
        var data = {
                labels: ["Number of Clicks"],
                datasets: [
                  {
                    data: [this.state.greenClicks],
                    label: ["Green"],
                    backgroundColor: [
                      "rgba(40, 167, 69, 0.5)",
                    ]
                  },
                  {
                    data: [this.state.blueClicks],
                    label: ["Blue"],
                    backgroundColor: [
                        "rgba(54, 162, 235, 0.5)"
                    ]
                  }
                ]
        };

        var options = {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  min: 0
                }    
              }]
            }
          };

        var myChart = new Chart(node, {
                type: "bar",
                data: data,
                options: options
        });

        return myChart;
    }    
    
    componentDidMount() {

        $.ajax({
            url: '/search/getClicks',
            type: 'GET',
            dataType: 'JSON',
    
            success: (data) => { 

                console.log("success");
                console.log(data);
                this.setState({greenClicks: data.greenClicks, blueClicks: data.blueClicks});
                // console.log(this.state.blueClicks);
                this.clicksChart();
            },
            error: (data) => {

                console.log("error");
                console.log(data);
                
            }
        });
    }

    render () {
        return(
        <div className="App" >
            <div style={{ width: 500, height: 300 }}>
                <canvas
                        ref={node => (this.node = node)}
                    />
            </div>
        </div>
        )
    }
}
//render retrieved results to html
ReactDOM.render(<Dashboard />, document.getElementById('search'));
