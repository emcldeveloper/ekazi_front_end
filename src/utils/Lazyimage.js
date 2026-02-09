import React, { useState, useEffect } from 'react';
import { Image, Spinner } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';

const LazyImage = ({ 
  src, 
  placeholder, 
  onLoad, 
  onError,
  threshold = 0.1,
  rootMargin = '200px 0px',
  ...props 
}) => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'loaded' | 'error'
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (inView && status === 'idle') {
      setStatus('loading');
      const img = new window.Image();
      img.src = src;
      
      img.onload = () => {
        setStatus('loaded');
        onLoad?.();
      };
      
      img.onerror = () => {
        setStatus('error');
        onError?.();
      };
    }
  }, [inView, src, status, onLoad, onError]);

  const renderPlaceholder = () => {
    if (placeholder) return placeholder;
    
    return (
      <div 
        style={{
          width: props.style?.width || '100%',
          height: props.style?.height || '100%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...props.style
        }}
      >
        <Spinner animation="border" size="sm" />
      </div>
    );
  };

  return (
    <div ref={ref} style={{ display: 'inline-block', ...props.style }}>
      {status === 'loaded' ? (
        <Image 
          src={src} 
          {...props}
          style={{
            ...props.style,
            transition: 'opacity 0.3s ease',
            opacity: status === 'loaded' ? 1 : 0
          }}
        />
      ) : status === 'error' ? (
        <div style={{
          width: props.style?.width || '100%',
          height: props.style?.height || '100%',
          backgroundColor: '#ffebee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d32f2f',
          ...props.style
        }}>
          Failed to load image
        </div>
      ) : (
        renderPlaceholder()
      )}
    </div>
  );
};

export default LazyImage;