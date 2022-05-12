import { AdjustmentsIcon, SearchIcon } from '@heroicons/react/outline';
import { Button, Stack, Popover, Text, TextInput, SimpleGrid, NumberInput, MultiSelect, Divider, ActionIcon } from '@mantine/core'
import { useEffect, useState } from 'react';
import { getInterests } from '../../../api/NestmateApi';

export const Filter = ({ onFilterChange }) => {

    const [opened, setOpened] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [query, setQuery] = useState('');
    const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });
    const [interests, setInterests] = useState([]);

    useEffect(() => {

        (async () => {

            if(interests.length === 0) {
                const { data } = await getInterests();
                const interests = data.map(interest => ({
                    label: interest.name,
                    value: interest._id
                }));
                setInterests(interests);
            }

            onFilterChange({
                query,
                ageRange,
                interests: selectedInterests
            });

        })();

    },[ selectedInterests, query, ageRange ]);

    


    return (
        <div className='flex flex-cols gap-3 items-center'>
            <TextInput 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search By Name"
                width={'100%'}
                size={'md'}
                icon={<SearchIcon className="text-slate-400 w-5 h-5" />}
                className="grow hidden md:block"
            />
            <Popover
                opened={opened}
                onClose={() => setOpened(false)}
                target={<ActionIcon size={'lg'} variant="gray" onClick={() => setOpened((o) => !o)}><AdjustmentsIcon className='icon'/></ActionIcon>}
                width={260}
                position="bottom"
                withArrow
                >
                <div className='flex flex-col'>

                    <div className='grow block md:hidden'>
                        <TextInput 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search By Name"
                                width={'100%'}
                                className="grow "
                            />
                        <Divider my="sm" />
                    </div>
                    
                    <Stack className="grow" spacing={'sm'}>
                        <Text>Age Range</Text>
                        <SimpleGrid cols={2}>
                            <NumberInput 
                                value={ageRange.min}
                                onChange={(val) => setAgeRange({min:val >= 0 ? val : 0, max:ageRange.max})}
                                placeholder="Min"
                                width={'100%'}
                                min={0}
                                className="grow"
                                hideControls
                            />
                                <NumberInput 
                                value={ageRange.max}
                                onChange={(val) => setAgeRange({min:ageRange.min , max:val >= 0 ? val : 0})}
                                placeholder="Max"
                                width={'100%'}
                                max={100}
                                className="grow"
                                hideControls
                            />
                        </SimpleGrid>
                    </Stack>
                    <Divider my="sm" />
                    <Stack className="grow" spacing={'sm'}>
                        <Text>Interests</Text>
                        <MultiSelect
                            value={selectedInterests}
                            onChange={ (values) => setSelectedInterests(values) }
                            data={interests}
                            placeholder="Pick all your interests"
                            searchable
                            nothingFound="Nothing found"
                        />
                    </Stack>
                </div>
            </Popover>
        </div>
    )
}
