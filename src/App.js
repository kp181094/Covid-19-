import React from 'react';
import './App.css';
import Cards from './components/Cards/Cards';
import Charts from './components/Charts/Charts';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from  './images/covid.png';


class App extends React.Component{

  state={
    data:{},
    country:'',
  }

//to fetch api always do in compdidmount()
   async componentDidMount(){
    const data = await fetchData();
    this.setState({ data });
    console.log(data)
  }

  //method to change country on selection

  handleCountryChange=async (country)=>{
    const data = await fetchData(country);
   console.log(data)
   this.setState({data ,country:country});
    // console.log(country);
    //fetch data
    //set dada
  }
  render(){
    //destrcuturing 
    const {data,country}= this.state;
    return(
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="covid-19"/>
     <Cards  data ={data}/>
     <CountryPicker handleCountryChange={this.handleCountryChange}/>
     <Charts data={data} country={country}/>
     </div>
    );
  }
}

export default App;
