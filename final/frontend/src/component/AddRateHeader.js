import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate, useParams } from 'react-router-dom';

function AddRateHeader() {
  const navigate = useNavigate();
  const { id, name, userid } = useParams();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small" onClick={ () => navigate(`/search/${name}/${userid}/cafe/${id}/review`) }>Back to review</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          RATE IT !
        </Typography>
        <Button variant="outlined" size="small" onClick={ () => navigate('/') }>
          Log Out
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}


export default AddRateHeader;