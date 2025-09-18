// AddSoftwareModal.tsx
import React from "react";

const AddSoftwareModal: React.FC = () => {
  const rateLimitMessage = {
    code: "rate-limited",
    message: "You have hit the rate limit. Please upgrade to keep chatting.",
    providerLimitHit: false,
    isRetryable: true,
  };

  return (
    <div>
      <h2>Rate Limit Error</h2>
      <p>{rateLimitMessage.message}</p>
    </div>
  );
};

export default AddSoftwareModal;
