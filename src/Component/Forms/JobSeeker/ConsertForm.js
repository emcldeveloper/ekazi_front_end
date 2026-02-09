import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ConsentFormModal = ({ show, onClose }) => {
    const [consentGiven, setConsentGiven] = useState(false);
    const [applicantName] = useState('Khalifa kasimu selemani');
    const [date] = useState('02 Jun, 2025');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Reset form when modal closes
        if (!show) {
            setConsentGiven(false);
            setIsSubmitting(false);
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!consentGiven) return;
        
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {   setIsSubmitting(false);
            onClose();
        }, 1000);
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            {/* ... rest of your modal JSX ... */}
        </Modal>
    );
};

export default ConsentFormModal;