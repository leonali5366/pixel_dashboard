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
import { useNavigate } from "react-router-dom";

const Development = () => {
  const { developmentOrders } = useOrders();
  const navigate = useNavigate();

  const stats = {
    totalOrders: developmentOrders.length,
    ongoingOrders: developmentOrders.filter(
      (order) => order.status === "in progress"
    ).length,
    completedOrders: developmentOrders.filter(
      (order) => order.status === "finished"
    ).length,
    canceledOrders: developmentOrders.filter(
      (order) => order.status === "cancelled"
    ).length,
    revenue: developmentOrders
      .filter((order) => order.status === "finished")
      .reduce((sum, order) => sum + order.moneyPaid, 0),
    ongoingRevenue: developmentOrders
      .filter((order) => order.status === "in progress")
      .reduce((sum, order) => sum + order.moneyDue, 0),
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
      accessorKey: "budget",
      header: "Budget ($)",
      cell: ({ row }) => row.getValue("budget"),
    },
  ];

  // React Table initialization
  const table = useReactTable({
    data: developmentOrders,
    columns,
    pageCount: Math.ceil(developmentOrders.length / 5),
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
      <h1 className="text-2xl font-bold text-gray-800">
        Development Dashboard
      </h1>

      {/* Statistics Section */}

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
                      data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate(`/order/single/${row.original._id}`);
                        window.scrollTo(0, 0);
                      }}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Development;
