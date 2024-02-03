import * as R from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import {Container} from 'reactstrap';

function Comment_component(props){
    const { name, body, star, time } = props;
    return <Box sx={{ position:'relative' ,padding:1}}>
        <Card variant="outlined">
            <R.Fragment>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {name}
                    </Typography>
                    <Typography variant="h5" component="div">
                        <Rating name="read-only" value={star.toString()} readOnly />
                    </Typography>

                    <Typography variant="h5">
                        {body}
                        <br/>
                        <br/>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {time}
                    </Typography>
                </CardContent>
            </R.Fragment>
        </Card>
    </Box>

}

export default Comment_component;