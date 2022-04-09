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
                  ['Home', '/dashboard'],
                  ['Team', '/team'],
                  ['Projects', '/projects'],
                  ['Reports', '/reports'],
              ].map(([title, url]) => (
                  <Link to={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</Link>
              ))}
          </nav>
          <div>
            <nav className="flex sm:justify-center space-x-4 py-4">
                {[
                    ['Login', '/auth/signin'],
                    ['Get Started', '/auth/signup'],
                ].map(([title, url]) => (
                    <Link to={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</Link>
                ))}
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}
