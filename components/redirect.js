import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase-config'
import { Spinner, Box } from "@chakra-ui/react"
import NotFound from './not-found';

const Redirect = ({ id }) => {
  const [spinner, setSpinner] = useState(true)
  const [isInvalid, setInvalid] = useState(false)


  useEffect(() => {
    async function fetchData() {
      const linksRef = collection(db, "links");
      const q = query(linksRef, where("slug", "==", id));
      const data = []
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      if (data.length > 0) {
        setSpinner(false)
        window.open(data[0].url)
      } else {
        setSpinner(false)
        setInvalid(true)
      }
    }

    fetchData()
  }, [])

  return (
    <Box height='100vh' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
      {!isInvalid && <Box as='p'>
        Redirecting you to the site
      </Box>
      }
      {spinner && <Spinner />}
      {isInvalid && <NotFound />}
    </Box>
  )
}

export default Redirect