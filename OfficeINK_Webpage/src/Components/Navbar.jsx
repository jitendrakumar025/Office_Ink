import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect } from 'react'
// let fullLogo='https://res.cloudinary.com/dcl6c7qan/image/upload/v1696935413/OfficeINK/OfficeINK_fullLOGO_o5piry.png'

function Navbar() {
  const buttonStyle={ 
    color:'white',p:'1em', borderRadius:'7px',bg:'#021459',cursor:'pointer',textDecor:'none',
    '&:hover':{
        bg:'#344ca5',
        color:'white',
        textDecoration:'none'
    }
}
const [isLargerThan476px] = useMediaQuery('(min-width: 476px)')

let token;

useEffect(() => {
    token = localStorage.getItem('token')
    console.log("token",token);
}, [])
  
      
return (  
    <Flex justifyContent='space-between' alignItems='center'>
        <Box as='a' href='/' ml='2em'>
           <Image  src={require('../OfficeINK_fullLOGO.png')} alt="logo" sx={{height:'7rem',cursor:'pointer'}} />
        </Box>

       {  isLargerThan476px ?(

        <Box as='div' display='flex' gap='1em' mr='2em' >
            <Button as='a' target="_blank" href='https://chrome.google.com/webstore/detail/office-ink-comment-and-po/caoebkpcoieoneniagdligghacpekdgo' variant='outline' sx={{border:'1px solid #021459', borderRadius:'2px' , p:'.5em', cursor:'pointer'}}>Chrome Extension</Button>
        {  localStorage.getItem('token') ?(
          <>
          <Button as='a' href='/dashboard' variant='outline' sx={{border:'1px solid #021459', borderRadius:'2px' , p:'.5em', cursor:'pointer'}}>Dashboard</Button>
          </>
            ):(<>
              <Button as='a' href='/login' variant='solid'  sx={buttonStyle} > Login</Button>
              <Button as='a' href='/signup' variant='solid' sx={buttonStyle}>Sign Up</Button>
            </>
            )
        }
        </Box>
       ):
(
        <Menu className="menudrawer">
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
        />
        <MenuList>
          <MenuItem >
          <Button as='a' target='_blank' variant='outline' href='https://chrome.google.com/webstore/detail/office-ink-comment-and-po/caoebkpcoieoneniagdligghacpekdgo' sx={{border:'1px solid #021459', borderRadius:'2px' , p:'.5em', cursor:'pointer'}}>Chrome Extension</Button>
          </MenuItem>
  {  token ?(
  <>
          
          <MenuItem >
          <Button as='a' href='/dashboard' variant='outline' sx={{border:'1px solid #021459', borderRadius:'2px' , p:'.5em', cursor:'pointer'}}>Dashboard</Button>
          </MenuItem>
        
          </>
            ):(<>
            <MenuItem >
              <Button as='a' href='/login' variant='solid'  sx={buttonStyle} > Login</Button>
            </MenuItem>
            <MenuItem >
              <Button as='a' href='/signup' variant='solid' sx={buttonStyle}>Sign Up</Button>
            </MenuItem>
            </>
            )
    }        
        </MenuList>
      </Menu>)}
    </Flex>
  )
}

export default Navbar