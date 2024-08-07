"use client"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from "@mui/material";
import TaskTable from "./components/TaskTable";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            border: "1px solid #000",
            padding: 2,
            width: '100%',
            maxWidth: {
              xs: '100%',
              sm: 600, 
              md: 800, 
              lg: 1000,
            },
            marginX: 'auto',
          }}
        >
          <TaskTable />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}