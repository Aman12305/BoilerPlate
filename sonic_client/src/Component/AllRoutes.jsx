import React,{useEffect, useState} from 'react'
import {BrowserRouter as Router,Routes,Route, useLocation, useParams} from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Layout from './Layout'
import VideoPlayer from './Video/VideoPlayer';

export default function AllRoutes() {
  const [bucket, setBucket] = useState([]);
  const [history,setHistory] = useState([]);
  const location = useLocation();
  useEffect(()=>{
    const newBucket = [{
      bucketName: "Education",
      bucketVideo: [
        {
          videoTitle: "How to find sum",
          videoFile: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
        }
      ]
    }]
    setBucket([...newBucket]);
  },[])

  useEffect(()=>{
    
    if(location.pathname!=='/')
    {
      const videoIndex = parseInt(location.pathname.slice(7)) - 1
      const bucketName = bucket[parseInt(videoIndex/1000)].bucketVideo[parseInt(videoIndex%1000)]?.videoTitle

      // Remove any existing entry with the same pathname value
      const filteredHistory = history.filter(item => item.pathname !== location.pathname);

      // Add the new entry at the top
      const newHistory = [{pathname: location.pathname, videoTitle: bucketName}, ...filteredHistory];

      setHistory(newHistory);
    }

  },[location.pathname]);

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage bucket={bucket} setBucket={setBucket} history={history}/>}/>
        <Route path='/video/:id' element={<VideoPlayer bucket={bucket}/>}/>
      </Route>
    </Routes>
  )
}
