import { memo, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Dayjs, dateFormat } from "../../../utils/helpers/dayjs";

type AddNewFormType = {
  show: boolean;
  date?: string | null;
  onClose: () => void;
  onSave: (title: string) => void;
  onChange?: (e: string) => void;
};

const AddNewForm = memo((props: AddNewFormType): JSX.Element => {
  const { onClose, onSave, show, date } = props;
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    return () => {
      setTitle("");
    };
  }, []);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex gap-8">
          <div className="mb-2">
            <label>Todo Date:</label>
            <label>Todo Title:</label>
          </div>
          <div className="mb-2">
            <input
              disabled
              value={Dayjs(date, dateFormat).format("YYYY-MM-DD")}
            />
            <input
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="todo title"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="bg-gray-500" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          className="bg-blue-500"
          onClick={() => {
            if (!title) {
              alert("Please fill title input!");
              return;
            } else onSave(title);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default AddNewForm;
