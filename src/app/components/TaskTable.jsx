import React, { useState } from "react";
import { Box, Button, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useReactTable, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";
import Filters from "./Filters";
import DATA from "../data";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { format } from 'date-fns';

const columns = [
  {
    accessorKey: "task",
    header: "Task",
    size: 225,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "due",
    header: "Due",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 225,
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "completed",
    header: "Completed",
    cell: ({ getValue }) => getValue() ? "Yes" : "No"
  },
];

const TaskTable = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    task: "",
    due: null,
    notes: "",
    priority: "",
    completed: false
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });

  const handleEdit = (rowIndex) => {
    setEditingRowIndex(rowIndex);
    setNewTask(data[rowIndex]);
    setOpen(true);
  };

  const handleDelete = (rowIndex) => {
    setData((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  const handleSave = () => {
    setData((prev) => {
      const formattedTask = {
        ...newTask,
        due: newTask.due ? format(newTask.due, 'yyyy/MM/dd') : null,
      };

      if (editingRowIndex !== null) {
        return prev.map((row, index) =>
          index === editingRowIndex ? formattedTask : row
        );
      } else {
        return [...prev, formattedTask];
      }
    });
    setOpen(false);
    setEditingRowIndex(null);
    setNewTask({
      task: "",
      due: null,
      notes: "",
      priority: "",
      completed: false
    });
  };

  return (
    <Box>
      <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpen(true)}
          sx={{ backgroundColor: '#333', '&:hover': { backgroundColor: '#555' } }}
        >
          Add Task
        </Button>
      </Box>
      <Box className="table" sx={{ width: '100%', overflowX: 'auto', mt: 2 }}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" sx={{ display: 'flex', width: '100%' }} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box
                className="th"
                sx={{
                  flex: '1 1 0', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  p: 1,
                  borderBottom: '1px solid #ddd',
                }}
                key={header.id}
              >
                <Typography variant="body2" noWrap>
                  {header.column.columnDef.header}
                </Typography>
                {header.column.getCanSort() && (
                  <IconButton
                    size="small"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <SwapVertIcon fontSize="inherit" />
                  </IconButton>
                )}
                <Typography variant="body2" noWrap>
                  {
                    {
                      asc: <ArrowUpwardIcon fontSize="inherit" />,
                      desc: <ArrowDownwardIcon fontSize="inherit" />,
                    }[header.column.getIsSorted()] || null
                  }
                </Typography>
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                  sx={{ position: 'absolute', right: 0, width: '5px', cursor: 'col-resize' }}
                />
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row, rowIndex) => (
          <Box className="tr" sx={{ display: 'flex', width: '100%' }} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box
                className="td"
                sx={{
                  flex: '1 1 0', 
                  border: '1px solid #bdbdbd',
                  padding: '5px',
                }}
                key={cell.id}
                onDoubleClick={() => handleEdit(rowIndex)}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
            <IconButton onClick={() => handleDelete(rowIndex)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingRowIndex !== null ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Task"
            type="text"
            fullWidth
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
          />
          <DatePicker
            label="Due Date"
            value={newTask.due ? new Date(newTask.due) : null}
            onChange={(newValue) => setNewTask({ ...newTask, due: newValue })}
            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            inputFormat="yyyy/MM/dd"
          />
          <TextField
            margin="dense"
            label="Notes"
            type="text"
            fullWidth
            value={newTask.notes}
            onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={newTask.completed}
                onChange={(e) => setNewTask({ ...newTask, completed: e.target.checked })}
              />
            }
            label="Completed"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>{editingRowIndex !== null ? "Save" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskTable;
