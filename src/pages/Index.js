import { Hero } from "./sections/Hero"
import { Locations } from "./sections/Locations"
import { NearByRoomMates } from "./sections/NearByRoomMates"

export const Index = () => {
  return (
      <main>
        
        <Hero />
        <NearByRoomMates />
        <Locations />

      </main>
  )
}