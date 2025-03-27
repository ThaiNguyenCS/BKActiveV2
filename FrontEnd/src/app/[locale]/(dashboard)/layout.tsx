import { Suspense } from "react";
import DashboardLoading from "./loading";
import DashboardLayout from "@/layouts/DashboardLayout";

const Dashboard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <section className="h-dvh w-dvw bg-lightPrimary dark:bg-darkContainerPrimary relatived">
            <DashboardLayout>
                <Suspense fallback={<DashboardLoading />}>
                    {children}
                </Suspense>
            </DashboardLayout>
        </section>
    );
}

export default Dashboard;