import { Button, Grid, NumberInput, SimpleGrid, Textarea } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import moment from "moment";
import { useEffect, useState } from "react";
import { InterestSelect } from "../../elements/form/InterestSelect";
import { LocationBar } from "../../elements/search/LocationBar";

export const MoveForm = ({ data, onFormUpdated, isLoading }) => {


    const [loc, setLoc] = useState({
        type: "Point",
        coordinates: [0, 0]
    });


    const [moveDateRange, setMoveDateRange] = useState(
            [ 
                moment(), 
                moment()
            ]);

    const [budgetRange, setBudgetRange] = useState([300,1000]);

    useEffect(() => {

        console.log(data);
        setLoc(data.loc);
        setMoveDateRange(data.moveDateRange.length ? [new Date(data.moveDateRange[0]), new Date(data.moveDateRange[1])] : [null,null]);
        setBudgetRange(data.budgetRange);

    },[])

    const onSubmitHandler = (e) => {

        e.preventDefault();

        //DOING MY OWN VALIDATION

        onFormUpdated({
            loc,
            moveDateRange,
            budgetRange
        });
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <Grid>
                <Grid.Col>

                    <LocationBar size='md' label="Where do you want to move?" onChange={ ( {value,loc} ) => setLoc({type:'Point', location:value, coordinates: [loc.lat,loc.lng]}) }/>

                </Grid.Col>

                <Grid.Col>

                    <SimpleGrid cols={2}>

                        <NumberInput size='md' 
                            max={budgetRange[1]} 
                            label="Rent From"
                            description="Minimum rent you are looking for"
                            value={budgetRange[0]} 
                            onChange={ ( val ) => setBudgetRange([ val, ( val >= budgetRange[1] ? val+20 : budgetRange[1] ) ]) } hideControls/>

                        <NumberInput 
                            size='md' 
                            min={budgetRange[0]} 
                            label='To'
                            description="Maximum rent you are looking for" 
                            value={budgetRange[1]} 
                            onChange={ ( val ) => setBudgetRange([budgetRange[0],val]) } hideControls/>

                    </SimpleGrid>

                </Grid.Col>

                <Grid.Col>
                    <SimpleGrid cols={2}>

                        <DatePicker 
                            size='md'
                            label="Moving from"
                            value={moveDateRange[0]}
                            // maxDate={dayjs(new Date(moveDateRange[1])).toDate()}
                            onChange={ ( val ) => setMoveDateRange([val,moveDateRange[1]]) }/>

                        <DatePicker 
                            size='md' 
                            label="To" 
                            value={moveDateRange[1]} 
                            // minDate={dayjs(new Date(moveDateRange[0])).add(5, 'days').toDate()}
                            onChange={ ( val ) => setMoveDateRange([moveDateRange[0],val]) }/>

                    </SimpleGrid>
                </Grid.Col>

                <Grid.Col>
                    <Button type="submit" size="md" fullWidth loading={isLoading}>Confirm</Button>
                </Grid.Col>
                
            </Grid>
        </form>
    )
}
