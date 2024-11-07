import React from 'react'
import Navbar from '../Components/Navbar'
import { Box, Divider, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import Footer from '../Components/Footer'

function ContactUs() {
  return (
    <>
        <Navbar/>
        
        <Divider/>

        <Box>
            <Text sx={{textAlign:'center',fontWeight:'bold' ,fontSize:'2em', mb:'1em'}}>
                Contact Us
            </Text>
            <Box sx={{border:'2px solid #747373', borderRadius:'1rem', m:'1em', p:'1rem'}}>


<Text fontWeight="bold">
Contact Us
</Text>

<Box>
If you have any queries, please contact us by email or number: 
<br /> <Box as='a' target="_blank" href="mailto:abhinavsingh2029@gmail.com" color='#0C26FE'>abhinav.singh2029@gmail.com</Box>
<br />
<a href="tel:+91-7076118777" color='#0C26FE'>+91-7076118777</a>
<br /> Address: B-221, Radhakrishnan Hall of Residence, IIT Kharagpur, Pincode=721302


</Box>


</Box>
        </Box>
        {/* <Footer/> */}
    </>
  )
}

export default ContactUs