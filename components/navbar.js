import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
  } from '@chakra-ui/react';
  
  export default function Navbar() {
  
    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex flex={{ base: 1 }} justify={{ md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ md: 'left' })}
              fontFamily={'caveat'}
              fontSize='2rem'
              color={useColorModeValue('gray.800', 'white')}>
              Short.ly
            </Text>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            </Flex>
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            {/* <Button
              display={{ md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              href={'#'}
              _hover={{
                bg: 'pink.300',
              }}>
              Sign Up
            </Button> */}
          </Stack>
        </Flex>
  
      </Box>
    );
  }
  