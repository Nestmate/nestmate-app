import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container } from "../../components/elements/Container"
import { MateDetail } from "../../components/mates/mate/MateDetail"

export const Mate = () => {

  useEffect(() => {
    (async () => {
    })();
  },[])

  return (
    <section>
        <Container>
            <MateDetail />
        </Container>
    </section>
  )
}
