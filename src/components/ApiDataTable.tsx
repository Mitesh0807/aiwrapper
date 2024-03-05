import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { PlusIcon } from "./icons/PlusIcon";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { SearchIcon } from "./icons/searchicon";
import { columns, statusOptions } from "./data";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import DeleteModal from "./DeleteModal";
import ApiModal from "./ApiModal";
import {
  deleteApiKey,
  deleteSelectedApiKey,
  getAllApiKeys,
} from "../store/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "apiName",
  "apiKey",
  "apiPurpose",
  "apiType",
  "actions",
];

type User = (typeof User)[0];

interface RootState {
  api: {
    allApiData: {
      _id: string;
      apiType: string;
      apiName: string;
      apiKey: string;
      apiPurpose?: string;
    }[];
  };
}

export default function ApiDataTable() {
  const dispatch: AppDispatch = useDispatch();

  const users = useSelector((state: RootState) => state?.api?.allApiData);

  useEffect(() => {
    dispatch(getAllApiKeys());
  }, [dispatch]);

  const pagesLimit = [
    {
      label: "5",
      value: "5",
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "15",
      value: "15",
    },
  ];

  const [filterValue, setFilterValue] = React.useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  let idsForDeleteApi: string[];

  if (selectedKeys !== "all") {
    idsForDeleteApi = Array.from(selectedKeys).map(String);
  } else {
    idsForDeleteApi = users.map((api) => api._id);
  }

  console.log(idsForDeleteApi);

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const [value, setValue] = React.useState<string>("5");
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [apiFormData, setApiFormData] = React.useState<string>("");
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  const handleEdit = (apiData: string) => {
    setOpen(true);
    setIsEdit(true);
    setApiFormData(apiData);
  };

  const handleDelete = (id: string) => {
    console.log(id);
    setDeleteId(id);
    setOpenModal(true);
  };

  const onDeleteConfirm = (id: string) => {
    console.log(id);
    dispatch(deleteApiKey(id))
      .unwrap()
      .then(() => {
        console.log("run");
        dispatch(getAllApiKeys());
        setOpenModal(false);
      })
      .catch((err) => console.log("err", err));
  };

  const handleDeleteSelectedApi = () => {
    dispatch(deleteSelectedApiKey(idsForDeleteApi))
      .unwrap()
      .then(() => {
        dispatch(getAllApiKeys());
      });
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.apiName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.apiType)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "apiType":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.apiType}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-1">
            <Tooltip color="primary" content="Edit Api">
              <Button
                variant="light"
                isIconOnly
                onClick={() => handleEdit(user)}
                className="text-lg text-primary cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete Api">
              <Button
                variant="light"
                isIconOnly
                onClick={() => handleDelete(user._id)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const showForm = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by api name...."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              onClick={showForm}
              color="primary"
              endContent={<PlusIcon />}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-500 text-small">
            Total {users.length} users
          </span>

          <Select
            label="Limit Per Page"
            variant="bordered"
            selectedKeys={[value]}
            className="max-w-[150px]"
            onChange={(e) => {
              e.target.value !== "" && setValue(e.target.value);
              setRowsPerPage(+e.target.value);
            }}
          >
            {pagesLimit.map((page) => (
              <SelectItem key={page.value} value={page.value}>
                {page.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
    value,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="flex items-center gap-1 w-[30%] text-medium text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
          <Tooltip color="danger" content="Delete Selected Api">
            <Button
              // isDisabled={selectedKeys?.size > 1}
              isDisabled={true}
              variant="light"
              isIconOnly
              onClick={() => {
                (selectedKeys?.size > 1 || selectedKeys === "all") &&
                  handleDeleteSelectedApi();
              }}
              className=" text-lg text-danger cursor-pointer active:opacity-50"
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        color="danger"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Api keys found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ApiModal
        open={isOpen}
        setOpen={setOpen}
        formData={apiFormData}
        isEdit={isEdit}
      />
      <DeleteModal
        render={openModal}
        func={setOpenModal}
        onConfirm={() => onDeleteConfirm(deleteId)}
      />
    </>
  );
}
