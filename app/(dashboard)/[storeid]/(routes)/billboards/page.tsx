import React from "react";
import { format } from "date-fns";
import { BillboardClient } from "./components/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async ({ params }: { params: { storeid: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillbaords: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="fkex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillbaords} />
      </div>
    </div>
  );
};

export default BillboardsPage;
