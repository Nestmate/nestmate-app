import { useEffect } from "react"
import { Container } from "../../components/elements/Container"
import { UserContext } from "../../context/user.context"
import { useContext,useState } from "react"
import { getMatesByUserId } from "../../api/NestmateApi"

export const Mates = () => {

    const { user } = useContext(UserContext);
    const [loading,setLoading] = useState(true);
    const [mates,setMates] = useState([]);
    
    useEffect(() => {

        (async () => {
            
            const { data } = await getMatesByUserId(user._id);
            setLoading(false);
            setMates(data);
        })();

    }, [user]);

  return (
      <section className="min-h-min">
          <Container>
                <header>
                    <h1>Mates</h1>

                    {loading && <p>Loading...</p>}
                    {!loading && mates?.length === 0 && <p>No mates found</p>}
                    {!loading && mates?.length > 0 && <ul>
                        {mates.map(mate => <li key={mate._id}>{mate.mate.username}</li>)}
                    </ul>}
                </header>
          </Container>
      </section>
  )
}
