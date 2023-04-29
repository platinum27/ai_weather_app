import React from 'react';
import { getClient } from '../../../../../apollo-client';
import fetchWeatherQuery from '../../../../../graphql/queries/fetchWeatherQueries';
import CalloutCard from '../../../../components/CalloutCard';
import Statcard from '../../../../components/Statcard';
import InformationPanel from '../../../../components/InformationPanel';
import TempChart from '../../../../components/TempChart';
import RainChart from '../../../../components/RainChart';
import HumidityChart from '../../../../components/HumidityChart';
import getBasePath from '../../../../../lib/getBasePath';
import cleanData from '../../../../../lib/cleanData';

export const revalidate = 60;

type Props = {
    params:{
        city:string;
        lat:string;
        long:string;
    }
}

const WeatherPage = async ({params:{city, lat, long}}:Props) => {
  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables:{
      current_weather:"true",
      latitude:lat,
      longitude:long,
      timezone:"GMT"
    }
  });
  const results:Root = data.myQuery;
//////////////////GPT Code Here  ////////////////
  // const dataToSend = cleanData(results, city);
  // const res = await fetch(`${getBasePath()}/api/getWeatherSummary`,{
  //   method: "POST",
  //   headers:{
  //     "Content-Type": "application/json",
  //   },
  //   body:JSON.stringify({
  //     weatherData:dataToSend
  //   }),
  // })

  // const GPTdata = await res.json()

  // const { content } = GPTdata;

  //////////////////////End GPT Code ///////////////////////////
  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <InformationPanel city={city} long={long} lat={lat} 
       results={results}
      />
      <div className='flex-1 p-5 lg:p-10'>
        <div className='p-5'>
          <div className='pb-5'>
            <h2 className='text-xl font-bold'>Today's Overview</h2>
            <p className='text-sm text-gray-400'>Last updated: 
            {new Date(results.current_weather.time).toLocaleString()}
            ({results.timezone})
            </p>
          </div>
        </div>
        <div className='m-2 mb-10'>
          <CalloutCard 
           message='This is where GPT-4 summery will go'
          //message={content}
          />
        </div>
        <div className='grid grid-cols-1 xl:grid-cols-2 m-2'>
          <Statcard 
          title='Maximum Temperature'
          metric= {`${results.daily.temperature_2m_max[0].toFixed(1)} °C`}
          color='yellow'
          />

         <Statcard 
          title='Minimum Temperature'
          metric= {`${results.daily.temperature_2m_min[0].toFixed(1)} °C`}
          color='green'
          />

        <div>
          <Statcard 
            title='Uv Index'
            metric= {results.daily.uv_index_max[0].toFixed(1)}
          color='rose'
          />
         {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
         <CalloutCard 
          message='The UV is high today, be sure to wear SPF!'
          warning='true'
          />
           )} 
        </div>

        <div className='flex space-x-3'>
           <Statcard 
              title='Wind Speed'
              // metric='23.6m/s'
              metric= {`${results.current_weather.windspeed.toFixed(1)}m/s`}
              color='cyan'
            />

            <Statcard 
               title='Wind Direction'
              //  metric='316.7°'
               metric= {`${results.current_weather.winddirection.toFixed(1)}°`}
               color='violet'
             />
          </div>
        </div>
        
      <hr className='mb-5'/>
      <div className='space-y-3'>
        <p><TempChart results={results}/></p>
        <p><RainChart results={results}/></p>
        <p><HumidityChart results={results}/></p>
      </div>   
      </div>
    </div>
  )
}

export default WeatherPage