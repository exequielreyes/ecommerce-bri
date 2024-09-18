import { Skeleton } from "@mui/material";
import { Box, Grid } from "@mui/material";

function SkeletonProduct() {
  return (
    <Grid container spacing={4} sx={{ py: 4, px: { sm: 10 } }}>
      <Grid item xs={12} sm={6}>
        <Skeleton variant="rectangular" width={350} height={200} sx={{ borderRadius: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="text" width={250} height={30} />
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={200} height={30} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default SkeletonProduct;
