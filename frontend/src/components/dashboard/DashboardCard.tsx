import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
}

const DashboardCard = ({
  title,
  value,
  icon,
  description,
}: DashboardCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx = {{ fontWeight : 600 }}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx = {{ fontWeight : 800 }}
            >
              {value}
            </Typography>

            {description && (
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {description}
              </Typography>
            )}
          </Stack>

          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: "action.selected",
              color: "primary.main",
            }}
          >
            {icon}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;