import { Box, Flex, Image, Link, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { BsLinkedin, } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { FaTwitterSquare } from 'react-icons/fa'
import fullLogo from '../OfficeINK_fullLOGO.png'






function Footer() {

    const fontSizes = {
        base: ".8em", md: "1.3em", lg: "1.5em"
     }

     const fontSizes2 = {
        base: "10px", md: "14px", lg: "18px"
     }

     const [isLargerThan476px] = useMediaQuery('(min-width: 476px)')
     const flexcss=()=>{
        return !isLargerThan476px&&('column-reverse')
     }

return (
    <>
    <Flex justifyContent='space-evenly' bg='#D9D9D9' p='1em'  flexDirection={flexcss} >
        {/* <Box display="flex" flex="wrap" > */}
        <Box  display={!isLargerThan476px&&('flex')} alignItems={!isLargerThan476px&&('center')} justifyContent={!isLargerThan476px&&('space-evenly')} >
            <Image src={fullLogo} alt='logo' className='_fullLogo'  sx={{height:'100px',m:'0'}} />
            <Box display='flex'>
               <Link href='https://www.linkedin.com/company/officeink/'><BsLinkedin style={{color:"#021459"}}/></Link> 
               {/* <Link href='https://www.instagram.com'><AiFillInstagram style={{color:"#021459"}}/></Link>  */}
               {/* <Link href='https://www.twitter.com'><FaTwitterSquare style={{color:"#021459"}}/></Link>  */}
           </Box>
            <Text as='h4' mt={0} fontSize={fontSizes2} >Office Ink @ 2023 <br /> All Right Reserved</Text>
        </Box>
        <Box display='flex' justifyContent='space-evenly' flexWrap='wrap' flex='1'>
        <Box flexDirection='column'>
            <Text sx={{fontsize:'2rem', fontWeight:'bold'}} fontSize={fontSizes}>Product</Text>
            <Box display='flex' flexDirection='column'>
            <Link target="_blank" href='https://chrome.google.com/webstore/detail/office-ink-comment-and-po/caoebkpcoieoneniagdligghacpekdgo' sx={{my:'.3rem',textDecor:'none'}} fontSize={fontSizes2}>Chrome Extension</Link>
            <Link href='/dashboard'sx={{textDecor:'none'}} fontSize={fontSizes2}>Custom Voice</Link>
            </Box>
        </Box>
        <Box>
            <Text sx={{fontsize:'2rem', fontWeight:'bold'}} fontSize={fontSizes}>Resources</Text>
            <Box display='flex' flexDirection='column'>
            <Link  href='/' sx={{my:'.3rem',textDecor:'none'}} fontSize={fontSizes2}>Pricing</Link>
            <Link  href='/policy'sx={{ my:'.3rem',textDecor:'none'}} fontSize={fontSizes2}>Privacy Policy</Link>
            <Link  href='/terms'sx={{my:'.3rem', textDecor:'none'}} fontSize={fontSizes2}>Terms & Conditions</Link>
            </Box>
        </Box>
        <Box>
            <Text sx={{fontsize:'2rem', fontWeight:'bold'}} fontSize={fontSizes}>Company</Text>
            <Box display='flex' flexDirection='column' >
            <Link as='a' href='/' sx={{my:'.3rem',textDecor:'none'}} fontSize={fontSizes2} >About Us</Link>
            <Link as='a' href='/contact' sx={{textDecor:'none'}} fontSize={fontSizes2}>Contact Us</Link>
            </Box>
        </Box>


        </Box>

    </Flex>

    </>
  )
}

export default Footer