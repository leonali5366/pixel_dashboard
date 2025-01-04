import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useOrders from "@/hooks/useOrders";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  CalendarClock,
  ChevronDown,
  CircleSlash2,
  DollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hosting = () => {
  const navigate = useNavigate();
  const { hostingOrders } = useOrders();
  const [stats, setStats] = useState({
    totalOrders: 0,
    ongoingOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    revenue: 0,
    ongoingRevenue: 0,
  });

  useEffect(() => {
    calculateStats(hostingOrders);
  }, [hostingOrders]);

  // Calculate statistics dynamically
  const calculateStats = (ordersData) => {
    const totalOrders = ordersData.length;
  
    // Define ongoing statuses
    const ongoingStatuses = ["assigned", "in progress", "delivered", "on review"];
  
    const ongoingOrders = ordersData.filter((order) =>
      ongoingStatuses.includes(order.status)
    ).length;
  
    const completedOrders = ordersData.filter(
      (order) => order.status === "Completed"
    ).length;
  
    const canceledOrders = ordersData.filter(
      (order) => order.status === "Canceled"
    ).length;
  
    const revenue = ordersData
      .filter((order) => order.status === "Completed")
      .reduce((sum, order) => sum + order.moneyPaid, 0);
  
    const ongoingRevenue = ordersData
      .filter((order) => ongoingStatuses.includes(order.status))
      .reduce((sum, order) => sum + order.budget, 0);
  
    setStats({
      totalOrders,
      ongoingOrders,
      completedOrders,
      canceledOrders,
      revenue,
      ongoingRevenue,
    });
  };

  const columns = [
    {
      accessorKey: "_id",
      header: "Order ID",
      cell: ({ row }) => row.getValue("_id"),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => row.getValue("service"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => row.getValue("status"),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const moneyPaid = row.original.moneyPaid;
        const moneyDue = row.original.moneyDue;

        return `${
          moneyPaid || moneyDue // If moneyPaid is truthy, use it; otherwise, use moneyDue
        }`;
      },
    },
  ];

  // React Table initialization
  const table = useReactTable({
    data: hostingOrders,
    columns,
    pageCount: Math.ceil(hostingOrders.length / 5),
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Hosting Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between mt-7">
              <span className="text-black opacity-95 font-medium text-sm">
                Total Orders
              </span>
              <ArrowDownNarrowWide />
            </div>
            <span className="text-2xl font-bold text-black">
              +{stats.totalOrders}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between mt-7">
              <span className="text-black text-sm opacity-90 font-medium">
                Ongoing Orders
              </span>
              <CalendarClock />
            </div>
            <span className="text-2xl font-bold text-black">
              +{stats.ongoingOrders}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between mt-7">
              <span className="text-black text-sm opacity-90 font-medium">
                Canceled Orders
              </span>
              <CircleSlash2 />
            </div>
            <span className="text-2xl font-bold text-black">
              {stats.canceledOrders}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between mt-7">
              <span className="text-black text-sm opacity-90 font-medium">
                Revenue
              </span>
              <DollarSign />
            </div>
            <span className="text-2xl font-bold text-black">
              ${stats.revenue}.00
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between mt-7">
              <span className="text-black text-sm opacity-90 font-medium">
                Ongoing Revenue
              </span>
              <DollarSign />
            </div>
            <span className="text-2xl font-bold text-black">
              ${stats.ongoingRevenue}.00
            </span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>All Order History</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter emails..."
              value={table.getColumn("email")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-left text-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate(`/order/single/${row.original._id}`);
                        window.scrollTo(0, 0);
                      }}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-left">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Hosting;
