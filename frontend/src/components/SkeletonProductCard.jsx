import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function SkeletonProductCard() {

    return (
        <div className='border border-gray-300 p-4 flex flex-col justify-between'>
            <div className='mb-4'>
                <Stack spacing={1}>
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="rectangular" width={"100%"} height={"13rem"} className='object-contain'/>
                    <Skeleton variant="rectangular" className='text-lg font-semibold mt-2 hover:underline' />
                    <Skeleton variant="rounded" className='text-sm font-light mt-2' />
                    <Skeleton variant='rounded' className='w-full md:w-fit p-2 self-end'/>
                </Stack>
            </div>

        </div>

    );
}