import { Button, Grid, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { InterestSelect } from "../../elements/form/InterestSelect";

export const InterestForm = ({ data, onFormUpdated, isLoading }) => {


    const [interests, setInterests] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {

        console.log(data);
        setInterests(data.interests);
        setDescription(data.description);

    },[])

    const onSubmitHandler = (e) => {

        e.preventDefault();

        //DOING MY OWN VALIDATION

        onFormUpdated({
            interests,
            description
        });
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <Grid>
                <Grid.Col>

                    <InterestSelect loadedInterests={interests} onChange={(val) => setInterests(val)}/>

                </Grid.Col>

                <Grid.Col>

                    <Textarea 
                        label="Your Hobbies"
                        value={description}
                        size="md"
                        placeholder="Your Hobbies"
                        onChange={(e) => setDescription(e.currentTarget.value)} />

                </Grid.Col>

                <Grid.Col>
                    <Button type="submit" size="md" fullWidth loading={isLoading}>Update</Button>
                </Grid.Col>
                
            </Grid>
        </form>
    )
}
