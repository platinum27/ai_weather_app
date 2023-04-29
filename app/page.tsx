'use client'

import React from 'react'
import "./globals.css";
import { Card, Divider, Subtitle, Text } from '@tremor/react'
import CityPicker from './components/CityPicker';

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#394F68] to-[#18387E] 
    p-10 flex flex-col justify-center items-center'>
        <Card className='px-20'>
            <Text className='text-6xl font-bold text-center mb-10'>Weather AI</Text>
             {/* <h1>Let's build a GPT-4 App</h1> */}
             <Subtitle className='text-xl text-center'>
                Powered by OpenAI, Next.js 13, Tailwind CSS, Tremor 2.0 + more!
             </Subtitle>
             <Divider className='my-10'/>
             <Card className='bg-gradient-to-br from-[#394F68] to-[#18387E]'>
                <CityPicker />
             </Card>
        </Card>
    </div>
   
  )
}

export default Home