import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { ModalFooter } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addApiKey,
  getAllApiKeys,
  updateApiKey,
} from "../store/slices/apiSlice";

type Schema = z.infer<typeof schema>;

const apiType = [
  {
    label: "Bard",
    value: "Bard",
  },
  {
    label: "CHAT-gpt",
    value: "Chat-GPT",
  },
];

const schema = z
  .object({
    apiType: z.string(),
    apiName: z.string().min(3, "API Name must be at least 3 characters long"),
    apiKey: z.string().min(6, "API Key must be at least 6 characters long"),
    apiPurpose: z.string().optional(),
  })
  .required();

const ApiForm = ({
  onCancel,
  formData,
  isEdit,
}: {
  onCancel: () => void;
  formData: {
    id?: string;
    apiType: string;
    apiName: string;
    apiKey: string;
    apiPurpose?: string;
  };
  isEdit: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isEdit) {
      dispatch(updateApiKey({ ...data, id: formData._id }))
        .unwrap()
        .then(() => {
          onCancel(false);
          reset();
          dispatch(getAllApiKeys());
        });
    } else {
      dispatch(addApiKey(data))
        .unwrap()
        .then(() => {
          onCancel(false);
          reset();
          dispatch(getAllApiKeys());
        });
    }
  };

  useEffect(() => {
    setValue("apiType", "Bard");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Autocomplete
          defaultItems={apiType}
          label="Ai Model"
          placeholder="Search an ai model"
          className="max-w-md"
          {...register("apiType")}
          selectedKey={String(watch("apiType"))}
          onSelectionChange={(selectedModel) => {
            setValue("apiType", String(selectedModel));
          }}
          isInvalid={!!errors.apiType}
          errorMessage={errors?.apiType?.message}
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
        <Input
          label="ApiName"
          placeholder="Enter your Api Name"
          variant="bordered"
          {...register("apiName")}
          defaultValue={isEdit ? formData.apiName : ""}
          isInvalid={!!errors.apiName}
          errorMessage={errors?.apiName?.message}
        />
        <Input
          label="ApiKey"
          placeholder="Enter your Api Key"
          variant="bordered"
          {...register("apiKey")}
          defaultValue={isEdit ? formData.apiKey : ""}
          isInvalid={!!errors.apiKey}
          errorMessage={errors?.apiKey?.message}
        />
        <Input
          label="ApiPurpose"
          placeholder="Enter your Api Purpose"
          variant="bordered"
          defaultValue={isEdit ? formData.apiPurpose : ""}
          {...register("apiPurpose")}
        />
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={() => onCancel(false)}>
            Close
          </Button>
          <Button color="primary" type="submit">
            {isEdit ? "Edit Api" : "Add Api"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default ApiForm;
