import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { useCallback, useState } from 'react';

const CAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_CAPTCHA_SITEKEY!;

export const InvisibleCaptcha = () => {
  if (!CAPTCHA_SITEKEY) {
    throw new Error('NEXT_PUBLIC_CAPTCHA_SITEKEY is not defined in environment variables');
  }

  const [token, setToken] = useState('');
  const [visible, setVisible] = useState(false);

  const handleChallengeHidden = useCallback(() => setVisible(false), []);

  const handleButtonClick = () => setVisible(true);

  return (
    <>
      <button onClick={handleButtonClick}>Я не робот</button>
      <InvisibleSmartCaptcha
        sitekey={CAPTCHA_SITEKEY}
        onSuccess={setToken}
        onChallengeHidden={handleChallengeHidden}
        visible={visible}
      />
    </>
  );
};
