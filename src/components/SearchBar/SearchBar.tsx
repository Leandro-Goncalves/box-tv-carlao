import { Grow, IconButton, TextField, Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { memo, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type SearchBarProps = {
  onSearch: (search: string) => void;
  value?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value }) => {
  const [localValue, setLocalValue] = useState(value ?? "");
  const [valueToExport] = useDebounce(localValue, 500);

  const handleClear = () => {
    setLocalValue("");
    onSearch("");
  };

  useEffect(() => {
    onSearch(valueToExport);
  }, [valueToExport, onSearch]);

  return (
    <TextField
      size="small"
      label="Buscar"
      variant="outlined"
      value={localValue}
      onChange={(v) => setLocalValue(v.target.value)}
      fullWidth
      style={{ maxWidth: 400, marginLeft: 24 }}
      InputProps={{
        endAdornment: (
          <Grow in={!!value}>
            <Tooltip title="Limpar">
              <IconButton onClick={handleClear}>
                <Close />
              </IconButton>
            </Tooltip>
          </Grow>
        ),
      }}
    />
  );
};

export default memo(SearchBar);
