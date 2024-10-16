import { Skeleton } from "@mui/material";


function SkeletonProduct() {
  return (
    <div style={{ display: 'flex', gap: '10rem', padding: '2rem 0', flexWrap: 'nowrap' }}>
      <div style={{ flex: '1' }}>
        <Skeleton variant="rectangular" width={350} height={200} style={{ borderRadius: '8px' }} />
      </div>
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
        <Skeleton variant="text" width={250} height={30} />
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="text" width={200} height={30} />
      </div>
    </div>
  );
}

export default SkeletonProduct;
