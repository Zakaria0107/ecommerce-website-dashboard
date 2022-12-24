<template>
    <div class="container center">
        <select class="form-select mb-3" id="" @change="setYear">
            <option value="2022">2022</option>
            <option value="2021">2021</option>
       </select>
       <center>
             <apexCharts
                width="600"
                type="line"
                :options="chartOptions"
                :series="series"
                />
       </center>
    </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import axios from 'axios'
import APIs from '../../../config'
export default {
    name : "ChartBar" , 
    data(){
        return {
            year : '2022' , 
            homeData : [] , 
            dataPerMonth : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
            chartOptions: {
                chart: {
                id: "vuechart-example",
                },
                xaxis: {
                categories: ["Jan","Feb" , "Mar",  "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                },
            },
            series: [
                {
                name: "series-1",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
            ],
        }
    },
    created(){
        this.getData()
    },
    components: {
        apexCharts : VueApexCharts 
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
            this.series[0].data = this.dataPerMonth
          }).catch(error => {
              console.error(error)
          })
      },
      setYear(event){
        this.year = event.target.value 
        this.dataPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
        this.getData()
      }
    }
}
</script>