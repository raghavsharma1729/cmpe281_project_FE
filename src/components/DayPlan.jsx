import * as React from 'react';
import { TextareaAutosize, Typography } from '@mui/material';



const DayPlan = ({ noOfDays, handlePlans, tripDetails }) => {

    const [days, setDays] = React.useState([0]);
    React.useEffect(() => {
        const array = new Array(noOfDays).fill(0)
        setDays(array);
        const values = array.reduce((a, v, i) => ({ ...a, [i]: '' }), {})
        handlePlans(values);
    }, [noOfDays]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        handlePlans({ ...tripDetails, [name]: value })
    }
    return (<>{
        days.map((val, index) =>
            <>
                <Typography>
                    Day: {index + 1}
                </Typography>
                <TextareaAutosize name={index} value={tripDetails[`${index}`]} onChange={handleChange} />
            </>
        )}</>)
}

export default DayPlan;