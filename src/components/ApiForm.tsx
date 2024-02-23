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

type Schema = z.infer<typeof schema>;

const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
];

const schema = z
  .object({
    animal: z.string(),
    apiName: z.string().min(3, "API Name must be at least 3 characters long"),
    apiKey: z.string().min(6, "API Key must be at least 6 characters long"),
    apiPurpose: z.string().optional(),
  })
  .required();

const ApiForm = ({ onCancel }: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  useEffect(() => {
    setValue("animal", "dog");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Autocomplete
          defaultItems={animals}
          label="Favorite Animal"
          placeholder="Search an animal"
          className="max-w-md"
          {...register("animal")}
          selectedKey={String(watch("animal"))}
          onSelectionChange={(selectedModel) => {
            setValue("animal", String(selectedModel));
          }}
          isInvalid={!!errors.animal}
          errorMessage={errors?.animal?.message}
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
          isInvalid={!!errors.apiName}
          errorMessage={errors?.apiName?.message}
        />
        <Input
          label="ApiKey"
          placeholder="Enter your Api Key"
          type="password"
          variant="bordered"
          {...register("apiKey")}
          isInvalid={!!errors.apiKey}
          errorMessage={errors?.apiKey?.message}
        />
        <Input
          label="ApiPurpose"
          placeholder="Enter your Api Purpose"
          variant="bordered"
          {...register("apiPurpose")}
        />
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={() => onCancel(false)}>
            Close
          </Button>
          <Button color="primary" type="submit">
            Sign in
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default ApiForm;
