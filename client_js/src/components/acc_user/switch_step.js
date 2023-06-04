import React, { useState } from "react";
import { Button, message, Steps } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

const Switch_step = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    marginTop: 16,
  };

  return (
    <div className="flex flex-col">
      <Steps current={current} items={items} />
      <div className="flex flex-col">
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next} className=" bg-slate-500">
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              className=" bg-slate-500"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={prev}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Switch_step;
