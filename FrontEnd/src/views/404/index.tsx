import Link from "next/link";
import CustomButton from "@/components/button";

const NotFoundContent = () => {
    return (
        <div className='h-dvh w-dvw flex justify-center items-center text-center flex-col gap-2'>
            <h2 className='text-xl font-bold'>404 - Not Found</h2>
            <p className="pb-2">The requested resource could not be found!</p>
            <Link href="/orders">
                <CustomButton color="error">
                    Go Back
                </CustomButton>
            </Link>
        </div>
    );
}

export default NotFoundContent;