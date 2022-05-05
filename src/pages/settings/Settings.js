import { Button, Divider, Group, List,ListItem, Text, Title, UnstyledButton} from "@mantine/core";
import { Link } from "react-router-dom";
import { Container } from "../../components/elements/Container"


export const Settings = () => {

  const settingsNavigation = [
    {
      name: "Personal Information",
      to: "/profile/settings/personal",
      icon: <List.Icon prefix="fe" name="user" />,
    },
    {
      name: "Interests & Hobbies",
      to: "/profile/settings/interests",
      icon: <List.Icon prefix="fe" name="user" />,
    },
    {
      name: "Move Information",
      to: "/profile/settings/move",
      icon: <List.Icon prefix="fe" name="user" />,
    },
    {
      name: "Pictures",
      to: "/profile/settings/pictures",
      icon: <List.Icon prefix="fe" name="user" />,
    }
  ];

  return (
    <section>
        <Container className='max-w-2xl'>
            <header className="mb-6">
                <h1>Account Settings</h1>
            </header>

            <List spacing="lg">
              {settingsNavigation.map(({to,name,icon}, i) => <>
                <List.Item key={i}>
                <UnstyledButton component={Link}  to={to} onClick={() => console.log('try focusing button with tab')}>
                  <Group>
                    <div>
                      <Title order={5}>{name}</Title>
                      <Text size="sm" color="gray">Description</Text>
                    </div>
                  </Group>
                </UnstyledButton>
                <Divider my="sm" />
                </List.Item>
              </>)}
            </List>
        </Container>
    </section>
  )
}
