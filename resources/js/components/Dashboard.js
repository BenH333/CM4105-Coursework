import React from 'react';
import ReactDOM from 'react-dom';

export default class Dashboard extends React.Component {
    //declare and init global vars
    constructor (props){
        super(props);
        
        this.state = {
           greenClicks: null,
           blueClicks: null,
           recentGreen: null,
           recentBlue: null,
           greenClicksTime: null,
           blueClicksTime: null
        };

        this.clicksChart = this.clicksChart.bind(this);
        this.recentClicksChart = this.recentClicksChart.bind(this);
        // this.timeChart = this.timeChart.bind(this);

    }

    clicksChart() {
        const node = this.generalCanvas;
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
        var overallChart = new Chart(node, {
                type: "bar",
                data: data,
                options: options
        });

        return overallChart;
    }    

    recentClicksChart() {
      const node = this.recentCanvas;
      var data = {
              labels: ["Number of Clicks in 24 hours"],
              datasets: [
                {
                  data: [this.state.recentGreen],
                  label: ["Green"],
                  backgroundColor: [
                    "rgba(40, 167, 69, 0.5)",
                  ]
                },
                {
                  data: [this.state.recentBlue],
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
      var recentChart = new Chart(node, {
              type: "bar",
              data: data,
              options: options
      });
      return recentChart;
  }    
  //  timeChart() {
  //   const node = this.timeCanvas;
  //   var greenDates=[];
  //   var greenCount=[];

  //    this.state.greenClicksTime.map(function(item, i){
  //     // console.log(item, i);
  //     greenDates.push(item[1]);
  //     // console.log(item[1])
  //     greenCount.push(item[0]);
  //     console.log(item[0],greenCount);
  //   });

    
  //     var data = {
  //           labels: ["Number of clicks per date"],
  //           datasets: [
  //             {
  //               data: [1,2,3,4,5],
  //               label: [
  //                 this.state.greenClicksTime.map(function(item, i){
  //                     return item[1];
  //                 })
  //               ],
  //               // backgroundColor: [
  //               //   "rgba(40, 167, 69, 0.5)",
  //               // ]
  //             },
  //           ]
  //     };
  //     var options = {
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true,
  //             min: 0
  //           }    
  //         }]
  //       }
  //     };
  //     var recentChart = new Chart(node, {
  //           type: "bar",
  //           data: data,
  //           options: options
  //     });
  //   return recentChart;
  // }    
    componentDidMount() {
        $.ajax({
            url: '/dashboard/getClicks',
            type: 'GET',
            dataType: 'JSON',
    
            success: (data) => { 

                console.log("success");
                console.log(data);
                this.setState({greenClicks: data.greenClicks, blueClicks: data.blueClicks});
                // console.log(this.state.blueClicks);
                <div>
                  {this.clicksChart()}
                </div>
            },
            error: (data) => {

                console.log("error");
                console.log(data);
                
            }
        });

        $.ajax({
          url: '/dashboard/getRecentClicks',
          type: 'GET',
          dataType: 'JSON',
  
          success: (data) => { 

              console.log("success");
              console.log(data);
              this.setState({recentGreen: data.greenClicks, recentBlue: data.blueClicks});
              <div>
                {this.recentClicksChart()}
              </div>
          },
          error: (data) => {

              console.log("error");
              console.log(data);
              
          }
       });

    //    $.ajax({
    //     url: '/dashboard/getTimeClicks',
    //     type: 'GET',
    //     dataType: 'JSON',

    //     success: (data) => { 

    //         console.log("success get Time Clicks");
    //         console.log(data);
    //         this.setState({greenClicksTime: data.greenClicks, blueClicksTime: data.blueClicks});
            
    //         <div>
    //           { this.timeChart() }
    //         </div>
    //     },
    //     error: (data) => {

    //         console.log("error");
    //         console.log(data);
            
    //     }
    //  });
    }

    render () {
        return(
        <div className="App">
            <div className="container">
              <div style={{ width: 500, height: 300 }}>
                  <canvas
                        ref={generalCanvas => (this.generalCanvas = generalCanvas)}
                  />
              </div>
            </div>
            
            <div className="container">

              <div style={{ width: 500, height: 300 }}>
                  <canvas
                      ref={recentCanvas => (this.recentCanvas = recentCanvas)}
                  />
              </div>
              {/* <div style={{ width: 500, height: 300 }}>
                  <canvas
                      ref={timeCanvas => (this.timeCanvas = timeCanvas)}
                  />
              </div> */}
            </div>

            <div className="container">
                <label>Delete all click data: &nbsp;</label>
                <a href="/search/deleteClicks" className="btn icon-small"><i className="fa fa-trash"></i>Reset</a>
            </div>
        </div>
        )
    }
}
//render retrieved results to html
ReactDOM.render(<Dashboard />, document.getElementById('search'));
