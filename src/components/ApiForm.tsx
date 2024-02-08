import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { addApiKey } from "@/store/slices/apiSlice";

enum ApiType {
  BARD = "Bard",
  CHAT_GPT = "Chat-GPT",
}

const apiTypeValues = Object.values(ApiType);
const apiTypeObject: Record<string, string> = {};
apiTypeValues.forEach((value) => {
  apiTypeObject[value] = value;
});

const formSchema = z.object({
  apiType: z.nativeEnum(apiTypeObject),
  apiName: z.string().min(3, "API Name must be at least 3 characters long"),
  apiKey: z.string().min(6, "API Key must be at least 6 characters long"),
  apiPurpose: z.string().optional(),
});

export function ApiForm({ formData }) {
  const dispatch = useDispatch();
  console.log(formData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    if (formData) {
      //Edit case
    } else {
      //add case
      dispatch(addApiKey(data));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="apiType"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right col-span-1">
                  Api Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={ApiType.BARD}
                >
                  <FormControl className="col-span-3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Api Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ApiType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiName"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="apiName" className="text-right col-span-1">
                  Api Name
                </FormLabel>
                <FormControl className="col-span-3">
                  <Input id="apiName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="apiKey" className="text-right col-span-1">
                  Api Key
                </FormLabel>
                <FormControl className="col-span-3">
                  <Input id="apiKey" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiPurpose"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel
                  htmlFor="apiPurpose"
                  className="text-right col-span-1"
                >
                  Api Purpose
                </FormLabel>
                <FormControl className="col-span-3">
                  <Textarea id="apiPurpose" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{formData ? "Edit" : "Add"}</Button>
        </div>
      </form>
    </Form>
  );
}
