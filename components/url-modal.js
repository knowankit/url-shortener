import {
    Button,
    InputGroup,
    Input,
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

const ConvertModal = ({ url }) => {
    const [id, setId] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isGenerating, setGenerating] = useState(false)
    const toast = useToast()

    const shortenUrl = async () => {
      setGenerating(true)

      const linksRef = collection(db, 'links')
      console.log('url', url)
      debugger
      await addDoc(linksRef, { url, slug: id })

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
              <Input disabled type="text" placeholder="Enter your URL" borderRadius='20px' value={url} />
            </InputGroup>
            <InputGroup mt='20px'>
              <InputLeftAddon children="/" />
              <Input value={id} type="url" placeholder="Enter your URL" borderRadius='20px' onChange={(e) => setId(e.target.value)} />
            </InputGroup>
            <InputGroup size="md" mt='20px'>
              <Input
                pr="4.5rem"
                type="text"
                value={typeof window !== 'undefined' && `${window.location.origin}/${id}`}
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
            }} variant="ghost" onClick={shortenUrl} isLoading={isGenerating} loadingText='Generating'>Generate</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  export default ConvertModal