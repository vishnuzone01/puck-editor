import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import FormConfig from "./config/blocks/Form";
import HeadingConfig from "./config/blocks/Heading";

// The Puck configuration object
const config = {
  components: {
    Heading: HeadingConfig,
    Form: FormConfig,
  },
  root: {
    render: ({ children }) => {
      return (
        <main
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            padding: 32,
          }}
        >
          {children}
        </main>
      );
    },
  },
};

// The function that gets executed when you push the "Publish" button
const onPublish = (data) => {
  console.log("Published data:", data);
};

// Your editor component
const App = () => {
  return <Puck config={config} data={{}} onPublish={onPublish} />;
};

export default App;
