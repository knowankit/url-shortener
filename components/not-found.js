import { Box } from "@chakra-ui/react"

const NotFound = () => {
    return (
        <Box height='100vh' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
            <Box as='h1'>
                Invalid URL
            </Box>
        </Box>
      )
}

export default NotFound