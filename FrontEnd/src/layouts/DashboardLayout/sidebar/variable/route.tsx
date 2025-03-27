import { FaFileInvoice, FaHistory } from "react-icons/fa";
import { useTranslations } from 'next-intl';

const useRoutes = () => {
  const t = useTranslations('Routes');

  return [
    {
      name: t("bills"),
      layout: "/dashboard",
      path: "bills",
      icon: <FaFileInvoice className="h-4 w-4" />,
    },
    {
      name: t("bills_history"),
      layout: "/dashboard",
      path: "bills_history",
      icon: <FaHistory className="h-4 w-4" />,
    },
    {
      name: t("pending_bills"),
      layout: "/dashboard",
      path: "pending_bills",
      icon: <FaFileInvoice className="h-4 w-4" />,
    },
  ];
};

export default useRoutes;