import React, {useState , useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line , Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

const Charts =({data:{confirmed,recovered,deaths},country})=>{
    //setting state using hooks
    const [dailyData , setDailyData]=useState([]);

    //use effect() async cannot be called directly so we need to create a new function inside useeffect method

useEffect(()=>{
  const fetchAPI = async()=>{
      setDailyData(await fetchDailyData());
  }  
  console.log(dailyData);
 fetchAPI();
},[dailyData]);

const lineChart = (
    //if initially no data then display null
    dailyData.length
   ? (
    <Line
    data={{
        labels:dailyData.map(({date})=>date),
        datasets:[{
        data:dailyData.map(({confirmed})=>confirmed),
        label:'Infected',
        borderColor:'#3333ff',
        fill:true,
        },{
            data:dailyData.map(({deaths})=>deaths),
            label:'Deaths',
            borderColor:'red',
            backgroundColor:'rgba(255,0,0,0.5)',
            fill:true,
        }],
    }}
    
    />) : null
);


   const barChart=(
       confirmed
       ?(
           <Bar
             data={{
            labels:['Infected', 'Recovered' , 'Deaths'],
            datasets:[{
                label:'People',
                backgroundColor:[
                    'rgba(0,0,255,0.5)',
                    'rgba(0,255,0,0.5)',
                    'rgba(255,0,0,0.5)',
                ],
                data:[confirmed.value,recovered.value,deaths.value]
            }]
             }}
             options={{
             legend:{display:false},
             title:{display:true, text:`Current state in ${country}`}
             }}
           />
       ):null
   );


    return(
     <div className={styles.container}>
      {country?barChart:lineChart}
     </div>
    );
}


export default Charts;