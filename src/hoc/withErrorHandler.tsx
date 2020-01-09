import React, {Fragment, useEffect, useState} from 'react';
import Modal from 'components/UI/Modal/Modal';
import axiosInstance from 'axiosInstance';

function withErrorHandler<T>(WrappedComponent: React.ComponentType<T>): React.FC<T> {
    return props => {
        const [error, setError] = useState('');

        useEffect(() => {
            const interceptorId = axiosInstance.interceptors.response.use(
                response => response,
                error => setError(error.message))

            return () => {
                axiosInstance.interceptors.response.eject(interceptorId);
            };
        }, []);

        return (
            <Fragment>
                <Modal
                    isVisible={!!error}
                    isOnTop={true}
                    backdropClicked={() => setError('')}>
                    {error ? error : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
}

export default withErrorHandler;