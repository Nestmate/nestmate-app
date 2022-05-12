import { ActionIcon, Text, Title } from "@mantine/core"
import { getAge } from "../../helpers/helpers";
import { Filter } from "./Filter"

export const FilterHeader = ( { title, mates, filterMates } ) => {


  const setFilterMates = ({ query, ageRange, interests}) => {

    const filteredMates = mates.filter(mate => {

      const age = getAge(mate.birthday);

      let found = true;
      found = found && mate.firstName.toLowerCase().includes(query.toLowerCase());
      found = found && age >= ageRange.min && age <= ageRange.max;
      if(interests.length) found = found && mate.interests.filter(({_id}) => interests.indexOf(_id) !== -1 ).length !== 0;

      return found;

    });

    filterMates(filteredMates);
  }

  return (
    <header className="flex justify-between items-center pb-4 mb-4 border-b-2 border-slate-200">
        <div>
            <Title>{ title }</Title>
            <Text size="lg" color={'gray'}>{ mates.length } mates</Text>
        </div>

        <div>
            <Filter onFilterChange={(filters) => setFilterMates(filters)}/>
        </div>
        
    </header>
  )
}
