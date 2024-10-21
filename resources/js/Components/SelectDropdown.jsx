import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectDropdown = ({ label, labelId, value, onChange, options = [], disabled = false, required = true, sx }) => {
    return (
        <FormControl fullWidth required={required} disabled={disabled} sx={sx}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                label={label}
                labelId={labelId} // Attach the labelId correctly here
            >
                {options.length > 0 ? (
                    options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name} {option.course_level && `(${option.course_level})` || option.batch_identifier}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No Options Available</MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

export default SelectDropdown;
