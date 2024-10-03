import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid2, IconButton, Typography } from '@mui/material';
type TitleSectionProps = {
  onClose: () => void;
  label: string;
};

const TitleSidebar = ({ label, onClose }: TitleSectionProps) => {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
      }}
    >
      <Grid2 container>
        <Grid2 size="grow">
          <Typography variant="h6"> {label}</Typography>
        </Grid2>
        <Grid2 size="auto">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default TitleSidebar;
