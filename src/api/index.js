import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

//await should always be declared inside async function only not in pure function
 export const fetchData = async (country)=>{
     let changeableUrl= url;

     if(country){
         changeableUrl= `${url}/countries/${country}`;
     }
try{
    //its an object of data destructured only important info needed
 const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
 return {confirmed, recovered, deaths, lastUpdate};   

}catch(error){
console.log(error)
}

}

//passing url for fetching daily data fro countries using charts

export const fetchDailyData = async ()=>{
    try{
      //again looping thru map function on data needed to be displayed using map method
        const {data}= await axios.get(`${url}/daily`);
        const modifiedData= data.map((dailyData)=>({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate,
        }));
        return modifiedData;
        
    }catch(error){
     console.log(error)
    }
}

//passing url for fetching countries

export const fetchCountries = async ()=>{
    try{
     const {data:{countries}}= await axios.get(`${url}/countries`);
     return countries.map((country)=>country.name)

    }catch(error){
   console.log(error);
    }
}