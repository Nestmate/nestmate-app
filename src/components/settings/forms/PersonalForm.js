import { Button, Grid, Select, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";

export const PersonalForm = ({ data, onFormUpdated, isLoading }) => {

    const pronounsList = [
        { value: "other", label: "Other" },
        { value: "he/him", label: "He/Him" },
        { value: "she/her", label: "She/Her" },
        { value: "they/them", label: "They/Them" },
    ];

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [pronouns, setPronouns] = useState(null);

    useEffect(() => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setBirthDate( new Date(data.birthDate) );
        setPronouns(data.pronouns || 'other');
    },[])

    const onSubmitHandler = (e) => {

        e.preventDefault();

        //DOING MY OWN VALIDATION

        onFormUpdated({
            firstName,
            lastName,
            birthDate,
            pronouns
        });
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <Grid>
                <Grid.Col>

                    <TextInput 
                        label="First Name"
                        value={firstName}
                        size="md"
                        placeholder="First Name"
                        required
                        onChange={(e) => setFirstName(e.currentTarget.value)} />

                </Grid.Col>

                <Grid.Col>

                    <TextInput 
                        label="Last Name"
                        value={lastName}
                        size="md"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.currentTarget.value)} />

                </Grid.Col>

                <Grid.Col>

                    <DatePicker 
                        label="When were you born?"
                        value={birthDate}
                        size="md"
                        allowFreeInput
                        placeholder="mm/dd/yyyy"
                        required
                        onChange={(date) => setBirthDate(date)} />

                </Grid.Col>

                <Grid.Col>

                    <Select
                        label="What are your pronouns?"
                        placeholder="Pick one"
                        value={pronouns}
                        data={pronounsList}
                        size="md"
                        onChange={(value) => setPronouns(value)}
                        />

                </Grid.Col>

                <Grid.Col>
                    <Button type="submit" size="md" fullWidth loading={isLoading}>Update</Button>
                </Grid.Col>
                
            </Grid>
        </form>
    )
}
