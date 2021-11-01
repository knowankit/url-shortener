import Redirect from '../components/redirect'

const URL = ({ id }) => {
    return (
        <Redirect id={id} />
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params

    return {
      props: {
        id
      }
    }
  }

export default URL