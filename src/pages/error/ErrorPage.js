import { Link } from "react-router-dom"
import { Container } from "../../components/elements/Container"

export const ErrorPage = () => {
  return (
    <section>
        <Container>
          <h1 className="text-6xl mb-3">Uh oh!</h1>
          <p className="text-xl mb-6">It seems like we couldn't find the page you're looking for.</p>
          <div className="grid grid-col-1 md:flex items-center gap-3 text-center"><Link to="/" className="button px-4 py-3">Go home</Link> <Link to="/" className="nav-link">Need help?</Link></div>
        </Container>
    </section>
  )
}
