import React,{useRef,useState} from 'react'
import { Box, Button,Text } from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'

function sliceString(str,size){

    if(str.length<=size)
    return str;
  
    return (str.slice(0,size) + '...');
  }

export default function FileUpload({icon,fileName,accept,buttonTitle,className,name,setFile}) {
    
    const fileInput = useRef(null);
    const [inputFile,setInputFile] = useState("");
    const [inputFileName,setInputFileName] = useState('');

    const handleClick = () =>{
        fileInput.current.click();
    }

    const handleInputChange = (e) =>{

       const file=  URL.createObjectURL (e.target.files[0])
       setFile(file);
       setInputFile(file);
            // const reader = new FileReader();
            // reader.readAsDataURL(e.target.files[0]);
            // reader.onload = () => {
            //     setInputFile(reader.result);
            //     setFile(name,reader.result);
            // };

        setInputFileName(sliceString(e.target.files[0].name,10))
    }

  return (
    <Box display='inline-flex' className={className}>
        <Button leftIcon={icon?<FiUpload style={{margin:0}}/>:null} onClick={handleClick} w='max-content' bg='none' _hover='none' _focus='none'>
            {buttonTitle}
        </Button>
        {
            fileName ?
            <Text marginLeft="8px" display='flex' alignItems='center' fontSize='13px'>{inputFile!==""?inputFileName:"No File Selected"}</Text>
            :
            null
        }
        <input type='file' ref={fileInput} onChange={handleInputChange} accept={accept?accept:"*"} style={{display:"none"}}/>
    </Box>
  )
}
