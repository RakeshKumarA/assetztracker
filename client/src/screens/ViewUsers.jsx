import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import DeleteIcon from '@material-ui/icons/Delete';
import {
 IconButton,
} from '@material-ui/core';
import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { Grid,  TableHead, Typography } from '@material-ui/core';
import { viewUsers  } from '../reducers/viewUserSlice';





const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
container: {
    minHeight: "100vh",
  },
  cardContainer: {
    height: "80%",
    width: "60%",
    
  },
  paperStyle: {
    width: "100%",
  },
  title:{
      paddingBottom:"1.5rem"
  },
  
 formcontainer:{
     padding:'2rem',
 }
});

 const ViewUsers = () => {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  dispatch(viewUsers());
const { view } = useSelector((state) => state.viewusers);
 const handleDelete = (id) => {
   axios.post("/api/users/remove",{
     userid:id
   })
  }

return (
   <Grid
     container
     className={classes.container}
     justify="center"
     alignItems="center"
   >
     <Grid item container className={classes.cardContainer} spacing={2}>
     <Paper className={classes.paperStyle}>
       <Grid item container sm={10} style={{margin:"1rem 4rem"}} justify ="center" >
          
           <Typography  variant="h4"
               color="initial"
               textAlign="center"
                className={classes.title}>View Users
                 </Typography> 
                 
         <Paper className={classes.paperStyle}>
           <Grid
             item
             container
             direction="column"
             justify="center"
             alignItems="center"
             
           >
              <TableContainer >
           <Table className={classes.table} aria-label="simple table">
             <TableHead>
               <TableRow>
                 <TableCell align='center' >Name</TableCell>
                 <TableCell  align='center' >Email</TableCell>
                 <TableCell  align='center' >Role</TableCell>
                 <TableCell></TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {view.map((row) => (
                 <TableRow key={row.userid}>
                   <TableCell component="th" scope="row" align='center'>
                     {row.name}
                   </TableCell>
                   <TableCell  align='center' >{row.email}</TableCell>
                   <TableCell  align='center' >
                     {/* {format(row.expDate, "yyyy-mm-dd")} */}
                     {row.role}
                   </TableCell>
                    <TableCell align="center" padding="none"> 
                    {(row.role !=="admin")&&<IconButton
                       size="small"
                        onClick={() => handleDelete(row.userid)}
                        disabled={(row.role==="view")}
                     >
                       <DeleteIcon fontSize="small" />
                     </IconButton>
 }
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
           </Grid>
         </Paper>
       </Grid>
       </Paper>
     </Grid>
   </Grid>
 );
           }

   


export default ViewUsers;











