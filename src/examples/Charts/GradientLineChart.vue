<template>
  <div class="card">
    <div class="form-group">
      <select class="form-select" id="" @change="setYear">
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>
    </div>
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
      <p class="text-sm">
        <i class="fa fa-arrow-up text-success"></i>
        <span class="font-weight-bold">{{detail1}}</span>
        {{detail2}}
      </p>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
         <canvas id="chart-line" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from 'axios'
import APIs from '../../../config'
export default {
  name: "gradient-line-chart",
  data(){
    return {
      year : '2022' , 
      homeData : [] , 
      // dataPerMonth : [[2750890],[4674906],[5794128],[2756568],[2861756],[401226],[0],[0],[0],[0],[0],[0]], 
      dataPerMonth : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
      chart : null 
    }
  },
  created(){
    // fetch data
    
  },
  props: {
    title: {
      type: String,
      default: "Sales overview",
    },
    detail1: {
      type: String,
      default: "4% more",
    },
    detail2: {
      type: String,
      default: "in 2021",
    },
  },
  methods : {
      getData(){
         var get_token = localStorage.getItem('token')
          var user_id = localStorage.getItem('user_id')
          axios.get(`${APIs.API_URL}/homeDashboard/${user_id}?year=2022` ,
          { headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${get_token}`
                  }})
          .then(res => {
            this.homeData =  res.data
            // groupe data
            this.homeData.forEach(elt => {
              if(elt.CurrentDate.substr(6, 9) == this.year) {
                let index = parseInt(elt.CurrentDate.substr(3, 4)) - 1 
                try {
                  Object.keys(elt.Rapport).forEach(single => {
                    this.dataPerMonth[index] +=  elt.Rapport[single].TTC === undefined ? 0 : parseInt(elt.Rapport[single].TTC)
                  })
                } catch {
                  // for error
                }
              } 
              })
          }).catch(error => {
              console.error(error)
          })
          return 1
      },

    DrawChart() {
      var ctx1 = document.getElementById("chart-line").getContext("2d");

      var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

      gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
      gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
      gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");
      this.chart = new Chart(ctx1, {
        type: "line",
        data: {
          labels: ["Jan","Feb" , "Mar",  "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Mobile apps",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#4BB543 ",
              backgroundColor: gradientStroke1,
              // eslint-disable-next-line no-dupe-keys
              borderWidth: 3,
              fill: true,
              // data: [ this.dataPerMonth[0], this.dataPerMonth[1],  this.dataPerMonth[2],  this.dataPerMonth[3],  this.dataPerMonth[4],  this.dataPerMonth[5],  this.dataPerMonth[6],  this.dataPerMonth[7],  this.dataPerMonth[8] ,  this.dataPerMonth[9] , this.dataPerMonth[10] ,  this.dataPerMonth[11]],
            //data: [2750890,4674906,5794128,2756568,2861756,401226,0,0,0,0,0,0],
              data: [],
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#fbfbfb",
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "#ccc",
                padding: 20,
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
          },
      },
    });
      },

      updateChart() {
        for (let index = 0; index < 12; index++) {
           this.chart.data.datasets[0].data.push(100) 
        }
        console.log("hello " , this.chart.data.datasets[0].data )
        this.chart.update()
      },

      setYear(event){
        this.year = event.target.value 
        this.dataPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
        this.getData()
      }
  },
  async mounted() {
    // console.log("####################")
    // await console.log(this.dataPerMonth)
    // console.log("####################")

    await this.getData()
    await this.DrawChart()
    await this.updateChart()

    // this.getData().then(() => {
    //   console.log()
    //   this.DrawChart()
    // })
  },
};
</script>
