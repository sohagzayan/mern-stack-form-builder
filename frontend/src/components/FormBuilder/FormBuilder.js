import React, { createRef, useEffect, useState } from "react";
import "react-form-builder2/dist/app.css";
import "../styles/styles.css";
import $ from "jquery";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
const formDatas = [
  {
    type: "header",
    subtype: "h1",
    label: "formBuilder in React",
  },
  {
    type: "paragraph",
    label: "This is a demonstration of formBuilder running in a React project.",
  },
];

const FormBuilder = () => {
  let fb = createRef();
  const [formData, setFormData] = useState({});
  const [initialized, setInitialized] = useState(false);

  //   const fbEditor = $(document.getElementById("fb-editor"));
  //   const formBuilder = fbEditor.formBuilder();
  //   const formData = formBuilder.formData; // getter

  //   console.log(formData);

  useEffect(() => {
    if (!initialized) {
      $(fb.current).formBuilder({ formDatas });
      setInitialized(true);
    }
  }, [fb, initialized]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = $(fb.current).formBuilder("getData");
    setFormData(formData);
  };
  console.log(formData);
  return (
    <form onSubmit={handleSubmit}>
      <div id="fb-editor" ref={fb}></div>
      <button type="submit">Saves</button>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </form>
  );
};

export default FormBuilder;
