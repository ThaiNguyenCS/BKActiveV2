import AuthMain from "./components/main";
import Container from "@/components/container";

const AuthPage = () => {

    return (
        <div className="relative float-right h-full min-h-dvh w-full bg-white lg:!bg-lightSecondary dark:!bg-darkContainerSecondary">
            <main className="relative flex h-dvh p-2 lg:p-8 xl:p-16">
                <Container className="mx-auto min-h-full max-h-full h-full w-full relative !rounded-xl overflow-y-auto no-scrollbar">
                    <AuthMain />
                </Container>
            </main>
        </div>
    );
}

export default AuthPage;