import moment from "moment";

export const ClassNames = (...classes) => classes.filter(Boolean).join(' ');

export const getAge = (birthDate) => {
    const today = moment();
    const birthDateMoment = moment(birthDate);
    const age = today.diff(birthDateMoment, 'years');
    return age;
}

export const toDate = (date) => moment(date).format('MMM DD');

export const timeAgo = ( time ) => {

    let secondsElapsed = moment().diff(time, 'seconds');
    let dayStart = moment("2018-01-01").startOf('day').seconds(secondsElapsed);

    if (secondsElapsed < 60) return dayStart.format('s') + 's ago';
    return moment(time).format('hh:mm');
        
} 