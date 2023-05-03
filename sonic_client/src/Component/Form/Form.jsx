import React,{useState} from 'react'
import {
    FormControl,
    FormLabel,
    Button,
    HStack,
    Input,
    Select,
    VStack,
    Checkbox,
    CheckboxGroup
  } from '@chakra-ui/react'

import FileUpload from '../FileUpload/FileUpload'

export default function Form({formType,onSubmit,bucket,bucketIndex}) {

    const [bucketName, setBucketName] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [selectedBuckets, setSelectedBuckets] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [videoFile,setVideoFile] = useState(null);
    const [fromBucketIndex,setFromBucketIndex] = useState(-1);
    const [toBucketIndex,setToBucketIndex] = useState(-1);


    const handleInput = (selected,name) =>{
        if(name==='Remove Buckets'){
            setSelectedBuckets(selected);
        }
        else if(name==='Remove Videos' || name==='Move Videos'){
            setSelectedVideos(selected)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        switch (formType) {
            case 'Add Bucket':
                onSubmit(bucketName);
                setBucketName('');
                break;
            case 'Remove Buckets':
                onSubmit(selectedBuckets);
                break;
            case 'Add Video':
                onSubmit(bucketIndex, { videoTitle:videoTitle,videoFile:videoFile });
                break;
            case 'Remove Videos':
                onSubmit(bucketIndex, selectedVideos)
                break;
            case 'Move Videos':
                onSubmit(fromBucketIndex, toBucketIndex, selectedVideos);
                break;
            default:
                break;
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        {
            formType==='Add Bucket' &&
            <FormControl isRequired my='10px'>
                <FormLabel>Bucket Name:</FormLabel>
                <Input type='text' placeholder='Enter bucket name...' onChange={(e)=>setBucketName(e.target.value)}/>
            </FormControl>
        }
        {
            formType==='Add Video' &&
            <>
                <FormControl isRequired my='10px'>
                    <FormLabel>Video title:</FormLabel>
                    <Input type='text' placeholder='Enter Video Title...' onChange={(e)=>setVideoTitle(e.target.value)}/>
                </FormControl>
                <FormControl isRequired>
                    <FileUpload icon fileName accept='video/*' buttonTitle='Upload Video File' setFile={setVideoFile}/>
                </FormControl>
            </>
        }

        {
        formType==='Remove Buckets' &&
        <FormControl my='10px'>
            <FormLabel>Selected Buckets:</FormLabel>
            <CheckboxGroup value={selectedBuckets} onChange={(selected) => handleInput(selected,'Remove Buckets')}>
            <VStack alignItems='start'>
                {bucket.map((bucket, index) => (
                <Checkbox key={index} value={bucket.bucketName}>
                    {bucket.bucketName}
                </Checkbox>
                ))}
            </VStack>
            </CheckboxGroup>
        </FormControl>
        }


        {
        formType==='Remove Videos' &&
        <>
            <FormControl my='10px'>
            <FormLabel>Select Videos from {bucket.bucketName}:</FormLabel>
            <CheckboxGroup value={selectedVideos} onChange={(selected) => handleInput(selected,'Remove Videos')} isRequired>
                <VStack alignItems='start'>
                {bucket.bucketVideo.map((video, index) => (
                    <Checkbox key={index} value={video.videoTitle}>
                    {video.videoTitle}
                    </Checkbox>
                ))}
                </VStack>
            </CheckboxGroup>
            </FormControl>
        </>
        }

    {
    formType==='Move Videos' &&
    <>
        <HStack spacing={2}>
        <FormControl isRequired my='10px'>
            <FormLabel>Select From Bucket:</FormLabel>
            <Select placeholder='Select bucket' onChange={(e)=>setFromBucketIndex(e.target.value)}>
                {bucket.map((bucket, index) => (
                    <option key={index} value={index}>{bucket.bucketName}</option>
                ))}
            </Select>
        </FormControl>
        <FormControl isRequired my='10px'>
            <FormLabel>Select To Bucket:</FormLabel>
            <Select placeholder='Select bucket' onChange={(e)=>setToBucketIndex(e.target.value)}>
                {bucket.map((bucket, index) => (
                    <option key={index} value={index}>{bucket.bucketName}</option>
                ))}
            </Select>
        </FormControl>
        </HStack>
        <FormControl my='10px'>
        <FormLabel>Select Videos:</FormLabel>
        <CheckboxGroup value={selectedVideos} onChange={(selected) => handleInput(selected,'Move Videos')}>
            <VStack alignItems='start'>
            {(fromBucketIndex!== -1 && fromBucketIndex!==undefined) &&
                bucket[fromBucketIndex]?.bucketVideo.map((video, index) => (
                <Checkbox key={index} value={video.videoTitle}>
                    {video.videoTitle}
                </Checkbox>
                ))
            }
            </VStack>
        </CheckboxGroup>
        </FormControl>
    </>
    }

        <Button type='submit' my='20px'>
            Submit
        </Button>
    </form>
  )
}
