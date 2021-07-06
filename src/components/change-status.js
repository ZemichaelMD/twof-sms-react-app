import {
    Box,
    Card,
    Typography,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({

    rooot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        "& > *": {
            marginBottom: '20px'
        },
    },
    buttons: {
        display: 'flex',
    },
    button: {
        margin: '10px',
    },
     divder: {
        width: '80%'
    },
    formControl:{
        width: '50%',
        marginBottom:'50px'
    }

})

export default function ChangeStatus() {

    const classes = useStyles()

    return (
        <Card className={classes.rooot}>
            <Typography variant="h5" gutterBottom>
                Change status
            </Typography>
            <Divider className={classes.divder} />
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                //value={age}
                //onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Divider className={classes.divder}/>
            <Box className={classes.buttons}>
                <Button className={classes.button} variant="contained" color="primary">
                    Update
                </Button>
                <Button className={classes.button} variant="contained" color="default">
                    Cancle
                </Button>
            </Box>
        </Card>
    )
}
