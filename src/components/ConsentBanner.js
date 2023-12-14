import React from 'react';

export const ConsentBanner = ({ onConsent, onReject }) => (
    <div className="consent-banner">
      <p>
      We use cookies and local storage to enhance your experience. Without this your data cannot be saved
      </p>
      <button onClick={onConsent}>Accept</button>
      <button onClick={onReject}>Reject</button>
      <a href="/privacy-policy">Privacy Policy</a>
    </div>
  );