import { Button } from "@mantine/core";

export const CompleteForm = ({ data, onFormUpdated, isLoading }) => {

    const isOnboarded = true;

    const onSubmitHandler = (e) => {

        e.preventDefault();

        onFormUpdated({isOnboarded});
    }

    return (
        <form onSubmit={onSubmitHandler}>
           <Button type="submit" size="lg" loading={isLoading}>Complete Onboarding</Button>
        </form>
    )
}
