import React, { useEffect,useState } from 'react'
import {Card,Box,Text,Icon } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import './Card.css'
import {AiOutlinePlayCircle} from'react-icons/ai'

export default function UserCard({video,videoIndex}) {
  const navigate = useNavigate();
  const [color,setColor] = useState('');


  const getColor = () =>{
    const colorArray = ["f4a261","264653",'e76f51','e63946','1d3557','03045e','219ebc','fb8500','d62828','fb5607'];
    const color = "#" + colorArray[Math.floor(Math.random() * 10)]
    return color;
  }

  useEffect(()=>{
    setColor(getColor());
  },[])

  return (
    <Card minW='180px' w='180px' h='200px' m='10px' onClick={()=>navigate(`/video/${videoIndex+1}`)} position='relative' p='10px' className='card' bg={color}>
        <Text m='auto' textAlign='center' color='white' fontSize='20px' fontWeight={700}>{video.videoTitle}</Text>
      <Box position='absolute' bottom={0} minH='100%' w='100%'  borderRadius='5px 5px' className='card_overlay' bg='blackAlpha.700' top='0' left='0' alignItems='center' justifyContent='center'>
          <Icon as={AiOutlinePlayCircle} color='white' w='60px' h='60px'/>
      </Box>
    </Card>
  )
}
