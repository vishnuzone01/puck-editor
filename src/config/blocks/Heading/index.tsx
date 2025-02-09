export interface HeadingProps {
  title: string;
}

export interface HeadingConfigType {
  defaultProps: HeadingProps;
  fields: {
    title: {
      type: string;
    };
  };
  render: (props: HeadingProps) => JSX.Element;
}

const HeadingConfig = {
  defaultProps: {
    title: "Title",
  },
  fields: {
    title: {
      type: "text",
    },
  },
  render: ({ title }: HeadingProps) => {
    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  },
};

export default HeadingConfig;
