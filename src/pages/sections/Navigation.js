import { Container } from "../../components/elements/Container"
import Logo from '../../assets/logo/nestmate-logo-full.svg'
import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <header>
      <Container>
        <div className="flex justify-between items-center">
          <div><img src={Logo} alt="Nestmate Logo" className="h-7"/></div>
          <nav className="flex sm:justify-center space-x-4 py-4">
              {[
                  ['Home', '/dashboard','nav-link'],
                  ['Team', '/team','nav-link'],
                  ['Projects', '/projects','nav-link'],
                  ['Reports', '/reports','nav-link'],
              ].map(([title, url, className]) => (
                  <Link to={url} className={className}>{title}</Link>
              ))}
          </nav>
          <div>
            <nav className="flex sm:justify-center space-x-4 py-4">
                {[
                    ['Login', '/auth/signin', 'nav-link'],
                    ['Get Started', '/auth/signup','button'],
                ].map(([title, url, className]) => (
                    <Link to={url} className={className}>{title}</Link>
                ))}
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}
