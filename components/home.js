import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  InputGroup,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  InputLeftElement,
  InputRightElement,
  InputLeftAddon,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react'
import { LinkIcon } from '@chakra-ui/icons'
import { db } from '../firebase-config'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import copy from 'copy-to-clipboard';

export default function Home() {
  const [url, setUrl] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [meta, setMeta] = useState([])

  useEffect(() => {
    async function metaData() {
      await getMetaData()
    }

    metaData()
  }, [])

  const getMetaData = async () => {
    const metaRef = collection(db, 'meta')
    const data = await getDocs(metaRef)
    const response = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    if(response.length > 0) {
      setMeta(response[0])
      console.log('mettaa', meta)
    }
  }
  // const data = await getDocs(linksRef)
  // console.log('daata', data.docs.map((doc) => ({...doc.data(), id: doc.id})))

  const ConvertModal = ({ url, count }) => {
    const [id, setId] = useState('')
    const [isGenerating, setGenerating] = useState(false)
    const toast = useToast()

    const shortenUrl = async (data) => {
      if(!data) return

      setGenerating(true)

      const linksRef = collection(db, 'links')
      const metaRef = collection(db, 'meta')

      await addDoc(linksRef, { url: data, slug: id })
      // await addDoc(metaRef, {activity: { totalLinks: count + 1 }})

      const url = `${window.location.origin}/${id}`
      copy(url)

      toast({
        title: "Success",
        description: "Your URL has been generated and copied to clipboard",
        status: "success",
        duration: 9000,
        isClosable: true,
      })

      setGenerating(false)
    }

    const copyToClipboard = () => {
      const url = `${window.location.origin}/${id}`
      copy(url)
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate URL</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LinkIcon color="gray.300" />}
              />
              <Input disabled type="url" placeholder="Enter your URL" borderRadius='20px' defaultValue={url} />
            </InputGroup>
            <InputGroup mt='20px'>
              <InputLeftAddon children="/" />
              <Input value={id} type="url" placeholder="Enter your URL" borderRadius='20px' onChange={(e) => setId(e.target.value)} />
            </InputGroup>
            <InputGroup size="md" mt='20px'>
              <Input
                pr="4.5rem"
                type="url"
                defaultValue={typeof window !== 'undefined' && `${window.location.origin}/${id}`}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={copyToClipboard}>
                  copy
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={'green'} bg={'green.400'} color='white' _hover={{
              bg: 'green.500',
            }} variant="ghost" onClick={() => shortenUrl(url)} isLoading={isGenerating} loadingText='Generating'>Generate</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container maxW={'3xl'} height='calc(100vh - 65px)' display='flex' alignItems='center' justifyContent='center'>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Shorten your long <br />
            <Text as={'span'} color={'pink.400'}>
              URL
            </Text>
          </Heading>
          <Text color={'pink.400'}>
            More than just url shorter.
          </Text>
          <Stack
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Box display='flex' flexDirection={['column', 'column', 'row', 'row']} height='90px' justifyContent='space-between'>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<LinkIcon color="gray.300" />}
                />
                <Input type="url" placeholder="Enter your url" borderRadius='20px' value={url} onChange={(e) => setUrl(e.target.value)} />
              </InputGroup>
              <Button
                colorScheme={'pink'}
                onClick={onOpen}
                bg={'pink.400'}
                rounded={'full'}
                ml='5px'
                px={6}
                _hover={{
                  bg: 'pink.500',
                }}>
                Get Started
              </Button>
            </Box>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue('gray.800', 'gray.300')}
                w={71}
                position={'absolute'}
                right={-71}
                top={'10px'}
              />
              <Text
                fontSize={'lg'}
                fontFamily={'Caveat'}
                position={'absolute'}
                right={'-125px'}
                top={'-15px'}
                transform={'rotate(10deg)'}>
                Do it now
              </Text>
            </Box>
          </Stack>
          {/* <Box display='flex' justifyContent='center'>
          <Box borderRadius='20px' p='10px' mr='10px' height='80px'>
            <Box as='p' color='gray'>Total Links Converted</Box>
            <Box as='p' fontWeight='bold'>{meta?.activity.totalLinks}</Box>

          </Box>
          <Box borderRadius='20px' p='10px' height='100px'>
            <Box color='gray'>Last used</Box>
            <Box as='p' fontWeight='bold'>{meta?.activity.lastUsed}</Box>
          </Box>
        </Box> */}
        </Stack>

      </Container>
      {isOpen && <ConvertModal url={url} count={meta?.activity?.totalLinks} />}
    </>
  );
}

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});