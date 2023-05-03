import React, { useState} from 'react'
import { Box ,ButtonGroup,Button,Heading,Text,Card} from '@chakra-ui/react'
import Row from '../Row/Row';
import {AiOutlinePlus,AiOutlineDelete} from 'react-icons/ai'
import UserModal from '../UserModal/UserModal';
import Form from '../Form/Form';
import {MdDriveFileMoveOutline} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import './HomePage.css'

export default function HomePage({bucket,setBucket,history}) {

  const [isModalOpen,setModalOpen] = useState(false);
  const [modalTitle,setModalTitle] = useState('');

  const handleAddBucket = (bucketName) => {
    const newBucket = {
      bucketName: bucketName,
      bucketVideo: []
    };
    setBucket([...bucket, newBucket]);
    setModalOpen(false);
  }

  const handleRemoveBucket = (bucketNames) => {

    if(bucketNames.length==0)
    {
      alert('Please Select Atleast One Bucket');
      return;
    }

    const newBucket = bucket.filter(item => !bucketNames.includes(item.bucketName));
    setBucket(newBucket);
    setModalOpen(false);
  }

  const handleAddVideo = (index, video) => {
    const newBucket = [...bucket];
    newBucket[parseInt(index)].bucketVideo.push(video);
    setBucket(newBucket);
  }

  const handleRemoveVideo = (bucketIndex, selectedVideos) => {
    const newBucket = [...bucket];
    newBucket[bucketIndex].bucketVideo = newBucket[bucketIndex].bucketVideo.filter(video => !selectedVideos.includes(video.videoTitle));
    setBucket(newBucket);
  }

  const handleMoveBucket = (sourceBucketIndex, destinationBucketIndex, selectedVideos) => {

    if(sourceBucketIndex===destinationBucketIndex)
    {
      alert('From Bucket And To Bucket must be different');
      return;
    }

    if(selectedVideos.length===0)
    {
      alert('Please Select Atleast One Video');
      return;
    }

    const sourceBucket = bucket[sourceBucketIndex];
    const destinationBucket = bucket[destinationBucketIndex];

    // Remove selected videos from the source bucket
    const newSourceBucketVideo = sourceBucket.bucketVideo.filter((video) => !selectedVideos.includes(video.videoTitle));
    const newSourceBucket = { bucketName:sourceBucket.bucketName, bucketVideo: newSourceBucketVideo };



    // Add selected videos to the destination bucket
    const newDestinationBucketVideo = [...destinationBucket.bucketVideo, ...sourceBucket.bucketVideo.filter((video) => selectedVideos.includes(video.videoTitle))];
    const newDestinationBucket = { bucketName:destinationBucket.bucketName, bucketVideo: newDestinationBucketVideo };

    // Update bucket state
    const newBucket = [...bucket];
    newBucket[sourceBucketIndex] = newSourceBucket;
    newBucket[destinationBucketIndex] = newDestinationBucket;

    setBucket(newBucket);

    setModalOpen(false);
  }

  const handleClick = (e) =>{
    setModalTitle(e.target.name);
    setModalOpen(true);
  }

  const navigate = useNavigate();

  return (
    <Box display='flex' flexDirection='column' mt='50px'>
      <Box>
        <ButtonGroup gap='4' float='right' mr='20px'>
          <Button leftIcon={<AiOutlinePlus/>} name='Add Bucket' onClick={handleClick}>Add Bucket</Button>
          <Button leftIcon={<AiOutlineDelete/>} name='Remove Buckets' onClick={handleClick}>Remove Bucket</Button>
          <Button leftIcon={<MdDriveFileMoveOutline/>} name='Move Videos' onClick={handleClick}>Move Videos</Button>
        </ButtonGroup>
        
      </Box>
      {
        bucket?.map((item, index) => (
          <Row
            bucket={item}
            bucketIndex={index}
            key={index}
            handleAddVideo={handleAddVideo}
            handleRemoveVideo={handleRemoveVideo}
          />
        ))
      }

      <UserModal isOpen={isModalOpen} onClose={()=>setModalOpen(false)} title={modalTitle}>
        <Form formType={modalTitle} bucket={bucket} onSubmit={modalTitle==='Add Bucket'?handleAddBucket:(modalTitle==='Remove Buckets'?handleRemoveBucket:handleMoveBucket)}/>
      </UserModal>
      <Box p='10px' m='10px'>
        <Heading>Your Library:</Heading>
        <Text>Your History:</Text>
        <Box mx='auto' my='40px' p='20px' borderRadius='10px' w='70%' maxW='500px' minW='280px' border='1px solid #F0F0F0' textAlign='center'>
            {
              history.length===0?
              <Text>You doesn't have any history yet</Text>:
              history.map((item,index)=>(
                <Card key={index} onClick={()=>navigate(item.pathname)} my='8px' className='history_card'>
                    <Text>{item.videoTitle}</Text>
                </Card>
              ))
            }

        </Box>
      </Box>
    </Box>
  )
}
