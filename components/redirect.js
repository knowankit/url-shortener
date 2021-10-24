import { useRouter } from 'next/router'

const Redirect = () => {
    const router = useRouter()
  const { id } = router.query

    return (
        <h1>Redirect - {id}</h1>
    )
}

export default Redirect