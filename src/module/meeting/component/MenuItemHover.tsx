import { MenuItem, useTheme } from '@mui/material';
import { ReactElement } from 'react';

type MenuItemHoverProps = {
  icon: ReactElement;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  direction?: 'row' | 'column';
};
const MenuItemHover = ({
  icon,
  label,
  isActive = false,
  onClick,
}: MenuItemHoverProps) => {
  const theme = useTheme();
  return (
    <MenuItem
      onClick={onClick}
      sx={{
        backgroundColor: isActive
          ? theme.palette.secondary.main
          : 'transparent',
        color: isActive ? theme.palette.secondary.contrastText : 'inherit',
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        },
      }}
    >
      {icon} {label}
    </MenuItem>
  );
};

export default MenuItemHover;
