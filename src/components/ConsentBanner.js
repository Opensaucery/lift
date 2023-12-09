import React from 'react';

export const ConsentBanner = ({ onConsent }) => (
    <div className="consent-banner">
      We use cookies for analytics. <button onClick={onConsent}>I agree</button>
    </div>
  );