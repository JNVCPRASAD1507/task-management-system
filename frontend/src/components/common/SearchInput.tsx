
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  TextField,
} from "@mui/material";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
}: SearchInputProps) => {
  return (
    <TextField
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      size="small"
      sx={{
        width: {
          xs: "100%",
          sm: 280,
          md: 320,
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchInput;

