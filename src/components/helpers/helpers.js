import moment from "moment";

export const ClassNames = (...classes) => classes.filter(Boolean).join(' ');

export const getAge = (birthDate) => {
    const today = moment();
    const birthDateMoment = moment(birthDate);
    const age = today.diff(birthDateMoment, 'years');
    return age;
}