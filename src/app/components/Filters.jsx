import React from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Filters = ({ columnFilters, setColumnFilters }) => {
  const taskName = columnFilters.find((f) => f.id === "task")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (  
    <Box display="flex" alignItems="center" mb={6} spacing={3}>
      <Box display="flex" alignItems="center" sx={{ maxWidth: '12rem' }}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <InputBase
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => onFilterChange("task", e.target.value)}
          sx={{ 
            flex: 1,
            borderRadius: 1,
            bgcolor: 'background.paper',
            paddingLeft: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default Filters;