import { useEffect } from "react"
import { Container } from "../../components/elements/Container"
import { UserContext } from "../../context/user.context"
import { useContext,useState } from "react"

export const Mates = () => {

    const { user } = useContext(UserContext)

    useEffect(() => {
        (async () => {


        })();

    }, [user]);

    const [mates, setMates] = useState([])

  return (
      <section>
          <Container>
                <header>
                    <h1>Mates</h1>
                </header>
          </Container>
      </section>
  )
}
