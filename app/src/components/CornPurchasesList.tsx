import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Card, CardContent } from "@/components/ui/card";
import type { CornPurchase } from "@/services/bobsCornApi";

type Props = {
  className?: string;
  items: CornPurchase[];
};

const CornPurchasesList = ({ className, items }: Props) => {
  return (
    <Card className={className}>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent purchases</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Purchase ID</TableHead>
              <TableHead className="w-[10px] text-center">Item</TableHead>
              <TableHead className="text-right">Purchased At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="font-medium">{purchase.id}</TableCell>
                <TableCell className="w-[10px] text-center">🌽</TableCell>
                <TableCell className="text-right">
                  {dayjs(purchase.createdAt).format("DD/MMM/YYYY HH:mm:ss")} 🕒
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CornPurchasesList;
