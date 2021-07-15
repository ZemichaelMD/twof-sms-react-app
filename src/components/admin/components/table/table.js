import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@material-ui/data-grid';

import {demodata} from './demo.json';

const useStyles = makeStyles((theme) => ({
  table:{
    height: 400, width: '100%'
  }
}))


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}



export default function ColumnSelectorGrid() {

  const classes = useStyles();


  return (
    <div className={classes.table}>
      <DataGrid
        {...demodata}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}