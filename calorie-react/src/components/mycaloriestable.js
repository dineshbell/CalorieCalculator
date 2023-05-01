import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect,useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const columns = [
  { id: 'S', label: 'S.no' } ,
  { id: '1', label: 'Date' },
  { id: '2', label: 'Username' },
  { id: '3', label: 'Calories-Intake' },
  { id: '4', label: 'Target-Intake-Achived' },
  { id: '5', label: 'Calories-Burnt' },
  { id: '6', label: 'Target-Burnt-Achived' },
  { id: '7', label: "Actions"}
];


export default function MyCaloriesTable() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [mycalories,setMycalories] = useState([])
  const [sortType,setSortType] = useState("asc");

const getCalTable= () =>{
  axios.get('http://localhost:3004/calorie-cal').then(res => {
  sortData(res.data);  
    })
}

const  onDelete=(id)=>{
    axios.delete('http://localhost:3004/calorie-cal/'+ id)
    .then(()=>{getCalTable()})
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    getCalTable()
  },[]);
   
  const sortData = (data) =>{
    const updatedCal = data.sort((a,b)=>{
      const order = sortType === "asc" ? 1 :-1
        return a.date>b.date ? order:-order   
       })
      setMycalories(updatedCal)
  }
   

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  onClick={()=>{
                    if(column.label==="Date"){
                      setSortType((prev)=>{
                       if(prev === "asc"){
                        return "dsc"
                       }else{
                        return "asc"
                       }
                      })
                      sortData(mycalories); 
                    }
                  }}
                    >
                  {column.label}{column.label === "Date" && ( sortType === "asc" ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>)}

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mycalories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i} >
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{moment(row.date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{row.userName}</TableCell>
                    <TableCell>{row.totalCaloriesIntake + "/" + row.targetCaloriesIntake + " cal"}</TableCell>
                    <TableCell>{(row.totalCaloriesIntake < row.targetCaloriesIntake) ? "Not Achieved":"Achieved"} </TableCell>
                    <TableCell>{row.totalCaloriesBurned + "/" + row.targetCaloriesBurned + " cal"}</TableCell>
                    <TableCell>{(row.totalCaloriesBurned < row.targetCaloriesBurned) ? "Not Achieved":"Achieved"}</TableCell>
                    <TableCell  >
                      <IconButton onClick={()=>navigate('/calorie-management/' + row._id)}><CreateIcon/></IconButton>
                      <IconButton onClick={()=>{
                        onDelete(row._id)
                      }}><DeleteIcon/></IconButton>
                      </TableCell>
                  </TableRow>
          
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={mycalories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}