import { Button, Stack, Text, Title, Image } from "@mantine/core"

export const EmptyState = ( { image, title, subtitle, cta, onAction } ) => {
  return (
    <div className="mx-auto text-center">
        <Stack align={'center'}>
            { image && <Image src={ image } className="w-32 h-32"/> }
            { title && <Title>{ title }</Title> }
            { subtitle && <Text>{ subtitle }</Text> }
            { cta && <Button onClick={ onAction } size="lg">{ cta }</Button> }
        </Stack>

    </div>
  )
}
