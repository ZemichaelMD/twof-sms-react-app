import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function GraphHeader() {
  return (
    <Box
      style={{
        backgroundColor: "#4485c4",
        color: "white",
        height: "80px",
        margin: "0px",
      }}
    >
      <div style={{
        display:"inline-block",
        float:"left", padding:"0px"
      }}>
        <h2>Title</h2>
        <p>Subtitle</p>
      </div>

      <FormControl style={{
        display:"inline-block",
        float:"right", padding:"0px", width:"100px"
      }}>
        <InputLabel id="demo-simple-select-helper-label">...</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value="value"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value='value'>Last Seven Days</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
