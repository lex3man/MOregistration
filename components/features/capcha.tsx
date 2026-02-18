import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { useCallback, useState } from 'react';

export const InvisibleCaptcha = () => {
  const [token, setToken] = useState('');
  const [visible, setVisible] = useState(false);

  const handleChallengeHidden = useCallback(() => setVisible(false), []);

  const handleButtonClick = () => setVisible(true);

  return (
    <>
      <button onClick={handleButtonClick}>Я не робот</button>
      <InvisibleSmartCaptcha
        sitekey="ysc1_sSIax79ufVwMqLipcOI7T3H7IKKIjw7GONhcesHW311b9392"
        onSuccess={setToken}
        onChallengeHidden={handleChallengeHidden}
        visible={visible}
      />
    </>
  );
};
