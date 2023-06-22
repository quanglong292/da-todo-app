import { memo, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Dayjs, dateFormat } from "../../../utils/helpers/dayjs";
import Datepicker from "../../../components/core/Datepicker";

type AddNewFormType = {
  show: boolean;
  date?: string | null;
  onClose: () => void;
  onSave: (data: any) => void;
  onChange?: (e: string) => void;
};

const AddNewForm = memo((props: AddNewFormType): JSX.Element => {
  const { onClose, onSave, show, date } = props;
  const [title, setTitle] = useState<string>("");
  const [dateInput, setDateInput] = useState<string | undefined | null>(date);

  useEffect(() => {
    return () => {
      setTitle("");
      setDateInput("");
    };
  }, []);

  useEffect(() => setDateInput(date), [date]);

  console.log({ title, dateInput, date });

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
            <Datepicker
              defaultValue={Dayjs(date, dateFormat).format("YYYY-MM-DD")}
              min={Dayjs().subtract(1).format("YYYY-MM-DD")}
              onChange={(e) => setDateInput(Dayjs(e).format(dateFormat))}
            />
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
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
            console.log({ title, dateInput, date });

            if (!title || !dateInput) {
              alert("Please fill full inputs!");
              return;
            } else onSave({ title, dateInput });
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default AddNewForm;
