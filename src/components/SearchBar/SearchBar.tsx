import { Grow, IconButton, TextField, Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { memo, useCallback, useEffect, useState } from "react";
import _ from "lodash";

type SearchBarProps = {
  onSearch: (search: string) => void;
  value?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value }) => {
  const [localValue, setLocalValue] = useState(value ?? "");

  const handleClear = () => {
    setLocalValue("");
    onSearch("");
  };

  const debounceFn = useCallback(
    _.debounce((c) => {
      onSearch(c);
    }, 1000),
    []
  );

  return (
    <TextField
      size="small"
      label="Buscar"
      variant="outlined"
      value={localValue}
      onChange={(v) => {
        setLocalValue(v.target.value);
        debounceFn(v.target.value);
      }}
      fullWidth
      style={{ maxWidth: 400 }}
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
