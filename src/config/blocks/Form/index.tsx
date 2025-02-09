import React from "react";
import FormGroup from "../../components/FromComponent";

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "url"
  | "search"
  | "date"
  | "radio"
  | "checkbox"
  | "select"
  | "multiselect"
  | "switch"
  | "button";

interface Option {
  label: string;
  value: FieldType;
}

interface FormProps {
  form?: {
    title?: string;
    fieldType?: FieldType;
    options?: Option[];
  };
}

interface RenderProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

interface FieldConfig {
  type: string;
  label?: string;
  options?: Option[];
  arrayFields?: Record<string, FieldConfig>;
  objectFields?: Record<string, FieldConfig>;
  render?: (props: RenderProps) => JSX.Element;
}

export interface FormConfigType {
  resolveFields: ({ props }: { props: FormProps }) => { form: FieldConfig };
  render: ({ form }: { form: FormProps["form"] }) => JSX.Element;
}
const FormConfig = {
  resolveFields: ({ props }: { props: FormProps }) => {
    const fields: { form: FieldConfig } = {
      form: {
        type: "object",
        objectFields: {
          title: { type: "text", label: "Field Label" },
          fieldType: {
            type: "select",
            label: "Field Type",
            options: [
              { label: "Text", value: "text" },
              { label: "Text Area", value: "textarea" },
              { label: "Email", value: "email" },
              { label: "Number", value: "number" },
              { label: "Url/Links", value: "url" },
              { label: "Search", value: "search" },
              { label: "Date", value: "date" },
              { label: "Radio", value: "radio" },
              { label: "Checkbox", value: "checkbox" },
              { label: "Dropdown / Select", value: "select" },
              { label: "Multi Select", value: "multiselect" },
              { label: "Switch", value: "switch" },
              { label: "Button", value: "button" },
            ],
          },
        },
      },
    };

    const fieldType = props?.form?.fieldType ||"";

    if (
      ["radio", "checkbox", "select", "multiselect"].includes(
        fieldType
      )
    ) {
      return {
        ...fields,
        form: {
          ...fields.form,
          objectFields: {
            ...fields.form.objectFields,
            options: {
              type: "array",
              label: "Options",
              arrayFields: {
                value: { type: "text", label: "Option Label" },
              },
            },
          }
        }
      };
    }

    if (["text", "email", "url", "number", "textarea", "button"].includes(fieldType)) {
      return {
        ...fields,
        form: {
          ...fields.form,
          objectFields: {
            ...fields.form.objectFields,
            description: {
              type: fieldType === "number"? "number" : fieldType === "textarea" ?"textarea":"text",
            },
          }
        }
      };
      
    }

    if (fieldType === "date") {
      return {
        ...fields,
        form: {
          ...fields.form,
          objectFields: {
            ...fields.form.objectFields,
            description: {
              type: "custom",
              render: ({ name, onChange, value }: RenderProps) => (
                <div>
                  <label htmlFor={name}>Select a date:</label>
                  <input
                    type="date"
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                </div>
              ),
            },
          }
        }
      };
    }
    return fields;
  },

  render: ({ form }: { form: FormProps["form"] } ) => {
    console.log("fields", form);
    return <form style={{ padding: "30px" }}>
      <FormGroup {...form} />
    </form>;
  },
};

export default FormConfig;
