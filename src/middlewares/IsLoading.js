import { LoadingOverlay } from '@mantine/core'

export const IsLoading = ({loading}) => {
  return (
    <LoadingOverlay visible={loading} />
  )
}
