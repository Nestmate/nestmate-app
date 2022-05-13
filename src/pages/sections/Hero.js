import { Stack, Text } from "@mantine/core"
import { Link } from "react-router-dom"
import { Container } from "../../components/elements/Container"
import { LocationSearch } from "../../components/elements/search/LocationSearch"

export const Hero = () => {
  return (
    <section>
        <Container>
            <div className="grid grid-cols-3 gap-4">
                <article className="col-span-2">
                    <div className="text-left">
                        <Stack>
                            <h1 className="text-3xl md:text-5xl">Find your perfect roommate.</h1>
                            <p className="text-2xl">No matter where you're moving, nestmate will find you your perfect roommate.</p>
                            <LocationSearch size={'xl'}/>
                            <Text className="flex gap-2"><b>Trending:</b> <Link className="" to={'/mates/location/38.748243/-9.140093'}>Lisbon</Link> <Link to={'/mates/location/38.748243/-9.140093'}>Barcelona</Link></Text>
                        </Stack>
                    </div>
                </article>
                <aside>

                </aside>
            </div>
        </Container>
    </section>
  )
}
