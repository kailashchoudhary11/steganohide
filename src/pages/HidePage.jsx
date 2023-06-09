import axios from "axios";
import { Form, useActionData } from "react-router-dom";
import { saveAs } from "file-saver";

export async function action({ request }) {
  const formData = await request.formData();
  const res = await axios.post("http://127.0.0.1:8000/api/hide/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export default function HidePage() {
  const actionData = useActionData();

  function handleDownloadClick() {
    const url = actionData?.img;
    saveAs(url, "hidden-img.png");
  }

  return !actionData ? (
    <Form method="post" encType="multipart/form-data">
      <input type="text" name="msg" />
      <input type="text" name="key" />
      <input
        type="file"
        alt="image"
        name="img"
        accept="image/png, image/gif, image/jpeg"
      />
      <button type="submit">Submit</button>
    </Form>
  ) : (
    <div>
      <div>Processed Image is as below:</div>
      <div>
        <img src={actionData?.img} alt="Processed" />
      </div>
      <button type="button" onClick={handleDownloadClick}>
        Download Image
      </button>
    </div>
  );
}
