import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

interface ActivityItem {
  id: number | string;
  title: string;
  description?: string;
  created_at?: string;
}

interface TaskActivityProps {
  items?: ActivityItem[];
}

const TaskActivity = ({
  items = [],
}: TaskActivityProps) => {
  if (items.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 3,
        }}
      >
        <Typography color="text.secondary">
          No activity available.
        </Typography>
      </Paper>
    );
  }

  return (
    <List disablePadding>
      {items.map((item) => (
        <ListItem
          key={item.id}
          divider
          disableGutters
          sx={{ py: 1.5 }}
        >
          <ListItemText
            primary={item.title}
            secondary={
              item.description ??
              item.created_at ??
              ""
            }
            slotProps={{
              primary: {
                sx: {
                  fontWeight: 600,
                },
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskActivity;