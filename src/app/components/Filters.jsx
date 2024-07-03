import React from 'react';
import { Box, InputBase, IconButton, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Filters = ({ columnFilters, setColumnFilters }) => {
  const taskName = columnFilters.find((f) => f.id === "task")?.value || "";
  const priority = columnFilters.find((f) => f.id === "priority")?.value || "";
  const completed = columnFilters.find((f) => f.id === "completed")?.value || false;

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
    <Box display="flex" alignItems="center" mb={6} gap={2}>
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
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="priority-filter-label">Priority</InputLabel>
        <Select
          labelId="priority-filter-label"
          value={priority}
          onChange={(e) => onFilterChange("priority", e.target.value)}
          label="Priority"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={completed}
            onChange={(e) => onFilterChange("completed", e.target.checked)}
          />
        }
        label="Completed"
        sx={{ marginLeft: 2 }}
      />
    </Box>
  );
};

export default Filters;
