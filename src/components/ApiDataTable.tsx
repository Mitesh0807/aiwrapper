import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { ApiModal } from "./ApiModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteApiKey, getAllApiKeys } from "@/store/slices/apiSlice";

export function ApiDataTable() {
  const [isOpen, SetOpen] = useState(false);
  const [formData, SetFormData] = useState(null);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.api.allApiData);
  console.log(data);

  const handleDelete = (id: string) => {
    console.log(id);
    dispatch(deleteApiKey(id))
      .unwrap()
      .then(() => {
        console.log("run");
        dispatch(getAllApiKeys());
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    dispatch(getAllApiKeys());
  }, [dispatch]);

  const handleAdd = () => {
    SetFormData(null);
    SetOpen(true);
  };

  const handleEdit = (index) => {
    console.log(index);
    SetFormData(index);
    SetOpen(true);
  };

  return (
    <>
      <Button className="text-white" onClick={handleAdd}>
        Add Api
      </Button>
      <ApiModal handleOpen={isOpen} manageOpen={SetOpen} data={formData} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Api Name</TableHead>
            <TableHead>Api Key</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((data, index) => (
            <TableRow key={data._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{data?.apiName}</TableCell>
              <TableCell>{data?.apiKey}</TableCell>
              <TableCell className="text-right">{data?.apiType}</TableCell>
              <TableCell className="text-right">
                <Button variant={"secondary"} onClick={() => handleEdit(index)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(data._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
