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

const Ppc = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  const [stats, setStats] = useState({
    totalOrders: 0,
    ongoingOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    revenue: 0,
    ongoingRevenue: 0,
  });

  // Fetch Orders by Service
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/order/get/orderByService?service=ppc`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "success") {
          setOrders(data.data);
          calculateStats(data.data);
        }
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Calculate statistics dynamically
  const calculateStats = (ordersData) => {
    const totalOrders = ordersData.length;

    const ongoingOrders = ordersData.filter(
      (order) => order.status === "in progress"
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
      .filter((order) => order.status === "in progress")
      .reduce((sum, order) => sum + order.moneyDue, 0);

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
    data: orders,
    columns,
    pageCount: Math.ceil(orders.length / 5),
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
      <h1 className="text-2xl font-bold text-gray-800">PPC Dashboard</h1>

      {/* Statistics Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-blue-800">Total Orders</h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-green-800">Ongoing Orders</h2>
          <p className="text-3xl font-bold">{stats.ongoingOrders}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-red-800">Canceled Orders</h2>
          <p className="text-3xl font-bold">{stats.canceledOrders}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-yellow-800">Revenue</h2>
          <p className="text-3xl font-bold">${stats.revenue}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-purple-800">
            Ongoing Revenue
          </h2>
          <p className="text-3xl font-bold">${stats.ongoingRevenue}</p>
        </div>
      </div> */}

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

      {/* Orders Table */}
      {/* <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Order Details
        </h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Order ID</th>
              <th className="border border-gray-300 p-2 text-left">Client</th>
              <th className="border border-gray-300 p-2 text-left">Service</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{order._id}</td>
                <td className="border border-gray-300 p-2">{order.email}</td>
                <td className="border border-gray-300 p-2">{order.service}</td>
                <td
                  className={`border border-gray-300 p-2 ${
                    order.status === "in progress"
                      ? "text-yellow-600"
                      : order.status === "Completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="border border-gray-300 p-2">
                  ${order.moneyPaid || order.moneyDue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

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

export default Ppc;
