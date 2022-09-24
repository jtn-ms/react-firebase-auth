import { Box } from "@mui/material";
// import {styled} from '@mui/material';

// const StyledBox = styled(Box)({
//   maxWidth: 400,
//   margin: "30px auto", // top & bottom, left & right
//   padding: "10px 15px", // top & bottom, left & right
//   display: 'flex',
//   flexDirection: 'column',
//   gap: "10px",
//   borderRadius: 'sm',
//   boxShadow: 'md',
// });

export const StyledBox = ({children}) => {
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto', // margin left & right
        my: 4, // margin top & botom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
  >
    {children}
  </Box>
  );
}