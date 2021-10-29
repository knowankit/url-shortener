import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase-config'
import { Spinner, Box } from "@chakra-ui/react"

const Redirect = ({ id }) => {
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const linksRef = collection(db, "links");
      const q = query(linksRef, where("slug", "==", id));
      const data = []
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      if(data.length > 0) {
        setSpinner(false)
        window.open(data[0].url)
      }
    }

    fetchData()
  }, [])

  return (
    <Box height='100vh' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
      <Box as='p'>
      Redirecting you to the site
      </Box>
      {spinner && <Spinner />}
    </Box>
  )
}

export default Redirect