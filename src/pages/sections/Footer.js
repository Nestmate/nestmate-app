import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../../components/elements/Container'

export const Footer = () => {
  return (
    <footer className='section bg-gray-900 text-white'>
        <Container>
            <div className='grid grid-col-1 md:grid-col-4 lg:grid-cols-5'>
                <div>
                    <h2>Nestmate</h2>
                    <p>Copyright &copy;</p>
                </div>
                <div>
                    <h2 className='text-xl mb-3'>Popular locations</h2>
                    <nav>
                        <ul className='grid grid-cols-1 gap-2'>
                            <li><Link to="/roommates/lisbon">Lisbon</Link></li>
                            <li><Link to="/roommates/barcelona">Barcelona</Link></li>
                            <li><Link to="/roommates/paris">Paris</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>

        </Container>
    </footer>
  )
}
