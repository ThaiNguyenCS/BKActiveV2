import LoadingUI from "../loading";

const RenderCase = ({ children, condition, suspense }: RenderCaseProps) => {
    return condition ? children : (
        suspense ?
            <div className="h-full w-full flex justify-center place-items-center">
                <LoadingUI />
            </div>
            :
            <></>
    );
};

export default RenderCase;