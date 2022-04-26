import { Container } from "../../components/elements/Container"
import { LocationSearch } from "../../components/elements/search/LocationSearch"

export const Hero = () => {
  return (
    <section>
        <Container>
            <div className="grid grid-cols-2 gap-4">
                <article>
                    <div className="text-left">
                        <h1 className="text-5xl md:text-7xl">Find your perfect roommate.</h1>
                        <p className="text-2xl my-4">We're not fully launched yet 😢. But feel free to request an early beta invite.</p>
                        <LocationSearch size={'xl'}/>
                    </div>
                </article>
                <aside>

                </aside>
            </div>
        </Container>
    </section>
  )
}
