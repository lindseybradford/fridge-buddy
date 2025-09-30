import { useState } from "react";
export const TestError = () => {
    const [shouldError, setShouldError] = useState(false);

    if (shouldError) {
        throw new Error('This is a simulated error for testing!');
    }

    return (
        <div
            onClick={() => setShouldError(true)}
            style={{ cursor: 'pointer', padding: '10px', background: '#fee' }}
        >
            Click to trigger error
        </div>
    );
}




