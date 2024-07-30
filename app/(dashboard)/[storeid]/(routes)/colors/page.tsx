import React from "react";
import { format } from "date-fns";
import { ColorsClient } from "./components/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./components/columns";

const ColorsPage = async ({ params }: { params: { storeid: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="fkex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
