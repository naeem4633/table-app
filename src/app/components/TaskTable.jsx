"use client";
import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA from "../data";
import Filters from "./Filters";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
];

const TaskTable = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);

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

  return (
    <Box>
      <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
      <Box className="table" sx={{ width: '100%', overflowX: 'auto' }}>
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
        {table.getRowModel().rows.map((row) => (
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
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TaskTable;
