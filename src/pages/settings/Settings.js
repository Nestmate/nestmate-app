import { ClipboardIcon, CollectionIcon, LocationMarkerIcon, PhotographIcon } from "@heroicons/react/outline";
import { Avatar, Stack ,Text, Title} from "@mantine/core";
import { Link } from "react-router-dom";
import { Container } from "../../components/elements/Container"


export const Settings = () => {

  const settingsNavigation = [
    {
      name: "Personal Information",
      to: "/profile/settings/personal",
      icon: <ClipboardIcon className="w-6 h-6"/>,
    },
    {
      name: "Interests & Hobbies",
      to: "/profile/settings/interests",
      icon: <CollectionIcon className="w-6 h-6"/>,
    },
    {
      name: "Move Information",
      to: "/profile/settings/move",
      icon: <LocationMarkerIcon className="w-6 h-6" />,
    },
    {
      name: "Pictures",
      to: "/profile/settings/pictures",
      icon: <PhotographIcon className="w-6 h-6"/>,
    }
  ];

  return (
    <section>
        <Container className='max-w-2xl'>
            <header className="mb-6">
                <h1 className="text-2xl md:text-5xl">Account Settings</h1>
            </header>

            <Stack spacing={0}>
              {settingsNavigation.map(({to,name,icon}, i) => <>
                
                <Link to={to} className="border-b-2 border-slate-200 w-full py-6">
                  <div className="flex gap-3 items-center">
                    <Avatar color="blueStone">{ icon }</Avatar>
                    <div>
                      <Title order={4}>{name}</Title>
                      <Text size="sm" color="gray">Description</Text>
                    </div>
                  </div>
                </Link>
              </>)}
            </Stack>
        </Container>
    </section>
  )
}
