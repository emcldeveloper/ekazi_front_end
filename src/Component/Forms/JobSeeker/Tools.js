import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import useSoftware from '../../../hooks/Universal/Software';
import useTool from '../../../hooks/Universal/Tools';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const EditSoftwareModal = ({ show, onHide }) => {
    // State for form data
    const [formData, setFormData] = useState({
        software: [],
    });

    const handleSelectChange = (e) => {
        const options = [...e.target.options];
        const selectedValues = options
            .filter(option => option.selected)
            .map(option => option.value);

        setFormData({
            ...formData,
            [e.target.name]: selectedValues
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        onHide(); // Close modal after submission
    };
    const { software, loadsoftware } = useSoftware()
    const AllsoftwareOptions = software?.map(software => ({
        value: software.id,
        label: software.software_name,
    })) || [];
    const [softwareOptions, setSoftwareOptions] = useState([]);
    console.log("knowlege is availavle yes", AllsoftwareOptions);
    useEffect(() => setSoftwareOptions(AllsoftwareOptions.slice(0, 10)), [software]);
    const loadMoreSoftware = () => {
        setSoftwareOptions(prev => AllsoftwareOptions.slice(0, prev.length + 10));
    };
     const {tool, loadtool } = useTool()
    const AlltoolOptions = tool?.map(tool => ({
        value: tool.id,
        label: tool.tool_name,
    })) || [];
    const [toolOptions, settoolOptions] = useState([]);
    console.log("knowlege is tool yes", AlltoolOptions);
    useEffect(() => settoolOptions(AlltoolOptions.slice(0, 10)), [tool]);
    const loadMoretool = () => {
        settoolOptions(prev => AlltoolOptions.slice(0, prev.length + 10));
    };

    return (
        <Modal show={show} onHide={onHide} size="m" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-5">Software & Tools</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Software</Form.Label>
                                <Col sm={10}>
                                    <CreatableSelect
                                        name="software"
                                        options={softwareOptions}
                                        onMenuScrollToBottom={loadMoreSoftware}
                                        placeholder="Select software ..."
                                        onChange={selected => {
                                            // You can store this in state or pass to your form handler
                                            console.log("Selected software:", selected);
                                        }}
                                        isSearchable // this is the default behavior
                                        isMulti // Enable multi-select
                                        isClearable // Allow clearing the selected option
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Tools</Form.Label>
                                <Col sm={10}>
                                  <CreatableSelect
                                        name="software"
                                        options={toolOptions}
                                        onMenuScrollToBottom={loadMoretool}
                                        placeholder="Select tool ..."
                                        onChange={selected => {
                                            // You can store this in state or pass to your form handler
                                            console.log("Selected tool:", selected);
                                        }}
                                        isSearchable // this is the default behavior
                                        isMulti // Enable multi-select
                                        isClearable // Allow clearing the selected option
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="outline-secondary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditSoftwareModal;