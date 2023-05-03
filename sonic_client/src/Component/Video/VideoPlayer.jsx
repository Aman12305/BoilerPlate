import React,{useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {Box,Text,Button,Heading} from '@chakra-ui/react'
import './VideoPlayer.css'

export default function VideoPlayer({bucket}) {
    
    const {id} = useParams();

    const index = parseInt(id) - 1;
    const bucketIndex = parseInt(index/1000);
    const bucketVideoIndex = parseInt(index%1000)

    const  bucketDetail = bucket[bucketIndex];
    const  bucketVideo = bucket[bucketIndex]?.bucketVideo[bucketVideoIndex]

    const navigate = useNavigate();

  return (
    <Box display='flex' flexDirection='column' className='videoPlayer' bg='blackAlpha.800' >
        {
          bucketVideo?
          <iframe
            src={bucketVideo?.videoFile}
            className='video'
          />:null
        }
        <Box display='flex' minH='60px' my='10px' alignItems='center'>
          <Box borderRadius='50%' w='50px' h='50px' bg='white' mr='10px'>

          </Box>
          <Box>
            <Heading>{bucketVideo?.videoTitle}</Heading>
            <Text>video from {bucketDetail?.bucketName}</Text>
          </Box>
        </Box>
    </Box>
  )
}
