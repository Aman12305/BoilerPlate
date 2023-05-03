import { Heading,Box, Button ,ButtonGroup} from '@chakra-ui/react'
import React,{useState} from 'react'
import Card from '../Card/Card'
import {AiOutlinePlus , AiOutlineDelete} from 'react-icons/ai'
import UserModal from '../UserModal/UserModal';
import Form from '../Form/Form';
import './Row.css'

export default function Row({bucketIndex,bucket,handleAddVideo,handleRemoveVideo}) {

  const [isModalOpen,setModalOpen] = useState(false);
  const [title,setTitle] = useState('');

  const handleClick = (e) =>{
    setTitle(e.target.name);
    setModalOpen(true);
  }

  const handleAddVideoSubmit = (bucketIndex,video) =>{
    if(!video.videoFile)
    {
      alert("Please provide video File too")
      return;
    }
    handleAddVideo(bucketIndex,video);
    setModalOpen(false);
  }

  const hanleRemoveVideoSubmit = (bucketIndex,selectVideos) =>{
    if(selectVideos.length==0)
    {
      alert('Please Select Atleast One Video');
      return;
    }
    handleRemoveVideo(bucketIndex,selectVideos);
    setModalOpen(false);
  }

  return (
    <Box m='10px' p='10px'>
      <Box display='flex' justifyContent='space-between'>
        <Heading>{bucket?.bucketName}</Heading>
        <ButtonGroup gap='2' float='right'>
          <Button leftIcon={<AiOutlinePlus/>} name='Add Video' onClick={handleClick} mr='20px'>
            Add Video
          </Button>
          <Button leftIcon={<AiOutlineDelete/>} name='Remove Videos' onClick={handleClick} mr='20px'>
            Remove Video
          </Button>
        </ButtonGroup>
      </Box>
      <Box className='row__posters'>
        {
          bucket?.bucketVideo.map((video,videoIndex)=>(
            <Card video={video} videoIndex={parseInt(bucketIndex)*1000 + videoIndex} key={videoIndex}/>
          ))
        }
      </Box>
      <UserModal isOpen={isModalOpen} onClose={()=>setModalOpen(false)} title={title}>
        <Form bucket={bucket} formType={title} onSubmit={title==='Add Video'?handleAddVideoSubmit:hanleRemoveVideoSubmit} bucketIndex={bucketIndex}/>
      </UserModal>
    </Box>
  )
}
