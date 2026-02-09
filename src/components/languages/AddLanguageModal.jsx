import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  useLanguage,
  useLanguageRead,
  useLanguageSpeak,
  useLanguageUnderstand,
  useLanguageWrite,
  useSaveLanguage,
} from "../../hooks/profile/useLanguage";

const AddLanguageModal = ({ show, onHide, editData }) => {
  const applicant_id = localStorage.getItem("applicantId");

  //  Load options
  const { data: languages = [] } = useLanguage();
  const { data: readlanguage = [] } = useLanguageRead();
  const { data: writelanguage = [] } = useLanguageWrite();
  const { data: speaklanguage = [] } = useLanguageSpeak();
  const { data: understandlanguage = [] } = useLanguageUnderstand();

  const languageOptions = languages.map((l) => ({
    value: l.id,
    label: l.language_name,
  }));

  const readOptions = readlanguage.map((r) => ({
    value: r.id,
    label: r.read_ability,
  }));

  const writeOptions = writelanguage.map((w) => ({
    value: w.id,
    label: w.write_ability,
  }));

  const speakOptions = speaklanguage.map((s) => ({
    value: s.id,
    label: s.speak_ability,
  }));

  const understandOptions = understandlanguage.map((u) => ({
    value: u.id,
    label: u.understand_ability,
  }));

  // Mutation
  const { mutate, isPending: isLoading } = useSaveLanguage({
    onSuccess: onHide,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: null,
      language: null,
      read: null,
      write: null,
      speak: null,
      understand: null,
    },
  });

  useEffect(() => {
    editData ? reset(editData) : reset();
  }, [editData, reset]);

  // Submit
  const onSubmit = (data) => {
    const formData = new FormData();

    if (data.id) {
      formData.append("id", data.id);
    }

    formData.append("applicant_id", applicant_id);
    formData.append("language", data.language?.value);
    formData.append("read", data.read?.value);
    formData.append("write", data.write?.value);
    formData.append("speak", data.speak?.value);
    formData.append("understand", data.understand?.value);

    mutate(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{editData ? "Edit Language" : "Add Language"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {[
            ["language", "Language", languageOptions],
            ["read", "Read", readOptions],
            ["write", "Write", writeOptions],
            ["speak", "Speak", speakOptions],
            ["understand", "Understand", understandOptions],
          ].map(([name, label, options]) => (
            <Form.Group as={Row} className="mb-3" key={name}>
              <Form.Label column sm={3}>
                {label}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Controller
                  name={name}
                  control={control}
                  rules={{ required: `${label} is required` }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      placeholder={`Select ${label.toLowerCase()}...`}
                      isSearchable
                    />
                  )}
                />
                {errors[name] && (
                  <small className="text-danger">{errors[name].message}</small>
                )}
              </Col>
            </Form.Group>
          ))}

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? editData
                  ? "Updating..."
                  : "Saving..."
                : editData
                  ? "Update"
                  : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddLanguageModal;
